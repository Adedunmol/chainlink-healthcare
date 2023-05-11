const { object, string, number } = require('zod');

const createUserSchema = object({
    body: object({
        username: string({ required_error: 'Username is required' }),
        wallet_address: string({ required_error: 'Wallet address is required' })
    })
})

const loginUserSchema = object({
    body: object({
        username: string({ required_error: 'Username is required' }),
        wallet_address: string({ required_error: 'Wallet address is required' })
    })
})

module.exports = {
    createUserSchema,
    loginUserSchema
}