const { object, string, number } = require('zod');

const createGoalSchema = object({
    body: object({
        title: string({ required_error: 'title is required' }),
        happiness_level: number({ required_error: 'Happiness level is required' }),
        physical_health: string({ required_error: 'Physical health status is required' }),
        category: string({ required_error: 'Category is required' }),
        duration: string({ required_error: 'Duration is required' }),
        task: string({ required_error: 'Task is required' }),
        frequency: number({ required_error: 'Frequency is required' }),
    })
})

module.exports = {
    createGoalSchema
}