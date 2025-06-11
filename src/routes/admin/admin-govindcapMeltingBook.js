const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const addGovindCapAcctBookSchema = {
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

fastify.post('/govindCapMeltingAcctBook', addGovindCapAcctBookSchema, async (request, _reply) => {
    // create the user
    const GovindBook = mongoose.model('govindcapmelting-book');
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
            is_melting_receiver_updated: request.body.is_melting_receiver_updated,
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
            is_melting_receiver_updated: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.patch('/update/govindCapMeltingAcctBook', updateGovindBookSchema, async (request, _reply) => {
    // create the user
    const GovindBook = mongoose.model('govindcapmelting-book');
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
            is_melting_receiver_updated: request.body.is_melting_receiver_updated,
            is_deleted_flag: request.body.is_deleted_flag,
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
            page: { type: 'number', default: 1 },
            state: { type: 'string', default: "all" }
        }
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.get('/govindCapMeltingAcctBook-list', govindBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const GovindBook = mongoose.model('govindcapmelting-book')
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
            "meltingIssue": [
                {
                    "_id": null,
                    "meltingIssue": 0
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
        const GovindMeltingBookData = await GovindBook.find({})
            .sort({ date: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit);
        
        const totalCount = await GovindBook.countDocuments({});

        const totalQty = await GovindBook.aggregate([
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
                    meltingIssue: [
                        {
                            $group: {
                                _id: null, 
                                meltingIssue: {
                                    $sum: {
                                        $convert: {
                                            input: "$meltingIssue",
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
                    ]
                }
            }
        ]);
    
        return {"count": totalCount, "totalQty": totalQty.length === 0 ? defaultTotals: totalQty, "data": GovindMeltingBookData};
        }

    const boolean = (state === "deleted");

    // Fetch paginated records
    const GovindMeltingBookData = await GovindBook.find({is_deleted_flag: boolean})
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalCount = await GovindBook.countDocuments({is_deleted_flag: boolean});
    
    const totalQty = await GovindBook.aggregate([
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
                meltingIssue: [
                    {
                        $group: {
                            _id: null, 
                            meltingIssue: {
                                $sum: {
                                    $convert: {
                                        input: "$meltingIssue",
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
                ]
            }
        }
    ]);

    return {"count": totalCount, "totalQty": totalQty.length === 0 ? defaultTotals: totalQty, "data": GovindMeltingBookData};    
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
fastify.post('/govindCapAcctBookMeltingDelete', govindBookMeltingDeleteSchema, async (request, reply) => {
    const GovindBook = mongoose.model('govindcapmelting-book')
    //console.log(request.body);
    const govindStockInfo = await GovindBook.updateMany({ _id: request.body._id }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});

next();
}