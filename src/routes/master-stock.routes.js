const getFilteredMasterStockInfo = require('../utility/filterDeleted');
const { v4: uuidv4 } = require('uuid');
const mongoose = require("mongoose");


module.exports = function (fastify, opts, next) {

    const masterStockDetailsSchema = {
        schema: {
            description: 'Only authenticate access',
            tags: ['MasterStock'],
            summary: 'Get master Stock details',
            security: [{ apiKey: [] }],
        },
        preHandler: fastify.auth([fastify.jwtAuth])
    }

    fastify.get('/masterStock', masterStockDetailsSchema, async (request, reply) => {
        reply.type('application/json').code(200)
        const MasterStock = mongoose.model('master-stock')
        let stock;
        if (request.isAdminUser) {
            if (!request.headers.masterStock_id) {
                return { success: false, message: 'Missing masterStock_id  in header' };
            }
            stock = await MasterStock.findOne({ _id: request.headers.masterStock_id });
            if (!stock) {
                return { success: false, message: 'Missing masterStock info' };
            }
        } else {
            stock = await MasterStock.findOne({ user_id: request.user._id });
        }
        return getFilteredMasterStockInfo(stock);
    });

    const updatMasterStockSchema = {
        schema: {
            description: 'Only authenticate access',
            tags: ['MasterStock'],
            summary: 'Update MasterStock details',
            security: [{ apiKey: [] }],
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
        },

        preHandler: fastify.auth([fastify.jwtAuth])
    }

    fastify.post('/masterStock', updatMasterStockSchema, async (request, reply) => {
        reply.type('application/json').code(200)
        const MasterStock = mongoose.model('master-stock')
        const User = mongoose.model('User')
        let existingMasterStock;
        console.log(request.headers);
        if (request.isAdminUser) {
            if (!request.headers.masterstock_id) {
                return { success: false, message: 'Missing masterStock_id  in header' };
            }
            existingMasterStock = await MasterStock.findOne({ _id: request.headers.masterstock_id });
            if (!existingMasterStock) {
                return { success: false, message: 'Missing masterStockInfo' };
            }
        } else {
            existingMasterStock = await MasterStock.findOne({ user_id: request.user._id })
        }
        const _id = !!existingMasterStock ? existingMasterStock._id : uuidv4();

        const masterStock_data = {
            masterStock_id: _id,
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
            is_deleted_flag: false,
            }
            const cleaned_masterStock_data = masterStock_data;
            if (!request.isAdminUser) {
                cleaned_masterStock_data.user_id = request.user._id;
    
            }
            let masterStock
            if (!existingMasterStock) {
                console.log("Tesing the provider");
                masterStock = await MasterStock.findOneAndUpdate(
                    { _id },
                    cleaned_masterStock_data,
                    { useFindAndModify: true, upsert: true, new: true }
                );
            }
            else {
                masterStock = existingMasterStock
                await masterStock.set({ ...masterStock, ...cleaned_masterStock_data });
                await masterStock.save();
                await User.findOneAndUpdate({ _id: masterStock.user_id }, 
                                            { $set: { username:request.body.contact_email, email: request.body.contact_email } });
            }

            return getFilteredMasterStockInfo(masterStock);


    });

    const masterStockDeleteSchema = {
        schema: {
            description: 'Admin only: soft delete the MasterStock and associated user account',
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
    fastify.post('/admin/masterStockDelete', masterStockDeleteSchema, async (request, reply) => {
        const MasterStock = mongoose.model('master-stock')
        console.log(request.body);
        const masterStockInfo = await MasterStock.updateMany({ _id: request.body.masterstockId }, {is_deleted_flag: true}, { multi: true })
        // console.log(masterStockInfo);
        return {success: true, message: 'User deleted'};
    });

    next()

}
