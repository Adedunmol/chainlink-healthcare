const { joinRoomSchema } = require('../schema/user.schema')


const addUserToRoomController = async ({ id, name, room }) => {
    const result = joinRoomSchema.safeParse({ name, room })

    if (!result.success) {
        throw new BadRequestError(fromZodError(result.error).toString())
    }

    //create a model and add users to an array in a field in the model
}

const removeUserFromRoomController = async (id) => {
    //find user and remove them from the array in a field in the model 
}

module.exports = {
    addUserToRoomController,
    removeUserFromRoomController
}