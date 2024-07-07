const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const addDaiBhukaBookSchema = {
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

fastify.post('/govindDaiBhukaBook', addDaiBhukaBookSchema, async (request, _reply) => {
    // create the user
    const GovindDaiBhukaBook = mongoose.model('govind-dai-bhuka');
    const govindDaiBhukaBookId = uuidv4();
    try {

        const govindDaiBhukaBook_data = {
            govindDaiBhuka_id: govindDaiBhukaBookId,
            date: request.body.date,
            goods: request.body.goods,
            issue: request.body.issue,
            receive: request.body.receive,
            loss: request.body.loss,
            createdBy: request.user.email,
            is_receiver_updated: false
            }

        const cleaned_govindDaiBhukaBook_data = removeEmpty(govindDaiBhukaBook_data);

        await GovindDaiBhukaBook.findOneAndUpdate(
            {_id: govindDaiBhukaBookId},
            cleaned_govindDaiBhukaBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const govindDaiBhukaBook = await GovindDaiBhukaBook.find({}).populate('user_id', ['_id', 'email'])
        return govindDaiBhukaBook;
    }
    catch (e) {
        console.log(e);
    }
})

const updateDaiBhukaBookSchema = {
    schema: {
        description: 'Admin only: Update Dai Bhuka Account book',
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

fastify.patch('/update/govindDaiBhukaBook', updateDaiBhukaBookSchema, async (request, _reply) => {
    // create the user
    const GovindDaiBhukaBook = mongoose.model('govind-dai-bhuka');
    try {
        if(!request.body._id){
            request.log.error(e.message)
        }

        const govindDaiBhukaBook_data = {
            receive: request.body.receive,
            loss: request.body.loss,
            is_receiver_updated: true,
            modifiedBy: request.user.email,
            }

        const cleaned_govindDaiBhukaBook_data = removeEmpty(govindDaiBhukaBook_data);

        await GovindDaiBhukaBook.findOneAndUpdate(
            {_id: request.body._id},
            cleaned_govindDaiBhukaBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const govindDaiBhukaBook = await GovindDaiBhukaBook.find({}).populate('user_id', ['_id', 'email'])
        return govindDaiBhukaBook;
    }
    catch (e) {
        console.log(e);
    }
})

const DaiBhukaBookListSchema = {
    schema: {
        description: 'Admin only: Create Dai Bhuka account books',
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

fastify.get('/govindDaiBhukaStock-list', DaiBhukaBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const GovindDaiBhukaBook = mongoose.model('govind-dai-bhuka')
    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25
    }
    const govindDaiBhukaBooks = await GovindDaiBhukaBook.find({}, {}, options);
    return govindDaiBhukaBooks;

});


const DaiBhukaBookDeleteSchema = {
    schema: {
        description: 'Admin only: soft delete the Dai Bhuka Account book and associated user account',
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
fastify.post('/govindDaiBhukaBookDelete', DaiBhukaBookDeleteSchema, async (request, reply) => {
    const GovindDaiBhukaBook = mongoose.model('govind-dai-bhuka')
    console.log(request.body);
    const govindDaiBhukaInfo = await GovindDaiBhukaBook.updateMany({ _id: request.body._id }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});
next();
}