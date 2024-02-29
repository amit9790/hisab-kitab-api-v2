const mongoose = require("mongoose");

module.exports = function (fastify, opts, next) {
  const Schema = mongoose.Schema;
  const { v4: uuidv4 } = require('uuid');

  const masterStockSchema = new mongoose.Schema(
    {
      _id: {type: String, default:  () => { let res = uuidv4(); return res.id}, alias: "masterStock_id" },

      type: {
        type: String,
        required: true,
        enums: ["issue", "receive"],
      },
      date: {
        type: Date,
        required: true,
      },
      category: {
        type: String,
        required: true,
        enums: ["Raw gold", "Chain", "Kada", "Para", "Jhumka"],
      },
      description: {
        type: String,
        required: false,
      },
      weight: {
        type: Number,
        required: true,
      },
      issuer: {
        // issuer/receiver name
        type: String,
        required: true,
      },
      receiver: {
        // issuer/receiver name
        type: String,
        required: true,
      },
      purity: {
        type: Number,
        required: false,
      },
      createdBy: {
        type: String,
        required: false,
      },
      modifiedBy: {
        type: String,
        required: false,
      },
      user_id: { type: Schema.Types.ObjectId, ref: "User" },
    },
    {
      timestamps: true,
    }
  );

  mongoose.model("master-stock", masterStockSchema);
  next();
};
