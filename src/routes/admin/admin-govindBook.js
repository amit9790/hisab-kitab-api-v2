const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const addGovindBookSchema = {
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
            tarpattaDescription: { type: 'string' },
            tarpattaIssue: { type: 'string' },
            tarpattaReceive: { type: 'string' },
            tarpattaBhuka: { type: 'string' },
            tarpattaLoss: { type: 'string' },
            machineDate: { type: 'string' },
            machineDescription: { type: 'string' },
            machineIssue: { type: 'string' },
            machineReceive: { type: 'string' },
            machineLoss: { type: 'string' },
            daiBhukaDate: { type: 'string' },
            daiBhukaDescription: { type: 'string' },
            daiBhukaDai: { type: 'string' },
            daiBhukaBhuka: { type: 'string' },
            daiBhuka835Date: { type: 'string' },
            daiBhuka835Description: { type: 'string' },
            daiBhuka835Dai: { type: 'string' },
            daiBhuka835Bhuka: { type: 'string' },
            is_assigned_to: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.post('/govindBook', addGovindBookSchema, async (request, _reply) => {
    // create the user
    const GovindBook = mongoose.model('govind-book');
    const govindBookId = uuidv4();
    try {

        const govindBook_data = {
            govindBook_id: govindBookId,
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
            tarpattaDescription: request.body.tarpattaDescription,
            tarpattaIssue: request.body.tarpattaIssue,
            tarpattaReceive: request.body.tarpattaReceive,
            tarpattaBhuka: request.body.tarpattaBhuka,
            tarpattaLoss: request.body.tarpattaLoss,
            machineDate: request.body.machineDate,
            machineDescription: request.body.machineDescription,
            machineIssue: request.body.machineIssue,
            machineReceive: request.body.machineReceive,
            machineLoss: request.body.machineLoss,
            daiBhukaDate: request.body.daiBhukaDate,
            daiBhukaDescription: request.body.daiBhukaDescription,
            daiBhukaDai: request.body.daiBhukaDai,
            daiBhukaBhuka: request.body.daiBhukaBhuka,
            daiBhuka835Date: request.body.daiBhuka835Date,
            daiBhuka835Description: request.body.daiBhuka835Description,
            daiBhuka835Dai: request.body.daiBhuka835Dai,
            daiBhuka835Bhuka: request.body.daiBhuka835Bhuka,
            is_assigned_to: request.body.is_assigned_to,
            is_receiver_updated: false,
            }

        const cleaned_govindBook_data = removeEmpty(govindBook_data);

        await GovindBook.findOneAndUpdate(
            {_id: govindBookId},
            cleaned_govindBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const govindBook = await GovindBook.find({}).populate('user_id', ['_id', 'email'])
        return govindBook;
    }
    catch (e) {
        console.log(e);
    }
})

const updateGovindBookSchema = {
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
            tarpattaDescription: { type: 'string' },
            tarpattaIssue: { type: 'string' },
            tarpattaReceive: { type: 'string' },
            tarpattaBhuka: { type: 'string' },
            tarpattaLoss: { type: 'string' },
            machineDate: { type: 'string' },
            machineDescription: { type: 'string' },
            machineIssue: { type: 'string' },
            machineReceive: { type: 'string' },
            machineLoss: { type: 'string' },
            daiBhukaDate: { type: 'string' },
            daiBhukaDescription: { type: 'string' },
            daiBhukaDai: { type: 'string' },
            daiBhukaBhuka: { type: 'string' },
            daiBhuka835Date: { type: 'string' },
            daiBhuka835Description: { type: 'string' },
            daiBhuka835Dai: { type: 'string' },
            daiBhuka835Bhuka: { type: 'string' },
            is_assigned_to: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.patch('/update/govindBook', updateGovindBookSchema, async (request, _reply) => {
    // create the user
    const GovindBook = mongoose.model('govind-book');
    try {
        if(!request.body._id){
            request.log.error(e.message)
        }

        const govindBook_data = {
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
            tarpattaDescription: request.body.tarpattaDescription,
            tarpattaIssue: request.body.tarpattaIssue,
            tarpattaReceive: request.body.tarpattaReceive,
            tarpattaBhuka: request.body.tarpattaBhuka,
            tarpattaLoss: request.body.tarpattaLoss,
            machineDate: request.body.machineDate,
            machineDescription: request.body.machineDescription,
            machineIssue: request.body.machineIssue,
            machineReceive: request.body.machineReceive,
            machineLoss: request.body.machineLoss,
            daiBhukaDate: request.body.daiBhukaDate,
            daiBhukaDescription: request.body.daiBhukaDescription,
            daiBhukaDai: request.body.daiBhukaDai,
            daiBhukaBhuka: request.body.daiBhukaBhuka,
            daiBhuka835Date: request.body.daiBhuka835Date,
            daiBhuka835Description: request.body.daiBhuka835Description,
            daiBhuka835Dai: request.body.daiBhuka835Dai,
            daiBhuka835Bhuka: request.body.daiBhuka835Bhuka,
            is_melting_receiver_updated: request.body.is_melting_receiver_updated,
            is_deleted_flag: request.body.is_deleted_flag,
            is_tarpatta_deleted_flag: request.body.is_tarpatta_deleted_flag,
            is_assigned_to: request.body.is_assigned_to,
            modifiedBy: request.user.email,
        }

        const cleaned_govindBook_data = removeEmpty(govindBook_data);

        await GovindBook.findOneAndUpdate(
            {_id: request.body._id},
            cleaned_govindBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const govindBook = await GovindBook.find({}).populate('user_id', ['_id', 'email'])
        return govindBook;
    }
    catch (e) {
        console.log(e);
    }
})

const govindBookListSchema = {
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

fastify.get('/govindBook-list', govindBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const GovindBook = mongoose.model('govind-book')
    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25
    }
    const govindBooks = await GovindBook.find({}, {}, options);
    return govindBooks;

});


const govindBookMeltingDeleteSchema = {
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
fastify.post('/govindBookMeltingDelete', govindBookMeltingDeleteSchema, async (request, reply) => {
    const GovindBook = mongoose.model('govind-book')
    console.log(request.body);
    const govindStockInfo = await GovindBook.updateMany({ _id: request.body._id }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});

const govindBookTarpattaDeleteSchema = {
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
fastify.post('/govindBookTarpattaDelete', govindBookTarpattaDeleteSchema, async (request, reply) => {
    const GovindBook = mongoose.model('govind-book')
    console.log(request.body);
    const govindStockInfo = await GovindBook.updateMany({ _id: request.body._id }, {is_tarpatta_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});


next();
}