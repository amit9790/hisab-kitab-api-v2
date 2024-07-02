const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const polishSchema = {
    schema: {
        description: 'Admin only: Create polish stocks',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            // type: { type: 'string' },
            date: { type: 'string' },
            goods: { type: 'string' },
            fine: {type: 'string'},
            chatka: {type: 'string'},
            issueWeight: { type: 'string' },
            recvWeight: { type: 'string' },
            lossWeight: { type: 'string' },
            chill: { type: 'string' },
            createdBy: { type: 'string' },
            modifiedBy: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}
fastify.post('/polish', polishSchema, async (request, _reply) => {
    // create the user
    const Polish = mongoose.model('polish')
    const User = mongoose.model('User')

    const polishId = uuidv4();
    try {

        const polish_data = {
            polish_id: polishId,
            // created_by: request.body.created_by,
            modified_by: request.user.email,
            // type: request.body.type,
            date: request.body.date,
            goods: request.body.goods,
            fine: request.body.fine,
            chatka: request.body.chatka,
            issueWeight: request.body.issueWeight,
            recvWeight: request.body.recvWeight,
            lossWeight: request.body.lossWeight,
            chill: request.body.chill,
            }

        const cleaned_polish_data = removeEmpty(polish_data);

        await Polish.findOneAndUpdate(
            {_id: polishId},
            cleaned_polish_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const polish = await Polish.find({}).populate('user_id', ['_id', 'email'])
        return cleaned_polish_data;
    }
    catch (e) {
        console.log(e);
        // await newUser.deleteOne({_id: userId});
        // console.log("Deleted the user created")
    }
})

const polishListSchema = {
    schema: {
        description: 'Admin only: Get polish stocks',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
        querystring: {
            itemsPerPage: { type: 'number', default: 25 },
            page: { type: 'number', default: 1 }
        }
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.get('/polish-list', polishListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const Polish = mongoose.model('polish')
    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25
    }
    const polish = await Polish.find({}, {}, options);
    return polish;

});

const polishDeleteSchema = {
    schema: {
        description: 'Admin only: soft delete the Polish Stock and associated user account',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    consumes: ['multipart/form-data'],
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            polishId: { type: "array", items: { type: "string" } },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth,fastify.isAdmin], {relation: 'and'})
}
fastify.post('/polishDelete', polishDeleteSchema, async (request, reply) => {
    const Polish = mongoose.model('polish')
    console.log(request.body);
    const polishInfo = await Polish.updateMany({ _id: request.body.polishId }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'User deleted'};
});

next();
}