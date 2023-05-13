const bcrypt = require('bcrypt')
const { createUserSchema, loginUserSchema } = require('../schema/auth.schema')
const User = require('../models/user.model')
const { BadRequestError } = require('../errors')

const registerUserController = async (req, res) => {
   const result = createUserSchema.safeParse(req.body)

    if (!result.success) {
        throw new BadRequestError(fromZodError(result.error).toString())
    }

    const user = await User.create({
        username: result.data.body.username,
        wallet_address: result.data.body.wallet_address,
    })

    return res.status(StatusCodes.CREATED).json({ user })
}

const loginUserController = async (req, res) => {
    const cookie = req.cookies
    const refreshToken = cookie?.jwt
    const result = loginUserSchema.safeParse(req.body)

    if (!result.success) {
        throw new BadRequestError(fromZodError(result.error).toString())
    }

    const foundUser = await User.findOne({ username: result.data.body.username }).exec()

    if (!foundUser) throw new BadRequestError("No user found with this username")

    if (foundUser) {
        const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000
        const ACCESS_TOKEN_EXPIRATION = 15 * 60 * 1000

        const accessToken = jwt.sign(
            { username: foundUser.username, id: foundUser._id }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '15m' }
        )
        const newRefreshToken = jwt.sign(
            { username: foundUser.username }, 
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: '1d' }
        )

        let newRefreshTokenArray = !cookie?.jwt ? foundUser.refreshToken : foundUser.refreshToken.filter(token => token !== cookie?.jwt)

        if (cookie?.jwt) {
            res.clearCookie('jwt', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None'})

            const foundToken = await User.findOne({ refreshToken }).exec()

            if (!foundToken) {
                console.log('Token reuse detected')
                newRefreshTokenArray = []
            }

        }

        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
        const result = await foundUser.save()

        res.cookie('jwt', newRefreshToken, { httpOnly: true, maxAge: COOKIE_MAX_AGE })

        return res.status(StatusCodes.OK).json({ token: accessToken, expiresIn: ACCESS_TOKEN_EXPIRATION })
    }

    return res.status(StatusCodes.BAD_REQUEST).json({ "message": "invalid details" })
}

const logoutUserController = async (req, res) => {
    // clear tokens in frontend
    const cookie = req.cookies

    if (!cookie?.jwt) {
        return res.sendStatus(StatusCodes.NO_CONTENT)
    }

    const refreshToken = cookie.jwt
    const user = await User.findOne({ refreshToken }).exec()

    if (!user) {
        res.clearCookie('jwt', {maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None'})
        return res.sendStatus(StatusCodes.NO_CONTENT)
    }

    user.refreshToken = user.refreshToken.filter(token => token !== refreshToken)
    res.clearCookie('jwt', {maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None'})

    const result = await user.save()

    return res.sendStatus(StatusCodes.NO_CONTENT)
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController
}