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
            balance: { type: 'string' },
            beads_balance: { type: 'string' },
            boxWt: { type: 'string' },
            kareegarCutoffDateNumber: { type: 'string' },
            kareegarCutoffStartDate: { type: 'string' },
            kareegarCutoffEndDate:{ type: 'string' },
            is_hidden_flag: { type: 'string'},
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
            is_hidden_flag: request.body.is_hidden_flag,
            kareegarCutoffDateNumber: request.body.kareegarCutoffDateNumber,
            kareegarCutoffStartDate: request.body.kareegarCutoffStartDate,
            kareegarCutoffEndDate: request.body.kareegarCutoffEndDate,
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
            kareegarCutoffDateNumber: { type: 'string' },
            kareegarCutoffStartDate: { type: 'string' },
            kareegarCutoffEndDate:{ type: 'string' },
            is_hidden_flag: { type: 'string'},
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
            is_hidden_flag: request.body.is_hidden_flag,
            kareegarCutoffDateNumber: request.body.kareegarCutoffDateNumber,
            kareegarCutoffStartDate: request.body.kareegarCutoffStartDate,
            kareegarCutoffEndDate: request.body.kareegarCutoffEndDate,
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

const updateKareegarBalanceSchema = {
    schema: {
        description: 'Admin only: Modify Balance and Box Wt',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            balance: {type: 'string'},
            boxWt: {type: 'string'},
            beads_balance: {typeof: 'string'},
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.patch('/update/kareegarBalance', updateKareegarBalanceSchema, async (request, _reply) => {
    // create the user
    const Kareegar = mongoose.model('kareegar');
    try {
        if(!request.body._id){
            request.log.error(e.message)
        }

        const kareegar_data = {
            _id: request.body._id,
            balance: request.body.balance,
            boxWt: request.body.boxWt,
            beads_balance: request.body.beads_balance,
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
    const KareegarBook = mongoose.model('kareegar-book');
        
    const defaultTotals = [{
        _id: null,
        issue_wt: 0,
        recv_wt: 0,
        loss_wt: 0,
        beads_issue_wt: 0,
        beads_recv_wt: 0,
    }];

    const boolean = false;

    // Fetch paginated records
    const KareegarTest = await Kareegar.find({is_deleted_flag: boolean});

    const totalCount = await Kareegar.countDocuments({is_deleted_flag: boolean});
        
    const totalQty = await KareegarBook.aggregate([
        { $match: { is_deleted_flag: boolean, is_editable_flag: true} },
        {
          $group: {
            _id: "$kareegar_id",
            issue_wt: { 
                $sum: {
                    $convert: {
                        input: "$issue_wt",
                        to: "double", 
                        onError: 0,
                        onNull: 0
                    }
                }
             },
            recv_wt: { 
                $sum: {
                    $convert: {
                        input: "$recv_wt",
                        to: "double", 
                        onError: 0,
                        onNull: 0
                    }
                }
             },
            loss_wt: { 
                $sum: {
                    $convert: {
                        input: "$loss_wt",
                        to: "double", 
                        onError: 0,
                        onNull: 0
                    }
                }
             },
            beads_issue_wt: { 
                $sum: {
                    $convert: {
                        input: "$beads_issue_wt",
                        to: "double", 
                        onError: 0,
                        onNull: 0
                    }
                }
             },
            beads_recv_wt: { 
                $sum: {
                    $convert: {
                        input: "$beads_recv_wt",
                        to: "double", 
                        onError: 0,
                        onNull: 0
                    }
                }
             },
          }
        },
          {
         $project: {
            _id: 1,
            issue_wt: 1,
            recv_wt: 1,
            loss_wt: 1,
            beads_issue_wt: 1,
            beads_recv_wt: 1,
            balance: {
            $subtract: [
                { $subtract: ["$issue_wt", "$recv_wt"] },
                "$loss_wt"
            ]
            },
            beads_balance:{
                $subtract: [
                "$beads_issue_wt", "$beads_recv_wt"
            ]
            },
            }
        }
      ]);   

    totalQty.forEach(obj => {
    Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key]) && obj[key].length === 0) {
        obj[key] = [{ _id: null, [key]: 0 }];
        }
    });
    });

    const isEmpty = totalQty.length === 0 || (totalQty.length === 1 && Object.values(totalQty[0]).every(arr => Array.isArray(arr) && arr.length === 0));

    return {"count": totalCount, "data": KareegarTest, "totalQty": isEmpty ? defaultTotals: totalQty};

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