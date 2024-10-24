const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const addMachineAccountBookSchema = {
    schema: {
        description: 'Admin only: Create Tar Patta book',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            date: { type: 'string' },
            goods: { type: 'string' },
            issue: { type: 'string' },
            receive: { type: 'string' },
            loss: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.post('/govindMachineAccountBook', addMachineAccountBookSchema, async (request, _reply) => {
    // create the user
    const GovindMachineAccountBook = mongoose.model('govind-machine-account');
    const govindMachineAccountBookId = uuidv4();
    try {

        const govindMachineAccountBook_data = {
            govindMachineAccount_id: govindMachineAccountBookId,
            date: request.body.date,
            goods: request.body.goods,
            issue: request.body.issue,
            receive: request.body.receive,
            loss: request.body.loss,
            createdBy: request.user.email,
            is_receiver_updated: false
            }

        const cleaned_govindMachineAccountBook_data = removeEmpty(govindMachineAccountBook_data);

        await GovindMachineAccountBook.findOneAndUpdate(
            {_id: govindMachineAccountBookId},
            cleaned_govindMachineAccountBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const govindMachineAccountBook = await GovindMachineAccountBook.find({}).populate('user_id', ['_id', 'email'])
        return govindMachineAccountBook;
    }
    catch (e) {
        console.log(e);
    }
})

const updateMachineAccountBookSchema = {
    schema: {
        description: 'Admin only: Update Machine Account book',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            date: { type: 'string' },
            goods: { type: 'string' },
            issue: { type: 'string' },
            receive: { type: 'string' },
            loss: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.patch('/update/govindMachineAccountBook', updateMachineAccountBookSchema, async (request, _reply) => {
    // create the user
    const GovindMachineAccountBook = mongoose.model('govind-machine-account');
    try {
        if(!request.body._id){
            request.log.error(e.message)
        }

        const govindMachineAccountBook_data = {
            receive: request.body.receive,
            loss: request.body.loss,
            is_receiver_updated: true,
            modifiedBy: request.user.email,
            }

        const cleaned_govindMachineAccountBook_data = removeEmpty(govindMachineAccountBook_data);

        await GovindMachineAccountBook.findOneAndUpdate(
            {_id: request.body._id},
            cleaned_govindMachineAccountBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const govindMachineAccountBook = await GovindMachineAccountBook.find({}).populate('user_id', ['_id', 'email'])
        return govindMachineAccountBook;
    }
    catch (e) {
        console.log(e);
    }
})

const machineAccountBookListSchema = {
    schema: {
        description: 'Admin only: Create machine account books',
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

fastify.get('/govindMachineAccountStock-list', machineAccountBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const GovindMachineAccountBook = mongoose.model('govind-machine-account')
    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25
    }
    const govindMachineAccountBooks = await GovindMachineAccountBook.find({}, {}, options);
    return govindMachineAccountBooks;

});


const machineAccountBookDeleteSchema = {
    schema: {
        description: 'Admin only: soft delete the Machine Account book and associated user account',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    consumes: ['multipart/form-data'],
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            govindTarPatta_id: { type: "array", items: { type: "string" } },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth,fastify.isAdmin], {relation: 'and'})
}
fastify.post('/govindMachineAccountBookDelete', machineAccountBookDeleteSchema, async (request, reply) => {
    const GovindMachineAccountBook = mongoose.model('govind-machine-account')
    console.log(request.body);
    const govindMachineAccountInfo = await GovindMachineAccountBook.updateMany({ _id: request.body._id }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});
next();
}