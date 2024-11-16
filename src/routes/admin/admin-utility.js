const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const removeEmpty = require('../../utility/removeEmpty')

module.exports = function (fastify, _opts, next) {

// const addUtilitySchema = {
//     schema: {
//         description: 'Admin only: Add utility data',
//         tags: ['Admin'],
//         summary: 'todo',
//         security: [{apiKey: []}],
//     },
//     body: {
//         type: 'object',
//         additionalProperties: false,
//         properties: {
//             masterStockOpeningBalance: { type: 'string' },
//             masterStockClosingBalance: { type: 'string' },
//             meltingBookOpeningBalance: { type: 'string' },
//             meltingBookClosingBalance: { type: 'string' },
//         },
//     },
//     preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
// }

// fastify.post('/utilityData', addUtilitySchema, async (request, _reply) => {
//     // create the user
//     const UtilityBook = mongoose.model('utility');
//     const utilityId = uuidv4();
//     try {

//         const utilityBook_data = {
//             utilityBook_id: utilityId,
//             masterStockOpeningBalance: request.body.masterStockOpeningBalance,
//             masterStockClosingBalance: request.body.masterStockClosingBalance,
//             meltingBookOpeningBalance: request.body.meltingBookOpeningBalance,
//             meltingBookClosingBalance: request.body.meltingBookClosingBalance,
//             }

//         const cleaned_utilityBook_data = removeEmpty(utilityBook_data);

//         await UtilityBook.findOneAndUpdate(
//             {_id: utilityId},
//             cleaned_utilityBook_data,
//             {useFindAndModify: true, upsert: true, new: true}
//         );

//         const utilityBook = await UtilityBook.find({}).populate('user_id', ['_id', 'email'])
//         return utilityBook;
//     }
//     catch (e) {
//         console.log(e);
//     }
// })

const updatUtilitySchema = {
    schema: {
        description: 'Admin only: Modify utility data',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            masterStockOpeningBalance: { type: 'string' },
            masterStockClosingBalance: { type: 'string' },
            meltingBookOpeningBalance: { type: 'string' },
            meltingBookClosingBalance: { type: 'string' },
            meltingBookOpening995Balance: { type: 'string' },
            meltingBookClosing995Balance: { type: 'string' },
            meltingBookOpening100Balance: { type: 'string' },
            meltingBookClosing100Balance: { type: 'string' },
            polishChatkaLoss: { type: 'string' },
            polishLoss: { type: 'string' },
            polishFineLoss: { type: 'string' },
        },
    },
    preHandler: fastify.auth([fastify.jwtAuth, fastify.isAdmin], {relation: 'and'})
}

fastify.patch('/update/utility', updatUtilitySchema, async (request, _reply) => {
    // create the user
    const UtilityBook = mongoose.model('utility');
    try {
        if(!request.body._id){
            request.log.error(e.message)
        }

        let utilityBook_data = {}; // Initialize an empty object to store data

        if (request.body.masterStockOpeningBalance){
            utilityBook_data.masterStockOpeningBalance = request.body.masterStockOpeningBalance;
        }
        if (request.body.masterStockClosingBalance){
            utilityBook_data.masterStockClosingBalance = request.body.masterStockClosingBalance;
        }
        if (request.body.meltingBookOpeningBalance){
            utilityBook_data.meltingBookOpeningBalance = request.body.meltingBookOpeningBalance;
        }
        if (request.body.meltingBookClosingBalance){
            utilityBook_data.meltingBookClosingBalance = request.body.meltingBookClosingBalance;
        }

        if (request.body.meltingBookOpening995Balance){
            utilityBook_data.meltingBookOpening995Balance = request.body.meltingBookOpening995Balance;
        }
        if (request.body.meltingBookClosing995Balance){
            utilityBook_data.meltingBookClosing995Balance = request.body.meltingBookClosing995Balance;
        }
        if (request.body.meltingBookOpening100Balance){
            utilityBook_data.meltingBookOpening100Balance = request.body.meltingBookOpening100Balance;
        }
        if (request.body.meltingBookClosing100Balance){
            utilityBook_data.meltingBookClosing100Balance = request.body.meltingBookClosing100Balance;
        }
        if (request.body.polishChatkaLoss){
            utilityBook_data.polishChatkaLoss = request.body.polishChatkaLoss;
        }
        if (request.body.polishLoss){
            utilityBook_data.polishLoss = request.body.polishLoss;
        }
        if (request.body.polishFineLoss){
            utilityBook_data.polishLoss = request.body.polishLoss;
        }

        const cleaned_utilityBook_data = removeEmpty(utilityBook_data);

        await UtilityBook.findOneAndUpdate(
            {_id: request.body._id},
            cleaned_utilityBook_data,
            {useFindAndModify: true, upsert: true, new: true}
        );

        const utilityBook = await UtilityBook.find({}).populate('user_id', ['_id', 'email'])
        return utilityBook;
    }
    catch (e) {
        console.log(e);
    }
})

const utilityListSchema = {
    schema: {
        description: 'Admin only: Get Utility data',
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

fastify.get('/utility-list', utilityListSchema, async (request, reply) => {
    reply.type('application/json').code(200)
    const UtilityBook = mongoose.model('utility')
    const options = {
        page: parseInt(request.query.page) || 1,
        limit: parseInt(request.query.itemsPerPage) || 25
    }
    const utilityBooks = await UtilityBook.find({}, {}, options);
    return utilityBooks;

});


const utitlityDeleteSchema = {
    schema: {
        description: 'Admin only: soft delete the utility book and associated user account',
        tags: ['Admin'],
        summary: 'todo',
        security: [{apiKey: []}],
    },
    preHandler: fastify.auth([fastify.jwtAuth,fastify.isAdmin], {relation: 'and'})
}
fastify.post('/utilityDelete', utitlityDeleteSchema, async (request, reply) => {
    const UtilityBook = mongoose.model('utility');
    const utilityData = await UtilityBook.find({});
    const utilityStockInfo = await UtilityBook.updateMany({ _id: utilityData[0]["_id"] }, {visible: false}, { multi: true });
    // console.log(masterStockInfo);
    return {success: true, message: 'utility data deleted'};
});

next();
}