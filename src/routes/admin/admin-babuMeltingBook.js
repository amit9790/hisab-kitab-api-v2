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
            page: { type: 'number', default: 1 },
            state: { type: 'string', default: "all" }
        }
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.get('/babuMeltingAcctBook-list', babuBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const BabuBook = mongoose.model('babumelting-book')
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.itemsPerPage) || 25;
    const state = request.query.state || "all";
    const skip = (page - 1) * limit;
    
    const defaultTotals = [
        {
            "meltingWeight": [
                {
                    "_id": null,
                    "meltingWeight": 0
                }
            ],
            "meltingIssueActual": [
                {
                    "_id": null,
                    "meltingIssueActual": 0
                }
            ],
            "meltingReceive": [
                {
                    "_id": null,
                    "meltingReceive": 0
                }
            ],
            "meltingLoss": [
                {
                    "_id": null,
                    "meltingLoss": 0
                }
            ]
        }
    ];

    if (state==="all"){
        // Fetch paginated records
        const BabuBookData = await BabuBook.find({})
            .sort({ meltingDate: -1 })
            .skip(skip)
            .limit(limit);
        
        const totalCount = await BabuBook.countDocuments({});

        const totalQty = await BabuBook.aggregate([
            { $match: { is_deleted_flag: false } }, 
            {
                $facet: {
                    meltingWeight: [
                        { $unwind: "$meltingWeight" },
                        { $unwind: "$meltingWeight" },
                        {
                            $group: {
                                _id: null, 
                                meltingWeight: {
                                    $sum: {
                                        $convert: {
                                            input: "$meltingWeight",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    meltingIssueActual: [
                        { $unwind: "$meltingIssueActual" },
                        { $unwind: "$meltingIssueActual" },
                        {
                            $group: {
                                _id: null, 
                                meltingIssueActual: {
                                    $sum: {
                                        $convert: {
                                            input: "$meltingIssueActual",
                                            to: "double", 
                                            onError: 0,  
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    meltingReceive: [
                        { $unwind: "$meltingReceive" }, 
                        { $unwind: "$meltingReceive" }, 
                        {
                            $group: {
                                _id: null, 
                                meltingReceive: {
                                    $sum: {
                                        $convert: {
                                            input: "$meltingReceive",
                                            to: "double", 
                                            onError: 0, 
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    meltingLoss: [
                        {
                            $group: {
                                _id: null, 
                                meltingLoss: {
                                    $sum: {
                                        $convert: {
                                            input: "$meltingLoss",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
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

        return {"count": totalCount, "totalQty": isEmpty ? defaultTotals: totalQty, "data": BabuBookData};
        }

    const boolean = (state === "deleted");

    // Fetch paginated records
    const BabuBookData = await BabuBook.find({is_deleted_flag: boolean})
        .sort({ meltingDate: -1 })
        .skip(skip)
        .limit(limit);

    const totalCount = await BabuBook.countDocuments({is_deleted_flag: boolean});
    
    const totalQty = await BabuBook.aggregate([
        { $match: { is_deleted_flag: false } }, 
        {
            $facet: {
                    meltingWeight: [
                        { $unwind: "$meltingWeight" },
                        { $unwind: "$meltingWeight" },
                        {
                            $group: {
                                _id: null, 
                                meltingWeight: {
                                    $sum: {
                                        $convert: {
                                            input: "$meltingWeight",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    meltingIssueActual: [
                        { $unwind: "$meltingIssueActual" },
                        { $unwind: "$meltingIssueActual" },
                        {
                            $group: {
                                _id: null, 
                                meltingIssueActual: {
                                    $sum: {
                                        $convert: {
                                            input: "$meltingIssueActual",
                                            to: "double", 
                                            onError: 0,  
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    meltingReceive: [
                        { $unwind: "$meltingReceive" }, 
                        { $unwind: "$meltingReceive" }, 
                        {
                            $group: {
                                _id: null, 
                                meltingReceive: {
                                    $sum: {
                                        $convert: {
                                            input: "$meltingReceive",
                                            to: "double", 
                                            onError: 0, 
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    meltingLoss: [
                        {
                            $group: {
                                _id: null, 
                                meltingLoss: {
                                    $sum: {
                                        $convert: {
                                            input: "$meltingLoss",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
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

    return {"count": totalCount, "totalQty": isEmpty ? defaultTotals: totalQty, "data": BabuBookData};
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
    //console.log(request.body);
    const babuStockInfo = await BabuBook.updateMany({ _id: request.body._id }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});

next();
}