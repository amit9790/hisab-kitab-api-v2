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

fastify.post('/meltingBook', addMeltingBookSchema, async (request, _reply) => {
    // create the user
    const MeltingBook = mongoose.model('melting-book');
    const meltingBookId = uuidv4();
    try {

        const meltingBook_data = {
            meltingBook_id: meltingBookId,
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

        const cleaned_meltingBook_data = removeEmpty(meltingBook_data);

        await MeltingBook.findOneAndUpdate(
            {_id: meltingBookId},
            cleaned_meltingBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const meltingBook = await MeltingBook.find({}).populate('user_id', ['_id', 'email'])
        return meltingBook;
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

fastify.patch('/update/meltingBook', updatMeltingBookSchema, async (request, _reply) => {
    // create the user
    const MeltingBook = mongoose.model('melting-book');
    try {
        if(!request.body._id){
            request.log.error(e.message)
        }

        const meltingBook_data = {
            receive22k: request.body.receive22k,
            loss22k: request.body.loss22k,
            is_receiver_updated: true,
            modifiedBy: request.user.email,
            }

        const cleaned_meltingBook_data = removeEmpty(meltingBook_data);

        await MeltingBook.findOneAndUpdate(
            {_id: request.body._id},
            cleaned_meltingBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const meltingBook = await MeltingBook.find({}).populate('user_id', ['_id', 'email'])
        return meltingBook;
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

fastify.get('/meltingStock-list', meltingBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const MeltingBook = mongoose.model('melting-book')
    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25
    }
    const meltingBooks = await MeltingBook.find({}, {}, options);
    return meltingBooks;

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
            masterstockId: { type: "array", items: { type: "string" } },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth,fastify.isAdmin], {relation: 'and'})
}
fastify.post('/meltingBookDelete', meltingBookDeleteSchema, async (request, reply) => {
    const MeltingBook = mongoose.model('melting-book')
    console.log(request.body);
    const masterStockInfo = await MeltingBook.updateMany({ _id: request.body._id }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});

next();
}