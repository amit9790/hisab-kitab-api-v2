const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const addVijayBookSchema = {
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
            tarpattaDate: { type: 'string' },
            tarpattaIssue: { type: 'string' },
            tarpattaReceive: { type: 'string' },
            tarpattaBhuka: { type: 'string' },
            tarpattaLoss: { type: 'string' },
            issue_to_kareegar: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.post('/vijayBook', addVijayBookSchema, async (request, _reply) => {
    // create the user
    const VijayBook = mongoose.model('vijay-book');
    const vijayBookId = uuidv4();
    try {

        const vijayBook_data = {
            vijayBook_id: vijayBookId,
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
            tarpattaDate: request.body.tarpattaDate,
            tarpattaIssue: request.body.tarpattaIssue,
            tarpattaReceive: request.body.tarpattaReceive,
            tarpattaBhuka: request.body.tarpattaBhuka,
            tarpattaLoss: request.body.tarpattaLoss,
            issue_to_kareegar: request.body.issue_to_kareegar,
            createdBy: request.user.email,
            is_receiver_updated: false
            }

        const cleaned_vijayBook_data = removeEmpty(vijayBook_data);

        await VijayBook.findOneAndUpdate(
            {_id: vijayBookId},
            cleaned_vijayBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const vijayBook = await VijayBook.find({}).populate('user_id', ['_id', 'email'])
        return vijayBook;
    }
    catch (e) {
        console.log(e);
    }
})

const updateVijayBookSchema = {
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
            tarpattaDate: { type: 'string' },
            tarpattaIssue: { type: 'string' },
            tarpattaReceive: { type: 'string' },
            tarpattaBhuka: { type: 'string' },
            tarpattaLoss: { type: 'string' },
            issue_to_kareegar: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.patch('/update/vijayBook', updateVijayBookSchema, async (request, _reply) => {
    // create the user
    const VijayBook = mongoose.model('vijay-book');
    try {
        if(!request.body._id){
            request.log.error(e.message)
        }

        const vijayBook_data = {
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
            tarpattaDate: request.body.tarpattaDate,
            tarpattaIssue: request.body.tarpattaIssue,
            tarpattaReceive: request.body.tarpattaReceive,
            tarpattaBhuka: request.body.tarpattaBhuka,
            tarpattaLoss: request.body.tarpattaLoss,
            is_melting_receiver_updated: request.body.is_melting_receiver_updated,
            is_melting_deleted_flag: request.body.is_melting_deleted_flag,
            is_tarpatta_deleted_flag: request.body.is_tarpatta_deleted_flag,
            issue_to_kareegar: request.body.issue_to_kareegar,
            modifiedBy: request.user.email,
        }

        const cleaned_vijayBook_data = removeEmpty(vijayBook_data);

        await VijayBook.findOneAndUpdate(
            {_id: request.body._id},
            cleaned_vijayBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const vijayBook = await VijayBook.find({}).populate('user_id', ['_id', 'email'])
        return vijayBook;
    }
    catch (e) {
        console.log(e);
    }
})

const vijayBookListSchema = {
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

fastify.get('/vijayBook-list', vijayBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const VijayBook = mongoose.model('vijay-book')
    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25
    }
    const vijayBooks = await VijayBook.find({}, {}, options);
    return vijayBooks;

});


const vijayBookMeltingDeleteSchema = {
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
fastify.post('/vijayBookMeltingDelete', vijayBookMeltingDeleteSchema, async (request, reply) => {
    const VijayBook = mongoose.model('vijay-book')
    console.log(request.body);
    const vijayStockInfo = await VijayBook.updateMany({ _id: request.body._id }, {is_melting_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});

const vijayBookTarpattaDeleteSchema = {
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
fastify.post('/vijayBookTarpattaDelete', vijayBookTarpattaDeleteSchema, async (request, reply) => {
    const VijayBook = mongoose.model('vijay-book')
    console.log(request.body);
    const vijayStockInfo = await VijayBook.updateMany({ _id: request.body._id }, {is_tarpatta_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});


next();
}