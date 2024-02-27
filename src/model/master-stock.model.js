const mongoose = require('mongoose');

const masterStockSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enums: ["issue", "receive"]
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        enums: ["Raw gold", "Chain", "Kada", "Para", "Jhumka"]
    },
    description: {
        type: String,
        required: false
    },
    weight: {
        type: Number,
        required: true
    },
    issuer: { // issuer/receiver name
        type: String,
        required: true
    },
    receiver: { // issuer/receiver name
        type: String,
        required: true
    },
    purity: {
        type: Number,
        required: false
    },
    createdBy: {
        type: String,
        required: false
    },
    modifiedBy: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const masterStockModel = mongoose.model('master-stock', masterStockSchema);
module.exports = masterStockModel;