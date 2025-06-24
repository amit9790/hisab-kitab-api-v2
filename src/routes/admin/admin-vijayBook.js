const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

const addVijayBookSchema = {
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
            issue_to_kareegar: { type: 'string' },
            vijayDate: { type: 'string' },
            vijayDescription: { type: 'string' },
            vijayIssue: { type: 'string' },
            vijayReceive: { type: 'string' },
            vijayBhuka: { type: 'string' },
            vijayLoss: { type: 'string' },
            manishDate: { type: 'string' },
            manishDescription: { type: 'string' },
            manishIssue: { type: 'string' },
            manishReceive: { type: 'string' },
            manishBhuka: { type: 'string' },
            manishLoss: { type: 'string' },
            solderDate: { type: 'string' },
            solderLotNo: { type: 'string' },
            solderItem: { type: 'string' },
            solderMelting: { type: 'string' },
            solderChainIssue: { type: 'string' },
            solderChainReceive: { type: 'string' },
            solderBhuka: { type: 'string' },
            solderTotal: { type: 'string'},
            solderPowder: { type: 'string' },
            solderR1: { type: 'string' },
            solderR2: { type: 'string' },
            is_solder_updated: { type: 'string' },
            jointDate: { type: 'string' },
            jointLotNo: { type: 'string' },
            jointItem: { type: 'string' },
            jointMelting: { type: 'string' },
            jointChainIssue: { type: 'string' },
            jointChainReceive: { type: 'string' },
            jointBhuka: { type: 'string' },
            jointTotal: { type: 'string'},
            jointPowder: { type: 'string' },
            jointR1: { type: 'string' },
            jointR2: { type: 'string' },
            is_joint_updated: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.post('/vijayBook', addVijayBookSchema, async (request, _reply) => {
    // create the user
    const VijayBook = mongoose.model('vijay-book');
    const vijayBookId = uuidv4();
    try {

        const vijayBook_data = {
            vijayBook_id: vijayBookId,
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
            issue_to_kareegar: request.body.issue_to_kareegar,
            vijayDate: request.body.vijayDate,
            vijayDescription: request.body.vijayDescription,
            vijayIssue: request.body.vijayIssue,
            vijayReceive: request.body.vijayReceive,
            vijayBhuka: request.body.vijayBhuka,
            vijayLoss: request.body.vijayLoss,
            manishDate: request.body.manishDate,
            manishDescription: request.body.manishDescription,
            manishIssue: request.body.manishIssue,
            manishReceive: request.body.manishReceive,
            manishBhuka: request.body.manishBhuka,
            manishLoss: request.body.manishLoss,
            solderDate: request.body.solderDate,
            solderLotNo: request.body.solderLotNo,
            solderItem: request.body.solderItem,
            solderMelting: request.body.solderMelting,
            solderChainIssue: request.body.solderChainIssue,
            solderChainReceive: request.body.solderChainReceive,
            solderPowder: request.body.solderPowder,
            solderTotal: request.body.solderTotal,
            solderBhuka: request.body.solderBhuka,
            solderR1: request.body.solderR1,
            solderR2: request.body.solderR2,
            is_solder_updated: request.body.is_solder_updated,
            createdBy: request.user.email,
            jointDate: request.body.jointDate,
            jointLotNo: request.body.jointLotNo,
            jointItem: request.body.jointItem,
            jointMelting: request.body.jointMelting,
            jointChainIssue: request.body.jointChainIssue,
            jointChainReceive: request.body.jointChainReceive,
            jointPowder: request.body.jointPowder,
            jointTotal: request.body.jointTotal,
            jointBhuka: request.body.jointBhuka,
            jointR1: request.body.jointR1,
            jointR2: request.body.jointR2,
            is_joint_updated: request.body.is_joint_updated,
            is_receiver_updated: false
            }

        const cleaned_vijayBook_data = removeEmpty(vijayBook_data);

        await VijayBook.findOneAndUpdate(
            {_id: vijayBookId},
            cleaned_vijayBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const vijayBook = await VijayBook.find({}).populate('user_id', ['_id', 'email'])
        return vijayBook;
    }
    catch (e) {
        console.log(e);
    }
})

const updateVijayBookSchema = {
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
            issue_to_kareegar: { type: 'string' },
            vijayDate: { type: 'string' },
            vijayDescription: { type: 'string' },
            vijayIssue: { type: 'string' },
            vijayReceive: { type: 'string' },
            vijayBhuka: { type: 'string' },
            vijayLoss: { type: 'string' },
            manishDate: { type: 'string' },
            manishDescription: { type: 'string' },
            manishIssue: { type: 'string' },
            manishReceive: { type: 'string' },
            manishBhuka: { type: 'string' },
            manishLoss: { type: 'string' },
            solderDate: { type: 'string' },
            solderLotNo: { type: 'string' },
            solderItem: { type: 'string' },
            solderMelting: { type: 'string' },
            solderChainIssue: { type: 'string' },
            solderChainReceive: { type: 'string' },
            solderBhuka: { type: 'string' },
            solderTotal: { type: 'string' },
            solderPowder: { type: 'string' },
            solderR1: { type: 'string' },
            solderR2: { type: 'string' },
            is_solder_updated: { type: 'string' },
            jointDate: { type: 'string' },
            jointLotNo: { type: 'string' },
            jointItem: { type: 'string' },
            jointMelting: { type: 'string' },
            jointChainIssue: { type: 'string' },
            jointChainReceive: { type: 'string' },
            jointBhuka: { type: 'string' },
            jointTotal: { type: 'string'},
            jointPowder: { type: 'string' },
            jointR1: { type: 'string' },
            jointR2: { type: 'string' },
            is_joint_updated: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.patch('/update/vijayBook', updateVijayBookSchema, async (request, _reply) => {
    // create the user
    const VijayBook = mongoose.model('vijay-book');
    try {
        if(!request.body._id){
            request.log.error(e.message)
        }

        const vijayBook_data = {
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
            is_melting_receiver_updated: request.body.is_melting_receiver_updated,
            is_melting_deleted_flag: request.body.is_melting_deleted_flag,
            is_tarpatta_deleted_flag: request.body.is_tarpatta_deleted_flag,
            issue_to_kareegar: request.body.issue_to_kareegar,
            vijayDate: request.body.vijayDate,
            vijayDescription: request.body.vijayDescription,
            vijayIssue: request.body.vijayIssue,
            vijayReceive: request.body.vijayReceive,
            vijayBhuka: request.body.vijayBhuka,
            vijayLoss: request.body.vijayLoss,
            manishDate: request.body.manishDate,
            manishDescription: request.body.manishDescription,
            manishIssue: request.body.manishIssue,
            manishReceive: request.body.manishReceive,
            manishBhuka: request.body.manishBhuka,
            manishLoss: request.body.manishLoss,
            solderDate: request.body.solderDate,
            solderLotNo: request.body.solderLotNo,
            solderItem: request.body.solderItem,
            solderMelting: request.body.solderMelting,
            solderChainIssue: request.body.solderChainIssue,
            solderChainReceive: request.body.solderChainReceive,
            solderPowder: request.body.solderPowder,
            solderTotal: request.body.solderTotal,
            solderBhuka: request.body.solderBhuka,
            solderR1: request.body.solderR1,
            solderR2: request.body.solderR2,
            is_solder_updated: request.body.is_solder_updated,
            jointDate: request.body.jointDate,
            jointLotNo: request.body.jointLotNo,
            jointItem: request.body.jointItem,
            jointMelting: request.body.jointMelting,
            jointChainIssue: request.body.jointChainIssue,
            jointChainReceive: request.body.jointChainReceive,
            jointPowder: request.body.jointPowder,
            jointTotal: request.body.jointTotal,
            jointBhuka: request.body.jointBhuka,
            jointR1: request.body.jointR1,
            jointR2: request.body.jointR2,
            is_joint_updated: request.body.is_joint_updated,
            modifiedBy: request.user.email,
        }

        const cleaned_vijayBook_data = removeEmpty(vijayBook_data);

        await VijayBook.findOneAndUpdate(
            {_id: request.body._id},
            cleaned_vijayBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const vijayBook = await VijayBook.find({}).populate('user_id', ['_id', 'email'])
        return vijayBook;
    }
    catch (e) {
        console.log(e);
    }
})

const vijayBookListSchema = {
    schema: {
        description: 'Admin only: Create melting books',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
        querystring: {
            itemsPerPage: { type: 'number', default: 25 },
            page: { type: 'number', default: 1 },
            state: { type: 'string', default: "all" },
            issue_to_kareegar: { type: 'string', default: 'undefined'},
            checkSolderChain: { type: 'string', default: 'undefined' },
            checkJointChain: { type: 'string', default: 'undefined' },
        }
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.get('/vijayBook-list', vijayBookListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const VijayBook = mongoose.model('vijay-book')
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.itemsPerPage) || 25;
    const state = request.query.state || "all";
    const skip = (page - 1) * limit;
    const issue_to_kareegar = request.query.issue_to_kareegar || 'undefined';
    const checkSolderChain = request.query.checkSolderChain || 'undefined';
    const checkJointChain = request.query.checkJointChain || 'undefined';
    const query = {};

    if (issue_to_kareegar !== 'undefined' && issue_to_kareegar !== "all") {
        query.issue_to_kareegar = issue_to_kareegar;
    };

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
            "vijayTarpattaReceive": [
                {
                    "_id": null,
                    "vijayTarpattaReceive": 0
                }
            ],
            "vijayIssue": [
                {
                    "_id": null,
                    "vijayIssue": 0
                }
            ],
            "vijayReceive": [
                {
                    "_id": null,
                    "vijayReceive": 0
                }
            ],
            "vijayBhuka": [
                {
                    "_id": null,
                    "vijayBhuka": 0
                }
            ],
            "vijayLoss": [
                {
                    "_id": null,
                    "vijayLoss": 0
                }
            ],
            "manishTarpattaReceive": [
                {
                    "_id": null,
                    "manishTarpattaReceive": 0
                }
            ],
            "manishIssue": [
                {
                    "_id": null,
                    "manishIssue": 0
                }
            ],
            "manishReceive": [
                {
                    "_id": null,
                    "manishReceive": 0
                }
            ],
            "manishBhuka": [
                {
                    "_id": null,
                    "manishBhuka": 0
                }
            ],
            "manishLoss": [
                {
                    "_id": null,
                    "manishLoss": 0
                }
            ]
        }
    ];

    if (state==="all"){
        // Fetch paginated records
        const VijayBookData = await VijayBook.find(query)
            .sort({ date: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit);
        
        const totalCount = await VijayBook.countDocuments(query);

        const totalQty = await VijayBook.aggregate([
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
                    meltingBhuka: [
                        {
                            $group: {
                                _id: null, 
                                meltingBhuka: {
                                    $sum: {
                                        $convert: {
                                            input: "$meltingBhuka",
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
                    vijayTarpattaReceive: [
                        { $match: { issue_to_kareegar: "Vijay" } },
                        { $unwind: "$tarpattaReceive" },
                        { $unwind: "$tarpattaReceive" },
                        {
                            $group: {
                                _id: null, 
                                vijayTarpattaReceive: {
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
                    vijayIssue: [
                        { $match: { issue_to_kareegar: "Vijay" } },
                        { $unwind: "$vijayIssue" },
                        { $unwind: "$vijayIssue" },
                        {
                            $group: {
                                _id: null, 
                                vijayIssue: {
                                    $sum: {
                                        $convert: {
                                            input: "$vijayIssue",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    vijayReceive: [
                        { $match: { issue_to_kareegar: "Vijay" } },
                        { $unwind: "$vijayReceive" },
                        { $unwind: "$vijayReceive" },
                        {
                            $group: {
                                _id: null, 
                                vijayReceive: {
                                    $sum: {
                                        $convert: {
                                            input: "$vijayReceive",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    vijayBhuka: [
                        { $match: { issue_to_kareegar: "Vijay" } },
                        { $unwind: "$vijayBhuka" },
                        { $unwind: "$vijayBhuka" },
                        {
                            $group: {
                                _id: null, 
                                vijayBhuka: {
                                    $sum: {
                                        $convert: {
                                            input: "$vijayBhuka",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    vijayLoss: [
                        { $match: { issue_to_kareegar: "Vijay" } },
                        {
                            $group: {
                                _id: null, 
                                vijayLoss: {
                                    $sum: {
                                        $convert: {
                                            input: "$vijayLoss",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    manishTarpattaReceive: [
                        { $match: { issue_to_kareegar: "Manish" } },
                        { $unwind: "$tarpattaReceive" },
                        { $unwind: "$tarpattaReceive" },
                        {
                            $group: {
                                _id: null, 
                                manishTarpattaReceive: {
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
                    manishIssue: [
                        { $match: { issue_to_kareegar: "Manish" } },
                        { $unwind: "$manishIssue" },
                        { $unwind: "$manishIssue" },
                        {
                            $group: {
                                _id: null, 
                                manishIssue: {
                                    $sum: {
                                        $convert: {
                                            input: "$manishIssue",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    manishReceive: [
                        { $match: { issue_to_kareegar: "Manish" } },
                        { $unwind: "$manishReceive" },
                        { $unwind: "$manishReceive" },
                        {
                            $group: {
                                _id: null, 
                                manishReceive: {
                                    $sum: {
                                        $convert: {
                                            input: "$manishReceive",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    manishBhuka: [
                        { $match: { issue_to_kareegar: "Manish" } },
                        { $unwind: "$manishBhuka" },
                        { $unwind: "$manishBhuka" },
                        {
                            $group: {
                                _id: null, 
                                manishBhuka: {
                                    $sum: {
                                        $convert: {
                                            input: "$manishBhuka",
                                            to: "double", 
                                            onError: 0,
                                            onNull: 0
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    manishLoss: [
                        { $match: { issue_to_kareegar: "Manish" } },
                        {
                            $group: {
                                _id: null, 
                                manishLoss: {
                                    $sum: {
                                        $convert: {
                                            input: "$manishLoss",
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
    
        if (checkSolderChain !== 'undefined' && checkSolderChain !== "false") {
            query.solderChainIssue = { $exists: true, $not: { $size: 0 } };
            const VijayBookData = await VijayBook.aggregate([
            {
                $match: {
                ...query,
                solderChainIssue: { $exists: true, $ne: [] }
                }
            },
            {
                $addFields: {
                solderChainIssue: {
                    $map: {
                    input: { $range: [0, { $size: "$solderChainIssue" }] },
                    as: "idx",
                    in: {
                        value: { $arrayElemAt: ["$solderChainIssue", "$$idx"] },
                        index: "$$idx"
                    }
                    }
                }
                }
            },
            { $unwind: "$solderChainIssue" },
            {
                $addFields: {
                solderChainIssue: "$solderChainIssue.value",
                index: "$solderChainIssue.index"
                }
            },
            { $sort: { date: -1, createdAt: -1 } },
            { $skip: skip },
            { $limit: limit }
            ]);

            const totalCountResult = await VijayBook.aggregate([
            {
                $match: {
                ...query,
                solderChainIssue: { $exists: true, $ne: [] }
                }
            },
            { $unwind: "$solderChainIssue" },
            { $count: "total" }
            ]);

            const totalCount = totalCountResult[0]?.total || 0;
            
            const isEmpty = totalQty.length === 0 || (totalQty.length === 1 && Object.values(totalQty[0]).every(arr => Array.isArray(arr) && arr.length === 0));

            return {"count": totalCount, "totalQty": isEmpty ? defaultTotals: totalQty, "data": VijayBookData};

        };

        if (checkJointChain !== 'undefined' && checkJointChain !== "false") {
            query.solderChainReceive = { $exists: true, $not: { $size: 0 } };

            const VijayBookData = await VijayBook.aggregate([
            {
                $match: {
                ...query,
                solderChainReceive: { $exists: true, $ne: [] }
                }
            },
            {
                $addFields: {
                solderChainReceive: {
                        $filter: {
                        input: "$solderChainReceive",
                        as: "val",
                        cond: { $ne: ["$$val", "-1"] }
                        }
                }
                }
            },
            {
                $addFields: {
                solderChainReceive: {
                    $map: {
                    input: { $range: [0, { $size: "$solderChainReceive" }] },
                    as: "idx",
                    in: {
                        value: { $arrayElemAt: ["$solderChainReceive", "$$idx"] },
                        index: "$$idx"
                    }
                    }
                }
                }
            },
            { $unwind: "$solderChainReceive" },
            {
                $addFields: {
                solderChainReceive: "$solderChainReceive.value",
                index: "$solderChainReceive.index"
                }
            },
            { $sort: { date: -1, createdAt: -1 } },
            { $skip: skip },
            { $limit: limit }
            ]);

            const totalCountResult = await VijayBook.aggregate([
            {
                $match: {
                ...query,
                solderChainReceive: { $exists: true, $ne: [] }
                }
            },
            {
                $addFields: {
                solderChainReceive: {
                        $filter: {
                        input: "$solderChainReceive",
                        as: "val",
                        cond: { $ne: ["$$val", "-1"] }
                        }
                }
                }
            },
            { $unwind: "$solderChainReceive" },
            { $count: "total" }
            ]);

            const totalCount = totalCountResult[0]?.total || 0;
            
            const isEmpty = totalQty.length === 0 || (totalQty.length === 1 && Object.values(totalQty[0]).every(arr => Array.isArray(arr) && arr.length === 0));

            return {"count": totalCount, "totalQty": isEmpty ? defaultTotals: totalQty, "data": VijayBookData};

        };

        const isEmpty = totalQty.length === 0 || (totalQty.length === 1 && Object.values(totalQty[0]).every(arr => Array.isArray(arr) && arr.length === 0));

        return {"count": totalCount, "totalQty": isEmpty ? defaultTotals: totalQty, "data": VijayBookData};
        }

    const boolean = (state === "deleted");

    query.is_deleted_flag = boolean;

    // Fetch paginated records
    const VijayBookData = await VijayBook.find(query)
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalCount = await VijayBook.countDocuments(query);
    
    const totalQty = await VijayBook.aggregate([
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
                meltingBhuka: [
                    {
                        $group: {
                            _id: null, 
                            meltingBhuka: {
                                $sum: {
                                    $convert: {
                                        input: "$meltingBhuka",
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
                vijayTarpattaReceive: [
                    { $match: { issue_to_kareegar: "Vijay" } },
                    { $unwind: "$tarpattaReceive" },
                    { $unwind: "$tarpattaReceive" },
                    {
                        $group: {
                            _id: null, 
                            vijayTarpattaReceive: {
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
                vijayIssue: [
                    { $match: { issue_to_kareegar: "Vijay" } },
                    { $unwind: "$vijayIssue" },
                    { $unwind: "$vijayIssue" },
                    {
                        $group: {
                            _id: null, 
                            vijayIssue: {
                                $sum: {
                                    $convert: {
                                        input: "$vijayIssue",
                                        to: "double", 
                                        onError: 0,
                                        onNull: 0
                                    }
                                }
                            }
                        }
                    }
                ],
                vijayReceive: [
                    { $match: { issue_to_kareegar: "Vijay" } },
                    { $unwind: "$vijayReceive" },
                    { $unwind: "$vijayReceive" },
                    {
                        $group: {
                            _id: null, 
                            vijayReceive: {
                                $sum: {
                                    $convert: {
                                        input: "$vijayReceive",
                                        to: "double", 
                                        onError: 0,
                                        onNull: 0
                                    }
                                }
                            }
                        }
                    }
                ],
                vijayBhuka: [
                    { $match: { issue_to_kareegar: "Vijay" } },
                    { $unwind: "$vijayBhuka" },
                    { $unwind: "$vijayBhuka" },
                    {
                        $group: {
                            _id: null, 
                            vijayBhuka: {
                                $sum: {
                                    $convert: {
                                        input: "$vijayBhuka",
                                        to: "double", 
                                        onError: 0,
                                        onNull: 0
                                    }
                                }
                            }
                        }
                    }
                ],
                vijayLoss: [
                    { $match: { issue_to_kareegar: "Vijay" } },
                    {
                        $group: {
                            _id: null, 
                            vijayLoss: {
                                $sum: {
                                    $convert: {
                                        input: "$vijayLoss",
                                        to: "double", 
                                        onError: 0,
                                        onNull: 0
                                    }
                                }
                            }
                        }
                    }
                ],
                manishTarpattaReceive: [
                    { $match: { issue_to_kareegar: "Manish" } },
                    { $unwind: "$tarpattaReceive" },
                    { $unwind: "$tarpattaReceive" },
                    {
                        $group: {
                            _id: null, 
                            manishTarpattaReceive: {
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
                manishIssue: [
                    { $match: { issue_to_kareegar: "Manish" } },
                    { $unwind: "$manishIssue" },
                    { $unwind: "$manishIssue" },
                    {
                        $group: {
                            _id: null, 
                            manishIssue: {
                                $sum: {
                                    $convert: {
                                        input: "$manishIssue",
                                        to: "double", 
                                        onError: 0,
                                        onNull: 0
                                    }
                                }
                            }
                        }
                    }
                ],
                manishReceive: [
                    { $match: { issue_to_kareegar: "Manish" } },
                    { $unwind: "$manishReceive" },
                    { $unwind: "$manishReceive" },
                    {
                        $group: {
                            _id: null, 
                            manishReceive: {
                                $sum: {
                                    $convert: {
                                        input: "$manishReceive",
                                        to: "double", 
                                        onError: 0,
                                        onNull: 0
                                    }
                                }
                            }
                        }
                    }
                ],
                manishBhuka: [
                    { $match: { issue_to_kareegar: "Manish" } },
                    { $unwind: "$manishBhuka" },
                    { $unwind: "$manishBhuka" },
                    {
                        $group: {
                            _id: null, 
                            manishBhuka: {
                                $sum: {
                                    $convert: {
                                        input: "$manishBhuka",
                                        to: "double", 
                                        onError: 0,
                                        onNull: 0
                                    }
                                }
                            }
                        }
                    }
                ],
                manishLoss: [
                    { $match: { issue_to_kareegar: "Manish" } },
                    {
                        $group: {
                            _id: null, 
                            manishLoss: {
                                $sum: {
                                    $convert: {
                                        input: "$manishLoss",
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

    if (checkSolderChain !== 'undefined' && checkSolderChain !== "false") {
        query.solderChainIssue = { $exists: true, $not: { $size: 0 } };
        const VijayBookData = await VijayBook.aggregate([
        {
            $match: {
            ...query,
            solderChainIssue: { $exists: true, $ne: [] }
            }
        },
        {
            $addFields: {
            solderChainIssue: {
                $map: {
                input: { $range: [0, { $size: "$solderChainIssue" }] },
                as: "idx",
                in: {
                    value: { $arrayElemAt: ["$solderChainIssue", "$$idx"] },
                    index: "$$idx"
                }
                }
            }
            }
        },
        { $unwind: "$solderChainIssue" },
        {
            $addFields: {
            solderChainIssue: "$solderChainIssue.value",
            index: "$solderChainIssue.index"
            }
        },
        { $sort: { date: -1, createdAt: -1 } },
        { $skip: skip },
        { $limit: limit }
        ]);

        const totalCountResult = await VijayBook.aggregate([
        {
            $match: {
            ...query,
            solderChainIssue: { $exists: true, $ne: [] }
            }
        },
        { $unwind: "$solderChainIssue" },
        { $count: "total" }
        ]);

        const totalCount = totalCountResult[0]?.total || 0;
        
        const isEmpty = totalQty.length === 0 || (totalQty.length === 1 && Object.values(totalQty[0]).every(arr => Array.isArray(arr) && arr.length === 0));

        return {"count": totalCount, "totalQty": isEmpty ? defaultTotals: totalQty, "data": VijayBookData};

    };

    if (checkJointChain !== 'undefined' && checkJointChain !== "false") {
        query.solderChainReceive = { $exists: true, $not: { $size: 0 } };

        const VijayBookData = await VijayBook.aggregate([
        {
            $match: {
            ...query,
            solderChainReceive: { $exists: true, $ne: [] },
            }
        },
        {
            $addFields: {
            solderChainReceive: {
                    $filter: {
                    input: "$solderChainReceive",
                    as: "val",
                    cond: { $ne: ["$$val", "-1"] }
                    }
            }
            }
        },
        {
            $addFields: {
            solderChainReceive: {
                $map: {
                input: { $range: [0, { $size: "$solderChainReceive" }] },
                as: "idx",
                in: {
                    value: { $arrayElemAt: ["$solderChainReceive", "$$idx"] },
                    index: "$$idx"
                }
                }
            }
            }
        },
        { $unwind: "$solderChainReceive" },
        {
            $addFields: {
            solderChainReceive: "$solderChainReceive.value",
            index: "$solderChainReceive.index"
            }
        },
        { $sort: { date: -1, createdAt: -1 } },
        { $skip: skip },
        { $limit: limit }
        ]);

        const totalCountResult = await VijayBook.aggregate([
        {
            $match: {
            ...query,
            solderChainReceive: { $exists: true, $ne: [] }
            }
        },
        {
            $addFields: {
            solderChainReceive: {
                    $filter: {
                    input: "$solderChainReceive",
                    as: "val",
                    cond: { $ne: ["$$val", "-1"] }
                    }
            }
            }
        },
        { $unwind: "$solderChainReceive" },
        { $count: "total" }
        ]);

        const totalCount = totalCountResult[0]?.total || 0;
        
        const isEmpty = totalQty.length === 0 || (totalQty.length === 1 && Object.values(totalQty[0]).every(arr => Array.isArray(arr) && arr.length === 0));

        return {"count": totalCount, "totalQty": isEmpty ? defaultTotals: totalQty, "data": VijayBookData};

    };

    const isEmpty = totalQty.length === 0 || (totalQty.length === 1 && Object.values(totalQty[0]).every(arr => Array.isArray(arr) && arr.length === 0));

    return {"count": totalCount, "totalQty": isEmpty ? defaultTotals: totalQty, "data": VijayBookData};
 
});


const vijayBookMeltingDeleteSchema = {
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
fastify.post('/vijayBookMeltingDelete', vijayBookMeltingDeleteSchema, async (request, reply) => {
    const VijayBook = mongoose.model('vijay-book')
    //console.log(request.body);
    const vijayStockInfo = await VijayBook.updateMany({ _id: request.body._id }, {is_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});

const vijayBookTarpattaDeleteSchema = {
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
fastify.post('/vijayBookTarpattaDelete', vijayBookTarpattaDeleteSchema, async (request, reply) => {
    const VijayBook = mongoose.model('vijay-book')
    //console.log(request.body);
    const vijayStockInfo = await VijayBook.updateMany({ _id: request.body._id }, {is_tarpatta_deleted_flag: true}, { multi: true })
    // console.log(masterStockInfo);
    return {success: true, message: 'stock deleted'};
});


next();
}