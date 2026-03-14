const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const addMeltingBookSchema = {
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
            date: { type: 'string' },
            description: { type: 'string' },
            category: { type: 'string' },
            weight24k: { type: 'string' },
            purity: { type: 'string' },
            conversion: { type: 'string'},
            issue22k: { type: 'string' },
            issue22kActual: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.post('/meltingBook', addMeltingBookSchema, async (request, _reply) => {
    // create the user
    const MeltingBook = mongoose.model('melting-book');
    const meltingBookId = uuidv4();
    try {

        const meltingBook_data = {
            meltingBook_id: meltingBookId,
            date: request.body.date,
            description: request.body.description,
            category: request.body.category,
            weight24k: request.body.weight24k,
            purity: request.body.purity,
            conversion: request.body.conversion,
            issue22k: request.body.issue22k,
            issue22kActual: request.body.issue22kActual,
            createdBy: request.user.email,
            is_receiver_updated: false
            }

        const cleaned_meltingBook_data = removeEmpty(meltingBook_data);

        const updatedData = await MeltingBook.findOneAndUpdate(
            {_id: meltingBookId},
            cleaned_meltingBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        return {success: true, message: 'Melting Book Data added successfully', id: updatedData._id};

        // const meltingBook = await MeltingBook.find({}).populate('user_id', ['_id', 'email'])
        // return meltingBook;
    }
    catch (e) {
        console.log(e);
    }
})

const updatMeltingBookSchema = {
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
            date: { type: 'string' },
            description: { type: 'string' },
            category: { type: 'string' },
            weight24k: { type: 'string' },
            purity: { type: 'string' },
            conversion: { type: 'string' },
            issue22k: { type: 'string' },
            issue22kActual: {type: 'string'},
            createdBy: { type: 'string' },
            modifiedBy: { type: 'string' },
            receive22k: { type: 'string' },
            loss22k: { type: 'string' },
            tarpattaDate: { type: 'string' },
            tarpattaDescription: { type: 'string' },
            tarpattaIssue: { type: 'string' },
            tarpattaReceive: { type: 'string' },
            tarpattaBhuka: { type: 'string' },
            tarpattaLoss: { type: 'string' },

        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.patch('/update/meltingBook', updatMeltingBookSchema, async (request, _reply) => {
    // create the user
    const MeltingBook = mongoose.model('melting-book');
    try {
        if(!request.body._id){
            request.log.error(e.message)
        }

        const meltingBook_data = {
            receive22k: request.body.receive22k,
            loss22k: request.body.loss22k,
            is_receiver_updated: true,
            modifiedBy: request.user.email,
            tarpattaDate: request.body.tarpattaDate,
            tarpattaDescription: request.body.tarpattaDescription,
            tarpattaIssue: request.body.tarpattaIssue,
            tarpattaReceive: request.body.tarpattaReceive,
            tarpattaBhuka: request.body.tarpattaBhuka,
            tarpattaLoss: request.body.tarpattaLoss,
            }

        const cleaned_meltingBook_data = removeEmpty(meltingBook_data);

        const updatedData = await MeltingBook.findOneAndUpdate(
            {_id: request.body._id},
            cleaned_meltingBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        return {success: true, message: 'Melting Book Data updated successfully', id: updatedData._id};
        // const meltingBook = await MeltingBook.find({}).populate('user_id', ['_id', 'email'])
        // return meltingBook;
    }
    catch (e) {
        console.log(e);
    }
})

const meltingBookListSchema = {
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

fastify.get('/meltingStock-list', meltingBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const MeltingBook = mongoose.model('melting-book')
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.itemsPerPage) || 25;
    const state = request.query.state || "all";
    const skip = (page - 1) * limit;
    
    const defaultTotals = [
        {
            "weight24k": [
                {
                    "_id": null,
                    "weight24k": 0
                }
            ],
            "issue22k": [
                {
                    "_id": null,
                    "issue22k": 0
                }
            ],
            "issue22kActual": [
                {
                    "_id": null,
                    "issue22kActual": 0
                }
            ],
            "receive22k": [
                {
                    "_id": null,
                    "receive22k": 0
                }
            ],
            "loss22k": [
                {
                    "_id": null,
                    "loss22k": 0
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
            ]
        }
    ];

    if (state==="all"){
        // Fetch paginated records
        const MeltingBookTest = await MeltingBook.find({})
            .sort({ date: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit);
        
        const totalCount = await MeltingBook.countDocuments({});

        const totalQty = await MeltingBook.aggregate([
            { $match: { is_deleted_flag: false } }, 
            {
                $facet: {
                    weight24k: [
                        { $unwind: "$weight24k" },
                        { $unwind: "$weight24k" },
                        {
                            $group: {
                                _id: null, 
                                weight24k: {
                                    $sum: {
                                        $convert: {
                                            input: "$weight24k",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    issue22k: [
                        { $unwind: "$issue22k" },
                        { $unwind: "$issue22k" },
                        {
                            $group: {
                                _id: null, 
                                issue22k: {
                                    $sum: {
                                        $convert: {
                                            input: "$issue22k",
                                            to: "double", 
                                            onError: 0,  
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    issue22kActual: [
                        { $unwind: "$issue22kActual" },
                        { $unwind: "$issue22kActual" },
                        {
                            $group: {
                                _id: null, 
                                issue22kActual: {
                                    $sum: {
                                        $convert: {
                                            input: "$issue22kActual",
                                            to: "double", 
                                            onError: 0,  
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    receive22k: [
                        { $unwind: "$receive22k" }, 
                        { $unwind: "$receive22k" }, 
                        {
                            $group: {
                                _id: null, 
                                receive22k: {
                                    $sum: {
                                        $convert: {
                                            input: "$receive22k",
                                            to: "double", 
                                            onError: 0, 
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    loss22k: [
                        {
                            $group: {
                                _id: null, 
                                loss22k: {
                                    $sum: {
                                        $convert: {
                                            input: "$loss22k",
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
                    ]
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

        return {"count": totalCount, "totalQty": isEmpty ? defaultTotals: totalQty, "data": MeltingBookTest};
        }

    const boolean = (state === "deleted");

    // Fetch paginated records
    const MeltingBookTest = await MeltingBook.find({is_deleted_flag: boolean})
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalCount = await MeltingBook.countDocuments({is_deleted_flag: boolean});
    
    const totalQty = await MeltingBook.aggregate([
        { $match: { is_deleted_flag: false } }, 
        {
            $facet: {
                weight24k: [
                    { $unwind: "$weight24k" },
                    { $unwind: "$weight24k" },
                    {
                        $group: {
                            _id: null, 
                            weight24k: {
                                $sum: {
                                    $convert: {
                                        input: "$weight24k",
                                        to: "double", 
                                        onError: 0,
                                        onNull: 0
                                    }
                                }
                            }
                        }
                    }
                ],
                issue22k: [
                    { $unwind: "$issue22k" },
                    { $unwind: "$issue22k" },
                    {
                        $group: {
                            _id: null, 
                            issue22k: {
                                $sum: {
                                    $convert: {
                                        input: "$issue22k",
                                        to: "double", 
                                        onError: 0,  
                                        onNull: 0
                                    }
                                }
                            }
                        }
                    }
                ],
                issue22kActual: [
                    { $unwind: "$issue22kActual" },
                    { $unwind: "$issue22kActual" },
                    {
                        $group: {
                            _id: null, 
                            issue22kActual: {
                                $sum: {
                                    $convert: {
                                        input: "$issue22kActual",
                                        to: "double", 
                                        onError: 0,  
                                        onNull: 0
                                    }
                                }
                            }
                        }
                    }
                ],
                receive22k: [
                    { $unwind: "$receive22k" }, 
                    { $unwind: "$receive22k" }, 
                    {
                        $group: {
                            _id: null, 
                            receive22k: {
                                $sum: {
                                    $convert: {
                                        input: "$receive22k",
                                        to: "double", 
                                        onError: 0, 
                                        onNull: 0
                                    }
                                }
                            }
                        }
                    }
                ],
                loss22k: [
                    {
                        $group: {
                            _id: null, 
                            loss22k: {
                                $sum: {
                                    $convert: {
                                        input: "$loss22k",
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
                ]
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

    return {"count": totalCount, "totalQty": isEmpty ? defaultTotals: totalQty, "data": MeltingBookTest};
});


const meltingBookDeleteSchema = {
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
fastify.post('/meltingBookDelete', meltingBookDeleteSchema, async (request, reply) => {
    const MeltingBook = mongoose.model('melting-book')
    //console.log(request.body);
    const masterStockInfo = await MeltingBook.updateMany({ _id: request.body._id }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});

next();
}