const { object, string } = require('zod');

const joinRoomSchema = object({
    body: object({
        name: string({ required_error: 'Name is required' }),
        room: string({ required_error: 'Room is required' })
    })
})

module.exports = {
    joinRoomSchema
}