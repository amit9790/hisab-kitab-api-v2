const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const updatMasterStockSchema = {
    schema: {
        description: 'Admin only: Create master stocks',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            type: { type: 'string' },
            date: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
            weight: { type: 'string' },
            issuer: { type: 'string' },
            receiver: { type: 'string' },
            purity: { type: 'string' },
            createdBy: { type: 'string' },
            modifiedBy: { type: 'string' },
            issue22k:  { type: 'string' },
            receive22k: { type: 'string'},
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}
fastify.post('/masterStock', updatMasterStockSchema, async (request, _reply) => {
    // create the user
    const MasterStock = mongoose.model('master-stock')
    const User = mongoose.model('User')

    const masterStockId = uuidv4();
    try {

        const masterStock_data = {
            masterStock_id: masterStockId,
            // created_by: request.body.created_by,
            modified_by: request.user.email,
            type: request.body.type,
            date: request.body.date,
            category: request.body.category,
            description: request.body.description,
            weight: request.body.weight,
            issuer: request.body.issuer,
            receiver: request.body.receiver,
            purity: request.body.purity,
            createdBy: request.user.email,
            modifiedBy: request.user.email,
            issue22k:  request.body.issue22k,
            receive22k: request.body.receive22k,
            }

        const cleaned_masterStock_data = removeEmpty(masterStock_data);

        await MasterStock.findOneAndUpdate(
            {_id: masterStockId},
            cleaned_masterStock_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const masterStock = await MasterStock.find({}).populate('user_id', ['_id', 'email'])
        return masterStock;
    }
    catch (e) {
        console.log(e);
        // await newUser.deleteOne({_id: userId});
        // console.log("Deleted the user created")
    }
})

const masterStockListSchema = {
    schema: {
        description: 'Admin only: Create master stocks',
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

fastify.get('/masterStock-list', masterStockListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const MasterStock = mongoose.model('master-stock')
    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25
    }
    const masterStocks = await MasterStock.find({}, {}, options);
    return masterStocks;

});

const masterStockDeleteSchema = {
    schema: {
        description: 'Admin only: soft delete the MasterStock and associated user account',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    consumes: ['multipart/form-data'],
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            masterstockId: { type: "array", items: { type: "string" } },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth,fastify.isAdmin], {relation: 'and'})
}
fastify.post('/masterStockDelete', masterStockDeleteSchema, async (request, reply) => {
    const MasterStock = mongoose.model('master-stock')
    console.log(request.body);
    const masterStockInfo = await MasterStock.updateMany({ _id: request.body.masterstockId }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'User deleted'};
});

next();
}