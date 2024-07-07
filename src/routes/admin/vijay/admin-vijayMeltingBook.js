const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const addMeltingBookSchema = {
    schema: {
        description: 'Admin only: Create melting book',
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
            category: { type: 'string' },
            weight24k: { type: 'string' },
            purity: { type: 'string' },
            conversion: { type: 'string'},
            issue22k: { type: 'string' },
            issue22kActual: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.post('/vijayMeltingBook', addMeltingBookSchema, async (request, _reply) => {
    // create the user
    const GovindMeltingBook = mongoose.model('vijay-melting-book');
    const vijayMeltingBookId = uuidv4();
    try {

        const vijayMeltingBook_data = {
            meltingBook_id: vijayMeltingBookId,
            date: request.body.date,
            description: request.body.description,
            category: request.body.category,
            weight24k: request.body.weight24k,
            purity: request.body.purity,
            conversion: request.body.conversion,
            issue22k: request.body.issue22k,
            issue22kActual: request.body.issue22kActual,
            createdBy: request.user.email,
            is_receiver_updated: false
            }

        const cleaned_vijayMeltingBook_data = removeEmpty(vijayMeltingBook_data);

        await GovindMeltingBook.findOneAndUpdate(
            {_id: vijayMeltingBookId},
            cleaned_vijayMeltingBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const vijayMeltingBook = await GovindMeltingBook.find({}).populate('user_id', ['_id', 'email'])
        return vijayMeltingBook;
    }
    catch (e) {
        console.log(e);
    }
})

const updatMeltingBookSchema = {
    schema: {
        description: 'Admin only: Create melting book',
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
            category: { type: 'string' },
            weight24k: { type: 'string' },
            purity: { type: 'string' },
            conversion: { type: 'string' },
            issue22k: { type: 'string' },
            issue22kActual: {type: 'string'},
            createdBy: { type: 'string' },
            modifiedBy: { type: 'string' },
            receive22k: { type: 'string' },
            loss22k: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.patch('/update/vijayMeltingBook', updatMeltingBookSchema, async (request, _reply) => {
    // create the user
    const GovindMeltingBook = mongoose.model('vijay-melting-book');
    try {
        if(!request.body._id){
            request.log.error(e.message)
        }

        const vijayMeltingBook_data = {
            receive22k: request.body.receive22k,
            loss22k: request.body.loss22k,
            is_receiver_updated: true,
            modifiedBy: request.user.email,
            }

        const cleaned_vijayMeltingBook_data = removeEmpty(vijayMeltingBook_data);

        await GovindMeltingBook.findOneAndUpdate(
            {_id: request.body._id},
            cleaned_vijayMeltingBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const vijayMeltingBook = await GovindMeltingBook.find({}).populate('user_id', ['_id', 'email'])
        return vijayMeltingBook;
    }
    catch (e) {
        console.log(e);
    }
})

const meltingBookListSchema = {
    schema: {
        description: 'Admin only: Create melting books',
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

fastify.get('/vijayMeltingStock-list', meltingBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const GovindMeltingBook = mongoose.model('vijay-melting-book')
    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25
    }
    const vijayMeltingBooks = await GovindMeltingBook.find({}, {}, options);
    return vijayMeltingBooks;

});


const meltingBookDeleteSchema = {
    schema: {
        description: 'Admin only: soft delete the melting book and associated user account',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    consumes: ['multipart/form-data'],
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            vijayMeltingBook_id: { type: "array", items: { type: "string" } },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth,fastify.isAdmin], {relation: 'and'})
}
fastify.post('/vijayMeltingBookDelete', meltingBookDeleteSchema, async (request, reply) => {
    const GovindMeltingBook = mongoose.model('vijay-melting-book')
    console.log(request.body);
    const vijayMeltingBookInfo = await GovindMeltingBook.updateMany({ _id: request.body._id }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});
next();
}