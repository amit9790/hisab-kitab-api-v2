const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const addKareegarBookSchema = {
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
            cutoffDateNumber: { type: 'string' },
            receiver: { type: 'string' },
            is_receiver_updated: {type: 'string'},
            createdBy:  { type: 'string' },
            modifiedBy: { type: 'string'},
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}
fastify.post('/kareegarBook', addKareegarBookSchema, async (request, _reply) => {
    // create the user
    const KareegarBook = mongoose.model('kareegar-book');
    const User = mongoose.model('User');

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
            cutoffDateNumber: request.body.cutoffDateNumber,
            is_receiver_updated: request.body.is_receiver_updated,
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


const updateKareegarBookSchema = {
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
            recv_wt: { type: 'string' },
            beads_recv_wt: { type: 'string' },
            is_receiver_updated: {type: 'string'},
            modifiedBy: { type: 'string'},
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.patch('/update/kareegarBook', updateKareegarBookSchema, async (request, _reply) => {
    // create the user
    const KareegarBook = mongoose.model('kareegar-book')
    try {
        if(!request.body._id){
            request.log.error(e.message)
        }

        const kareegarBook_data = {
            recv_wt: request.body.recv_wt,
            beads_recv_wt: request.body.beads_recv_wt,
            is_receiver_updated: true,
            modifiedBy: request.user.email,
            }

        const cleaned_kareegarBook_data = removeEmpty(kareegarBook_data);

        await KareegarBook.findOneAndUpdate(
            {_id: request.body._id},
            cleaned_kareegarBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const kareegarBook = await KareegarBook.find({}).populate('user_id', ['_id', 'email'])
        return kareegarBook;
    }
    catch (e) {
        console.log(e);
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
            cutoffDateNumber: { type: 'number', default: 0 },
            state: { type: 'string', default: "all" },
            kareegar_id: {type: 'string'}
        }
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}
fastify.get('/kareegarBook-list', kareegarBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200);
    const KareegarBook = mongoose.model('kareegar-book');

    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.itemsPerPage) || 25;
    const state = request.query.state || "all";
    const skip = (page - 1) * limit;
    const kareegarId = request.query.kareegar_id;
    let cutoffDateNumber = parseInt(request.query.cutoffDateNumber) || 1;
    const Kareegar = mongoose.model('kareegar');
    let KareegarDetails = await Kareegar.find({_id: kareegarId});
    if (KareegarDetails[0].kareegarCutoffStartDate.length === cutoffDateNumber){
        cutoffDateNumber = 0;
    }
    const query = {};
    query.kareegar_id = kareegarId;
    query.cutoffDateNumber = cutoffDateNumber;
    const totalQuery = {};
    totalQuery.kareegar_id = kareegarId;
    totalQuery.cutoffDateNumber = cutoffDateNumber;
    totalQuery.is_deleted_flag = false;
    const defaultTotals = [{
        _id: null,
        issue_wt: 0,
        recv_wt: 0,
        loss_wt: 0,
        beads_issue_wt: 0,
        beads_recv_wt: 0,
    }];
    
    if (state==="all"){
        // Fetch paginated records
        const KareegarBookData = await KareegarBook.find(query)
            .sort({ date: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalCount = await KareegarBook.countDocuments(query);

        const totalQty = await KareegarBook.aggregate([
            { $match: totalQuery },
            {
              $group: {
                _id: null,
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
            }
          ]);

        const isEmpty = totalQty.length === 0 || (totalQty.length === 1 && Object.values(totalQty[0]).every(arr => Array.isArray(arr) && arr.length === 0));

        return {"data": KareegarBookData, "count": totalCount, "totalQty":  isEmpty ? defaultTotals: totalQty};
    }

    const boolean = (state === "deleted");
    query.is_deleted_flag = boolean;

    // Fetch paginated records
    const KareegarBookData = await KareegarBook.find(query)
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalCount = await KareegarBook.countDocuments(query);

    const totalQty = await KareegarBook.aggregate([
        { $match: totalQuery },
        {
            $group: {
            _id: null,
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
        }
      ]);

    const isEmpty = totalQty.length === 0 || (totalQty.length === 1 && Object.values(totalQty[0]).every(arr => Array.isArray(arr) && arr.length === 0));

    return {"data": KareegarBookData, "count": totalCount, "totalQty": isEmpty ? defaultTotals: totalQty};
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
    const KareegarBookInfo = await KareegarBook.updateMany({ _id: request.body.kareegarBookId }, {is_deleted_flag: true}, { multi: true })
    return {success: true, message: 'User deleted'};
});

const kareegarBookCloseSchema = {
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
            kareegar_id: { type: "string"},
            cutoffDateNumber: { type: "number" },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth,fastify.isAdmin], {relation: 'and'})
}
fastify.patch('/kareegarBookClose', kareegarBookCloseSchema, async (request, reply) => {
    const KareegarBook = mongoose.model('kareegar-book')
    const allDocs = await KareegarBook.find({});

    if (request.body.cutoffDateNumber === '0'){
        request.log.error("cutoffDateNumber Incorrect");
    }

    // Update all KareegarBooks with cutoffDateNumber = 0
    const result = await KareegarBook.updateMany(
        { kareegar_id: request.body.kareegar_id, 
            $or: [
                { cutoffDateNumber: 0 },
                { cutoffDateNumber: { $exists: false } }
            ], 
          $or: [
            { is_editable_flag: true }, 
            { is_editable_flag: { $exists: false } }
            ]},
        { $set: { cutoffDateNumber: request.body.cutoffDateNumber, is_editable_flag:false } }
    );
    //console.log(result.modifiedCount);

    return reply.send({
        success: true,
        message: 'Closed KareegarBooks successfully',
        modifiedCount: result.modifiedCount,
    });

});

next();
}