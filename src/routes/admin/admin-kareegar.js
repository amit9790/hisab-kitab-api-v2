const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const addKareegarSchema = {
    schema: {
        description: 'Admin only: Create Kareegar record',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            name: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.post('/kareegar', addKareegarSchema, async (request, _reply) => {
    // create the user
    const Kareegar = mongoose.model('kareegar');
    const kareegarId = uuidv4();
    try {

        const kareegar_data = {
            kareegar_id: kareegarId,
            name: request.body.name,
            description: request.body.description,
            category: request.body.category,
            createdBy: request.user.email,
            }

        const cleaned_kareegar_data = removeEmpty(kareegar_data);

        await Kareegar.findOneAndUpdate(
            {_id: kareegarId},
            cleaned_kareegar_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const KareegarDetails = await Kareegar.find({}).populate('user_id', ['_id', 'email'])
        return KareegarDetails;
    }
    catch (e) {
        console.log(e);
    }
})

const updateKareegarSchema = {
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
            name: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
            createdBy: { type: 'string' },
            modifiedBy: { type: 'string' },
            receive22k: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.patch('/update/kareegar', updateKareegarSchema, async (request, _reply) => {
    // create the user
    const Kareegar = mongoose.model('kareegar');
    try {
        if(!request.body._id){
            request.log.error(e.message)
        }

        const kareegar_data = {
            _id: request.body._id,
            name: request.body.name,
            description: request.body.description,
            category: request.body.category,
            modifiedBy: request.user.email,
            }

        const cleaned_kareegar_data = removeEmpty(kareegar_data);

        await Kareegar.findOneAndUpdate(
            {_id: request.body._id},
            cleaned_kareegar_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        return {message: "updated successfully", status: true}
    }
    catch (e) {
        console.log(e);
        return {message: "error", status: false}

    }
})

const kareegarListSchema = {
    schema: {
        description: 'Admin only: get kareegar',
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

fastify.get('/kareegar-list', kareegarListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const Kareegar = mongoose.model('kareegar');
    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25
    }
    const kareegars = await Kareegar.find({}, {}, options);
    return kareegars;

});


const kareegarDeleteSchema = {
    schema: {
        description: 'Admin only: soft delete the kareegar',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    consumes: ['multipart/form-data'],
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            kareegarIds: { type: "array", items: { type: "string" } },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth,fastify.isAdmin], {relation: 'and'})
}

fastify.post('/kareegarDelete', kareegarDeleteSchema, async (request, reply) => {
    const Kareegar = mongoose.model('kareegar');
    await Kareegar.updateMany({ _id: request.body.kareegarIds }, {is_deleted_flag: true}, { multi: true })
    return {success: true, message: 'kareegar deleted'};
});

next();
}