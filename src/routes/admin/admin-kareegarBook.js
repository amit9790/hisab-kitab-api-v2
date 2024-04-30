const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const updateKareegarBookSchema = {
    schema: {
        description: 'Admin only: Create entries in Kareegar Book',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            kareegar_id: { type: 'string'},
            type: { type: 'string' },
            date: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
            issue_wt: { type: 'string' },
            recv_wt: { type: 'string' },
            beads_issue_wt: { type: 'string' },
            beads_recv_wt: { type: 'string' },
            issuer: { type: 'string' },
            receiver: { type: 'string' },
            createdBy:  { type: 'string' },
            modifiedBy: { type: 'string'},
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}
fastify.post('/kareegarBook', updateKareegarBookSchema, async (request, _reply) => {
    // create the user
    const KareegarBook = mongoose.model('kareegar-book')
    const User = mongoose.model('User')

    const kareegarBookId = uuidv4();
    try {

        const kareegarBook_data = {
            kareegarBook_id: kareegarBookId,
            kareegar_id: request.body.kareegar_id,
            // created_by: request.body.created_by,
            // modified_by: request.user.email,
            type: request.body.type,
            date: request.body.date,
            category: request.body.category,
            description: request.body.description,
            issue_wt: request.body.issue_wt,
            recv_wt: request.body.recv_wt,
            loss_wt: request.body.loss_wt,
            beads_issue_wt: request.body.beads_issue_wt,
            beads_recv_wt: request.body.beads_recv_wt,
            issuer: request.body.issuer,
            receiver: request.body.receiver,
            createdBy: request.user.email,
            modifiedBy: request.user.email,
            }

        const cleaned_kareegarBook_data = removeEmpty(kareegarBook_data);

        await KareegarBook.findOneAndUpdate(
            {_id: kareegarBookId},
            cleaned_kareegarBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const kareegarBook = await KareegarBook.find({}).populate('user_id', ['_id', 'email'])
        return kareegarBook_data;
    }
    catch (e) {
        console.log(e);
        // await newUser.deleteOne({_id: userId});
        // console.log("Deleted the user created")
    }
})

const kareegarBookListSchema = {
    schema: {
        description: 'Admin only: Get Kareegar Book',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
        querystring: {
            itemsPerPage: { type: 'number', default: 25 },
            page: { type: 'number', default: 1 },
            kareegar_id: {type: 'string'}
        }
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}
fastify.get('/kareegarBook-list', kareegarBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200);
    const KareegarBook = mongoose.model('kareegar-book');

    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25,
    };

    const kareegarIdFilter = {
        kareegar_id: request.query.kareegar_id
    };

    const KareegarBooks = await KareegarBook.find(kareegarIdFilter, {}, options);
    return KareegarBooks;
});

const kareegarBookDeleteSchema = {
    schema: {
        description: 'Admin only: soft delete the KareegarBook and associated user account',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    consumes: ['multipart/form-data'],
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            kareegarBookId: { type: "array", items: { type: "string" } },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth,fastify.isAdmin], {relation: 'and'})
}
fastify.post('/kareegarBookDelete', kareegarBookDeleteSchema, async (request, reply) => {
    const KareegarBook = mongoose.model('kareegar-book')
    console.log(request.body);
    const KareegarBookInfo = await KareegarBook.updateMany({ _id: request.body.kareegarBookId }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'User deleted'};
});

next();
}