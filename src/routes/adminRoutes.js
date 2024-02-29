const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const removeEmpty = require('../utility/removeEmpty')


module.exports = function (fastify, _opts, next) {

const updatMasterStockSchema = {
    schema: {
        description: 'Admin only: Create master stocks',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            type: { type: 'string' },
            date: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
            weight: { type: 'string' },
            issuer: { type: 'string' },
            receiver: { type: 'string' },
            purity: { type: 'string' },
            createdBy: { type: 'string' },
            modifiedBy: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}
fastify.post('/admin/masterStock', updatMasterStockSchema, async (request, _reply) => {
    // create the user
    const MasterStock = mongoose.model('master-stock')
    const User = mongoose.model('User')

    // const existingUser = await User.findOne({ email: request.body.contact_email });
    // if (existingUser) {
    //     return reply.code(409).send({ errorCode: 409, errorMessage: 'Username already exists' })
    // }
    // set a random 12 char base64 as password

    // console.log(userId._id)
    // Reflect.deleteProperty(request.body, 'contact_email')
    // create the provider
    // const providerId = getID(212).id
    // console.log("provider_id",providerId)
    // const providerId = fastify.mongo.ObjectId();
    const masterStockId = uuidv4();

    // create the user
    // const password = await bcrypt.hash(crypto.randomBytes(12).toString('base64').slice(0, 12), await bcrypt.genSalt(10))
    // const userId = getID(112).id
    // console.log("user_id",userId)
    // const newUser = new User(Object.assign({username: request.body.contact_email, email: request.body.contact_email}, {password, roles: ['ROLE_USER']}))
    // const {_id: userId} = await newUser.save()
    // const {_id:userId} = userId

    try {

        const masterStock_data = {
            masterStock_id: masterStockId,
            // created_by: request.body.created_by,
            modified_by: request.user.email,
            type: request.body.type,
            date: request.body.date,
            category: request.body.category,
            description: request.body.description,
            weight: request.body.weight,
            issuer: request.body.issuer,
            receiver: request.body.receiver,
            purity: request.body.purity,
            createdBy: request.user.email,
            modifiedBy: request.user.email,
            }


        const cleaned_masterStock_data = removeEmpty(masterStock_data);

        await MasterStock.findOneAndUpdate(
            {_id: masterStockId},
            cleaned_masterStock_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const masterStock = await MasterStock.find({}).populate('user_id', ['_id', 'email'])
        return masterStock;
    }
    catch (e) {
        console.log(e);
        // await newUser.deleteOne({_id: userId});
        // console.log("Deleted the user created")
    }
})

next();
}