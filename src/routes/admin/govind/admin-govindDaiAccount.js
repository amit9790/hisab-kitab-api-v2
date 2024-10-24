const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const addDaiAccountBookSchema = {
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

fastify.post('/govindDaiAccountBook', addDaiAccountBookSchema, async (request, _reply) => {
    // create the user
    const GovindDaiAccountBook = mongoose.model('govind-dai-account');
    const govindDaiAccountBookId = uuidv4();
    try {

        const govindDaiAccountBook_data = {
            govindDaiAccount_id: govindDaiAccountBookId,
            date: request.body.date,
            goods: request.body.goods,
            issue: request.body.issue,
            receive: request.body.receive,
            loss: request.body.loss,
            createdBy: request.user.email,
            is_receiver_updated: false
            }

        const cleaned_govindDaiAccountBook_data = removeEmpty(govindDaiAccountBook_data);

        await GovindDaiAccountBook.findOneAndUpdate(
            {_id: govindDaiAccountBookId},
            cleaned_govindDaiAccountBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const govindDaiAccountBook = await GovindDaiAccountBook.find({}).populate('user_id', ['_id', 'email'])
        return govindDaiAccountBook;
    }
    catch (e) {
        console.log(e);
    }
})

const updateDaiAccountBookSchema = {
    schema: {
        description: 'Admin only: Update Dai Account Account book',
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

fastify.patch('/update/govindDaiAccountBook', updateDaiAccountBookSchema, async (request, _reply) => {
    // create the user
    const GovindDaiAccountBook = mongoose.model('govind-dai-account');
    try {
        if(!request.body._id){
            request.log.error(e.message)
        }

        const govindDaiAccountBook_data = {
            receive: request.body.receive,
            loss: request.body.loss,
            is_receiver_updated: true,
            modifiedBy: request.user.email,
            }

        const cleaned_govindDaiAccountBook_data = removeEmpty(govindDaiAccountBook_data);

        await GovindDaiAccountBook.findOneAndUpdate(
            {_id: request.body._id},
            cleaned_govindDaiAccountBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const govindDaiAccountBook = await GovindDaiAccountBook.find({}).populate('user_id', ['_id', 'email'])
        return govindDaiAccountBook;
    }
    catch (e) {
        console.log(e);
    }
})

const DaiAccountBookListSchema = {
    schema: {
        description: 'Admin only: Create Dai Account account books',
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

fastify.get('/govindDaiAccountStock-list', DaiAccountBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const GovindDaiAccountBook = mongoose.model('govind-dai-account')
    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25
    }
    const govindDaiAccountBooks = await GovindDaiAccountBook.find({}, {}, options);
    return govindDaiAccountBooks;

});


const DaiAccountBookDeleteSchema = {
    schema: {
        description: 'Admin only: soft delete the Dai Account Account book and associated user account',
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
fastify.post('/govindDaiAccountBookDelete', DaiAccountBookDeleteSchema, async (request, reply) => {
    const GovindDaiAccountBook = mongoose.model('govind-dai-account')
    console.log(request.body);
    const govindDaiAccountInfo = await GovindDaiAccountBook.updateMany({ _id: request.body._id }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});
next();
}