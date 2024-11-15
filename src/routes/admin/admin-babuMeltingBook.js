const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const addBabuAcctBookSchema = {
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
            meltingDate: { type: 'string' },
            meltingCategory: { type: 'string' },
            meltingDescription: { type: 'string' },
            meltingPurity: { type: 'string' },
            meltingConversion: { type: 'string' },
            meltingIssue: { type: 'string'},
            meltingIssueActual: { type: 'string' },
            meltingReceive: { type: 'string' },
            meltingBhuka: { type: 'string' },
            meltingLoss: { type: 'string' },
            is_melting_receiver_updated: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.post('/babuMeltingAcctBook', addBabuAcctBookSchema, async (request, _reply) => {
    // create the user
    const BabuBook = mongoose.model('babumelting-book');
    const babuBookId = uuidv4();
    try {

        const babuBook_data = {
            babuBook_id: babuBookId,
            meltingDate: request.body.meltingDate,
            meltingCategory: request.body.meltingCategory,
            meltingDescription: request.body.meltingDescription,
            meltingWeight: request.body.meltingWeight,
            meltingPurity: request.body.meltingPurity,
            meltingConversion: request.body.meltingConversion,
            meltingIssue: request.body.meltingIssue,
            meltingIssueActual: request.body.meltingIssueActual,
            meltingReceive: request.body.meltingReceive,
            meltingBhuka: request.body.meltingBhuka,
            meltingLoss: request.body.meltingLoss,
            is_melting_receiver_updated: request.body.is_melting_receiver_updated,
            }

        const cleaned_babuBook_data = removeEmpty(babuBook_data);

        await BabuBook.findOneAndUpdate(
            {_id: babuBookId},
            cleaned_babuBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const babuBook = await BabuBook.find({}).populate('user_id', ['_id', 'email'])
        return babuBook;
    }
    catch (e) {
        console.log(e);
    }
})

const updateBabuBookSchema = {
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
            meltingDate: { type: 'string' },
            meltingCategory: { type: 'string' },
            meltingDescription: { type: 'string' },
            meltingWeight: { type: 'string' },
            meltingPurity: { type: 'string' },
            meltingConversion: { type: 'string' },
            meltingIssue: { type: 'string' },
            meltingIssueActual: { type: 'string' },
            meltingReceive: { type: 'string' },
            meltingBhuka: { type: 'string' },
            meltingLoss: { type: 'string' },
            is_melting_receiver_updated: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.patch('/update/babuMeltingAcctBook', updateBabuBookSchema, async (request, _reply) => {
    // create the user
    const BabuBook = mongoose.model('babumelting-book');
    try {
        if(!request.body._id){
            request.log.error(e.message)
        }

        const babuBook_data = {
            meltingDate: request.body.meltingDate,
            meltingCategory: request.body.meltingCategory,
            meltingDescription: request.body.meltingDescription,
            meltingWeight: request.body.meltingWeight,
            meltingPurity: request.body.meltingPurity,
            meltingConversion: request.body.meltingConversion,
            meltingIssue: request.body.meltingIssue,
            meltingIssueActual: request.body.meltingIssueActual,
            meltingReceive: request.body.meltingReceive,
            meltingBhuka: request.body.meltingBhuka,
            meltingLoss: request.body.meltingLoss,
            is_melting_receiver_updated: request.body.is_melting_receiver_updated,
            is_deleted_flag: request.body.is_deleted_flag,
            modifiedBy: request.user.email,
        }

        const cleaned_babuBook_data = removeEmpty(babuBook_data);

        await BabuBook.findOneAndUpdate(
            {_id: request.body._id},
            cleaned_babuBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const babuBook = await BabuBook.find({}).populate('user_id', ['_id', 'email'])
        return babuBook;
    }
    catch (e) {
        console.log(e);
    }
})

const babuBookListSchema = {
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

fastify.get('/babuMeltingAcctBook-list', babuBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const BabuBook = mongoose.model('babumelting-book')
    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25
    }
    const babuBooks = await BabuBook.find({}, {}, options);
    return babuBooks;

});


const babuBookMeltingDeleteSchema = {
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
fastify.post('/babuAcctBookMeltingDelete', babuBookMeltingDeleteSchema, async (request, reply) => {
    const BabuBook = mongoose.model('babumelting-book')
    console.log(request.body);
    const babuStockInfo = await BabuBook.updateMany({ _id: request.body._id }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});

next();
}