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
            machine835Date: { type: 'string' },
            machine835Description: { type: 'string' },
            machine835Issue: { type: 'string' },
            machine835Receive: { type: 'string' },
            machine835Loss: { type: 'string' },
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
            machine835Date: request.body.machine835Date,
            machine835Description: request.body.machine835Description,
            machine835Issue: request.body.machine835Issue,
            machine835Receive: request.body.machine835Receive,
            machine835Loss: request.body.machine835Loss,
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
            machine835Date: { type: 'string' },
            machine835Description: { type: 'string' },
            machine835Issue: { type: 'string' },
            machine835Receive: { type: 'string' },
            machine835Loss: { type: 'string' },
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
            machine835Date: request.body.machine835Date,
            machine835Description: request.body.machine835Description,
            machine835Issue: request.body.machine835Issue,
            machine835Receive: request.body.machine835Receive,
            machine835Loss: request.body.machine835Loss,
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
            page: { type: 'number', default: 1 },
            state: { type: 'string', default: "all" },
            is_assigned_to: { type: 'string', default: 'undefined'},
        }
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.get('/govindBook-list', govindBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const GovindBook = mongoose.model('govind-book')

    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.itemsPerPage) || 25;
    const state = request.query.state || "all";
    const skip = (page - 1) * limit;
    const is_assigned_to = request.query.is_assigned_to || 'undefined';
    const query = {};

    if (is_assigned_to !== 'undefined' && is_assigned_to !== "all") {
        query.is_assigned_to = is_assigned_to;
    }

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
            ],
            "tarpattaIssue": [
                {
                    "_id": null,
                    "tarpattaIssue": 0
                }
            ],
            "tarpattaReceive": [
                {
                    "_id": null,
                    "tarpattaReceive": 0
                }
            ],
            "tarpattaBhuka": [
                {
                    "_id": null,
                    "tarpattaBhuka": 0
                }
            ],
            "tarpattaLoss": [
                {
                    "_id": null,
                    "tarpattaLoss": 0
                }
            ],
            "machineIssue": [
                {
                    "_id": null,
                    "machineIssue": 0
                }
            ],
            "machineReceive": [
                {
                    "_id": null,
                    "machineReceive": 0
                }
            ],
            "machineLoss": [
                {
                    "_id": null,
                    "machineLoss": 0
                }
            ],
            "daiBhukaDai": [
                {
                    "_id": null,
                    "daiBhukaDai": 0
                }
            ],
            "daiBhukaBhuka": [
                {
                    "_id": null,
                    "daiBhukaBhuka": 0
                }
            ],
            "machine835Issue": [
                {
                    "_id": null,
                    "machine835Issue": 0
                }
            ],
            "machine835Receive": [
                {
                    "_id": null,
                    "machine835Receive": 0
                }
            ],
            "machine835Loss": [
                {
                    "_id": null,
                    "machine835Loss": 0
                }
            ],
            "daiBhuka835Dai": [
                {
                    "_id": null,
                    "daiBhuka835Dai": 0
                }
            ],
            "daiBhuka835Bhuka": [
                {
                    "_id": null,
                    "daiBhuka835Bhuka": 0
                }
            ]
        }
    ];

    if (state==="all"){
        // Fetch paginated records
        const GovindBookData = await GovindBook.find(query)
            .sort({ date: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit);
        
        const totalCount = await GovindBook.countDocuments(query);

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
                    ],
                    tarpattaIssue: [
                        { $unwind: "$tarpattaIssue" },
                        { $unwind: "$tarpattaIssue" },
                        {
                            $group: {
                                _id: null, 
                                tarpattaIssue: {
                                    $sum: {
                                        $convert: {
                                            input: "$tarpattaIssue",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    tarpattaReceive: [
                        { $unwind: "$tarpattaReceive" },
                        { $unwind: "$tarpattaReceive" },
                        {
                            $group: {
                                _id: null, 
                                tarpattaReceive: {
                                    $sum: {
                                        $convert: {
                                            input: "$tarpattaReceive",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    tarpattaBhuka: [
                        { $unwind: "$tarpattaBhuka" },
                        { $unwind: "$tarpattaBhuka" },
                        {
                            $group: {
                                _id: null, 
                                tarpattaBhuka: {
                                    $sum: {
                                        $convert: {
                                            input: "$tarpattaBhuka",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    tarpattaLoss: [
                        {
                            $group: {
                                _id: null, 
                                tarpattaLoss: {
                                    $sum: {
                                        $convert: {
                                            input: "$tarpattaLoss",
                                            to: "double", 
                                            onError: 0,  
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    machineIssue: [
                        { $match: { is_assigned_to: "Dai + Bhuka" } },
                        { $unwind: "$machineIssue" },
                        { $unwind: "$machineIssue" },
                        {
                            $group: {
                                _id: null, 
                                machineIssue: {
                                    $sum: {
                                        $convert: {
                                            input: "$machineIssue",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    machineReceive: [
                        { $match: { is_assigned_to: "Dai + Bhuka" } },
                        {
                            $group: {
                                _id: null, 
                                machineReceive: {
                                    $sum: {
                                        $convert: {
                                            input: "$machineReceive",
                                            to: "double", 
                                            onError: 0,  
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    machineLoss: [
                        { $match: { is_assigned_to: "Dai + Bhuka" } },
                        {
                            $group: {
                                _id: null, 
                                machineLoss: {
                                    $sum: {
                                        $convert: {
                                            input: "$machineLoss",
                                            to: "double", 
                                            onError: 0,  
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    daiBhukaDai: [
                        { $match: { is_assigned_to: "Dai + Bhuka" } },
                        { $unwind: "$daiBhukaDai" },
                        { $unwind: "$daiBhukaDai" },
                        {
                            $group: {
                                _id: null, 
                                daiBhukaDai: {
                                    $sum: {
                                        $convert: {
                                            input: "$daiBhukaDai",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    daiBhukaBhuka: [
                        { $match: { is_assigned_to: "Dai + Bhuka" } },
                        { $unwind: "$daiBhukaBhuka" },
                        { $unwind: "$daiBhukaBhuka" },
                        {
                            $group: {
                                _id: null, 
                                daiBhukaBhuka: {
                                    $sum: {
                                        $convert: {
                                            input: "$daiBhukaBhuka",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    machine835Issue: [
                        { $match: { is_assigned_to: "83.50 + 75 A/C" } },
                        { $unwind: "$machine835Issue" },
                        { $unwind: "$machine835Issue" },
                        {
                            $group: {
                                _id: null, 
                                machine835Issue: {
                                    $sum: {
                                        $convert: {
                                            input: "$machine835Issue",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    machine835Receive: [
                        { $match: { is_assigned_to: "83.50 + 75 A/C" } },
                        {
                            $group: {
                                _id: null, 
                                machine835Receive: {
                                    $sum: {
                                        $convert: {
                                            input: "$machine835Receive",
                                            to: "double", 
                                            onError: 0,  
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    machine835Loss: [
                        { $match: { is_assigned_to: "83.50 + 75 A/C" } },
                        {
                            $group: {
                                _id: null, 
                                machine835Loss: {
                                    $sum: {
                                        $convert: {
                                            input: "$machine835Loss",
                                            to: "double", 
                                            onError: 0,  
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    daiBhuka835Dai: [
                        { $match: { is_assigned_to: "83.50 + 75 A/C" } },
                        { $unwind: "$daiBhuka835Dai" },
                        { $unwind: "$daiBhuka835Dai" },
                        {
                            $group: {
                                _id: null, 
                                daiBhuka835Dai: {
                                    $sum: {
                                        $convert: {
                                            input: "$daiBhuka835Dai",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    daiBhuka835Bhuka: [
                        { $match: { is_assigned_to: "83.50 + 75 A/C" } },
                        { $unwind: "$daiBhuka835Bhuka" },
                        { $unwind: "$daiBhuka835Bhuka" },
                        {
                            $group: {
                                _id: null, 
                                daiBhuka835Bhuka: {
                                    $sum: {
                                        $convert: {
                                            input: "$daiBhuka835Bhuka",
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
        ])

        totalQty.forEach(obj => {
        Object.keys(obj).forEach(key => {
            if (Array.isArray(obj[key]) && obj[key].length === 0) {
            obj[key] = [{ _id: null, [key]: 0 }];
            }
        });
        });

        const isEmpty = totalQty.length === 0 || (totalQty.length === 1 && Object.values(totalQty[0]).every(arr => Array.isArray(arr) && arr.length === 0));

        return {"count": totalCount, "totalQty": isEmpty ? defaultTotals: totalQty, "data": GovindBookData};

        }

    const boolean = (state === "deleted");

    query.is_deleted_flag = boolean;

// Fetch paginated records
        const GovindBookData = await GovindBook.find(query)
            .sort({ date: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit);
        
        const totalCount = await GovindBook.countDocuments(query);

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
                    ],
                    tarpattaIssue: [
                        { $unwind: "$tarpattaIssue" },
                        { $unwind: "$tarpattaIssue" },
                        {
                            $group: {
                                _id: null, 
                                tarpattaIssue: {
                                    $sum: {
                                        $convert: {
                                            input: "$tarpattaIssue",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    tarpattaReceive: [
                        { $unwind: "$tarpattaReceive" },
                        { $unwind: "$tarpattaReceive" },
                        {
                            $group: {
                                _id: null, 
                                tarpattaReceive: {
                                    $sum: {
                                        $convert: {
                                            input: "$tarpattaReceive",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    tarpattaBhuka: [
                        { $unwind: "$tarpattaBhuka" },
                        { $unwind: "$tarpattaBhuka" },
                        {
                            $group: {
                                _id: null, 
                                tarpattaBhuka: {
                                    $sum: {
                                        $convert: {
                                            input: "$tarpattaBhuka",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    tarpattaLoss: [
                        {
                            $group: {
                                _id: null, 
                                tarpattaLoss: {
                                    $sum: {
                                        $convert: {
                                            input: "$tarpattaLoss",
                                            to: "double", 
                                            onError: 0,  
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    machineIssue: [
                        { $match: { is_assigned_to: "Dai + Bhuka" } },
                        { $unwind: "$machineIssue" },
                        { $unwind: "$machineIssue" },
                        {
                            $group: {
                                _id: null, 
                                machineIssue: {
                                    $sum: {
                                        $convert: {
                                            input: "$machineIssue",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    machineReceive: [
                        { $match: { is_assigned_to: "Dai + Bhuka" } },
                        {
                            $group: {
                                _id: null, 
                                machineReceive: {
                                    $sum: {
                                        $convert: {
                                            input: "$machineReceive",
                                            to: "double", 
                                            onError: 0,  
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    machineLoss: [
                        { $match: { is_assigned_to: "Dai + Bhuka" } },
                        {
                            $group: {
                                _id: null, 
                                machineLoss: {
                                    $sum: {
                                        $convert: {
                                            input: "$machineLoss",
                                            to: "double", 
                                            onError: 0,  
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    daiBhukaDai: [
                        { $match: { is_assigned_to: "Dai + Bhuka" } },
                        { $unwind: "$daiBhukaDai" },
                        { $unwind: "$daiBhukaDai" },
                        {
                            $group: {
                                _id: null, 
                                daiBhukaDai: {
                                    $sum: {
                                        $convert: {
                                            input: "$daiBhukaDai",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    daiBhukaBhuka: [
                        { $match: { is_assigned_to: "Dai + Bhuka" } },
                        { $unwind: "$daiBhukaBhuka" },
                        { $unwind: "$daiBhukaBhuka" },
                        {
                            $group: {
                                _id: null, 
                                daiBhukaBhuka: {
                                    $sum: {
                                        $convert: {
                                            input: "$daiBhukaBhuka",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    machine835Issue: [
                        { $match: { is_assigned_to: "83.50 + 75 A/C" } },
                        { $unwind: "$machine835Issue" },
                        { $unwind: "$machine835Issue" },
                        {
                            $group: {
                                _id: null, 
                                machine835Issue: {
                                    $sum: {
                                        $convert: {
                                            input: "$machine835Issue",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    machine835Receive: [
                        { $match: { is_assigned_to: "83.50 + 75 A/C" } },
                        {
                            $group: {
                                _id: null, 
                                machine835Receive: {
                                    $sum: {
                                        $convert: {
                                            input: "$machine835Receive",
                                            to: "double", 
                                            onError: 0,  
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    machine835Loss: [
                        { $match: { is_assigned_to: "83.50 + 75 A/C" } },
                        {
                            $group: {
                                _id: null, 
                                machine835Loss: {
                                    $sum: {
                                        $convert: {
                                            input: "$machine835Loss",
                                            to: "double", 
                                            onError: 0,  
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    daiBhuka835Dai: [
                        { $match: { is_assigned_to: "83.50 + 75 A/C" } },
                        { $unwind: "$daiBhuka835Dai" },
                        { $unwind: "$daiBhuka835Dai" },
                        {
                            $group: {
                                _id: null, 
                                daiBhuka835Dai: {
                                    $sum: {
                                        $convert: {
                                            input: "$daiBhuka835Dai",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    daiBhuka835Bhuka: [
                        { $match: { is_assigned_to: "83.50 + 75 A/C" } },
                        { $unwind: "$daiBhuka835Bhuka" },
                        { $unwind: "$daiBhuka835Bhuka" },
                        {
                            $group: {
                                _id: null, 
                                daiBhuka835Bhuka: {
                                    $sum: {
                                        $convert: {
                                            input: "$daiBhuka835Bhuka",
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
        ])

        totalQty.forEach(obj => {
        Object.keys(obj).forEach(key => {
            if (Array.isArray(obj[key]) && obj[key].length === 0) {
            obj[key] = [{ _id: null, [key]: 0 }];
            }
        });
        });

        const isEmpty = totalQty.length === 0 || (totalQty.length === 1 && Object.values(totalQty[0]).every(arr => Array.isArray(arr) && arr.length === 0));

        return {"count": totalCount, "totalQty": isEmpty ? defaultTotals: totalQty, "data": GovindBookData};

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
    //console.log(request.body);
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
    // console.log(request.body);
    const govindStockInfo = await GovindBook.updateMany({ _id: request.body._id }, {is_tarpatta_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});


next();
}