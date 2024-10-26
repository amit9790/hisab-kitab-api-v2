const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const updateLossSchema = {
    schema: {
        description: 'Admin only: Update loss acct',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
        type: 'object',
        additionalProperties: false,
        properties: {
            date: { type: 'string' },
            description: { type: 'string' },
            type: { type: 'string' },
            transactionId: { type: 'string' },
            lossWt: { type: 'string' },
            createdBy: { type: 'string' },
            modifiedBy: { type: 'string' },
        },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}
fastify.patch('/lossAcct', updateLossSchema, async (request, _reply) => {
    // create the user
    const Loss = mongoose.model('loss')
    
    try {
        if(!request.body.transactionId){
            request.log.error(e.message);
            return
        }
        const lossData = {
            date: request.body.date,
            transactionId: request.body.transactionId,
            description: request.body.description,
            modifiedBy: request.user.email,
            lossWt:  request.body.lossWt,
            createdBy: request.user.email,
            modifiedBy: request.user.email,
            type: request.body.type,
            }

        const cleaned_loss_data = removeEmpty(lossData);

        await Loss.findOneAndUpdate(
            {transactionId: request.body.transactionId, type: request.body.type},
            cleaned_loss_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const loss = await Loss.find({}).populate('user_id', ['_id', 'email'])
        return loss;
    }
    catch (e) {
        console.log(e);
    }
})


const addLossSchema = {
    schema: {
        description: 'Admin only: Create loss acct',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            date: { type: 'string' },
            description: { type: 'string' },
            type: { type: 'string' },
            transactionId: { type: 'string' },
            lossWt: { type: 'string' },
            createdBy: { type: 'string' },
            modifiedBy: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}
fastify.post('/lossAcct', addLossSchema, async (request, _reply) => {
    // create the user
    const Loss = mongoose.model('loss')
    const User = mongoose.model('User')

    const lossId = uuidv4();
    try {
        const lossData = {
            loss_id: lossId,
            // created_by: request.body.created_by,
            modified_by: request.user.email,
            type: request.body.type,
            date: request.body.date,
            description: request.body.description,
            transactionId: request.body.transactionId,
            createdBy: request.user.email,
            modifiedBy: request.user.email,
            lossWt:  request.body.lossWt,
            }

        const cleaned_loss_data = removeEmpty(lossData);

        await Loss.findOneAndUpdate(
            {_id: lossId},
            cleaned_loss_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const loss = await Loss.find({}).populate('user_id', ['_id', 'email'])
        return loss;
    }
    catch (e) {
        console.log(e);
    }
})

const lossSchema = {
    schema: {
        description: 'Admin only: Get Loss Data',
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

fastify.get('/lossAcct-list', lossSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const lossData = mongoose.model('loss')
    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25
    }
    const lossStock = await lossData.find({}, {}, options);
    return lossStock;

});

const lossDeleteSchema = {
    schema: {
        description: 'Admin only: soft delete the Loss Acct Data',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    consumes: ['multipart/form-data'],
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            lossId: { type: "array", items: { type: "string" } },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth,fastify.isAdmin], {relation: 'and'})
}
fastify.post('/lossAcctDelete', lossDeleteSchema, async (request, reply) => {
    const lossData = mongoose.model('loss')
    console.log(request.body);
    const lossInfo = await lossData.updateMany({ _id: request.body.lossId }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'User deleted'};
});

next();
}