const { StatusCodes } = require("http-status-codes")
const NotFound = require("../errors/not-found")
const Goal = require("../models/goal.model")
const { createGoalSchema, updateGoalSchema } = require("../schema/goal.schema")


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

const getGoalsController = async (req, res) => {
    const userId = req.id

    const goals = await Goal.find({ userId })

    return res.status(StatusCodes.OK).json({ goals })
}

const getGoalController = async (req, res) => {
    const goalId = req.params.id

    if (!goalId) throw new BadRequestError('no goal id passed')

    const goal = await Goal.findOne({ _id: goalId })

    if (!goal) throw new NotFound('No goal found with this id')

    return res.status(StatusCodes.OK).json({ goal })
}

const updateGoalController = async (req, res) => {
    const goalId = req.params.id
    const userId = req.id

    const result = updateGoalSchema.safeParse(req.body)

    if (!result.success) {
        throw new BadRequestError(fromZodError(result.error).toString())
    }

    const updatedGoal = await Goal.findOneAndUpdate({ _id: goalId, userId }, result.data.body, {
        new: true, runValidators: true
    })

    return res.status(StatusCodes.OK).json({ goal: updatedGoal })
}

const deleteGoalController = async (req, res) => {
    const goalId = req.params.id
    const userId = req.id

    if (!goalId) throw new BadRequestError('no goal id passed')

    const goal = await Goal.findOneAndDelete({ _id: goalId, userId })

    if (!goal) throw new NotFound('No goal found with this id')

    return res.status(StatusCodes.OK).json({ goal })
}

module.exports = {
    createGoalController,
    getGoalController,
    getGoalsController,
    deleteGoalController,
    updateGoalController
}