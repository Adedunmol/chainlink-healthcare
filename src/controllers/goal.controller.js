const { StatusCodes } = require("http-status-codes")
const Goal = require("../models/goal.model")
const { createGoalSchema } = require("../schema/goal.schema")


const createGoalController = async (req, res) => {
    const userId = req.id
    const result = createGoalSchema.safeParse(req.body)

    if (!result.success) {
        throw new BadRequestError(fromZodError(result.error).toString())
    }

    const data = { ...result.data.body, userId }

    const goal = await Goal.create(data)

    return res.status(StatusCodes.CREATED).json({ goal })
}

module.exports = {
    createGoalController
}