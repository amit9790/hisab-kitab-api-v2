const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const addTarPattaBookSchema = {
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

fastify.post('/govindTarPattaBook', addTarPattaBookSchema, async (request, _reply) => {
    // create the user
    const GovindTarPattaBook = mongoose.model('govind-tar-patta');
    const govindTarPattaBookId = uuidv4();
    try {

        const govindTarPattaBook_data = {
            govindTarPatta_id: govindTarPattaBookId,
            date: request.body.date,
            goods: request.body.goods,
            issue: request.body.issue,
            receive: request.body.receive,
            loss: request.body.loss,
            createdBy: request.user.email,
            is_receiver_updated: false
            }

        const cleaned_govindTarPattaBook_data = removeEmpty(govindTarPattaBook_data);

        await GovindTarPattaBook.findOneAndUpdate(
            {_id: govindTarPattaBookId},
            cleaned_govindTarPattaBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const govindTarPattaBook = await GovindTarPattaBook.find({}).populate('user_id', ['_id', 'email'])
        return govindTarPattaBook;
    }
    catch (e) {
        console.log(e);
    }
})

const updateTarPattaBookSchema = {
    schema: {
        description: 'Admin only: Update Tar Patta book',
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

fastify.patch('/update/govindTarPattaBook', updateTarPattaBookSchema, async (request, _reply) => {
    // create the user
    const GovindTarPattaBook = mongoose.model('govind-tar-patta');
    try {
        if(!request.body._id){
            request.log.error(e.message)
        }

        const govindTarPattaBook_data = {
            receive: request.body.receive,
            loss: request.body.loss,
            is_receiver_updated: true,
            modifiedBy: request.user.email,
            }

        const cleaned_govindTarPattaBook_data = removeEmpty(govindTarPattaBook_data);

        await GovindTarPattaBook.findOneAndUpdate(
            {_id: request.body._id},
            cleaned_govindTarPattaBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const govindTarPattaBook = await GovindTarPattaBook.find({}).populate('user_id', ['_id', 'email'])
        return govindTarPattaBook;
    }
    catch (e) {
        console.log(e);
    }
})

const tarPattaBookListSchema = {
    schema: {
        description: 'Admin only: Create tar patta books',
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

fastify.get('/govindTarPattaStock-list', tarPattaBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const GovindTarPattaBook = mongoose.model('govind-tar-patta')
    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25
    }
    const govindTarPattaBooks = await GovindTarPattaBook.find({}, {}, options);
    return govindTarPattaBooks;

});


const tarPattaBookDeleteSchema = {
    schema: {
        description: 'Admin only: soft delete the tar patta book and associated user account',
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
fastify.post('/govindTarPattaBookDelete', tarPattaBookDeleteSchema, async (request, reply) => {
    const GovindTarPattaBook = mongoose.model('govind-tar-patta')
    console.log(request.body);
    const govindTarPattaBookInfo = await GovindTarPattaBook.updateMany({ _id: request.body._id }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});
next();
}