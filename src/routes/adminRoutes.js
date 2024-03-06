const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const removeEmpty = require('../utility/removeEmpty')


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
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}
fastify.post('/admin/masterStock', updatMasterStockSchema, async (request, _reply) => {
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

fastify.get('/admin/masterStock-list', masterStockListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const MasterStock = mongoose.model('master-stock')
    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25
    }
    const masterStocks = await MasterStock.find({is_deleted_flag: false}, {}, options);
    return masterStocks;

});

next();
}