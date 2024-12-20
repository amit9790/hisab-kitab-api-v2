const mongoose = require("mongoose");

module.exports = function (fastify, opts, next) {
  const Schema = mongoose.Schema;
  const { v4: uuidv4 } = require('uuid');

  const govindStockSchema = new mongoose.Schema(
    {
      _id: {type: String, default:  () => { let res = uuidv4(); return res.id}, alias: "govindBook_id" },
      capAcctDate: {
        type: Date,
        required: true,
      },
      capAcctType: {
        type: String,
        required: false,
      },
      capAcctDescription: {
        type: String,
        required: false,
      },
      capAcctIssue: {
        type: String,
        required: true,
      },
      capAcctReceive: {
        type: String,
        required: true,
      },
      capAcctLoss: {
        type: String,
        required: true,
      },
      createdBy: {
        type: String,
        required: false,
      },
      modifiedBy: {
        type: String,
        required: false,
      },
      is_receiver_updated: {
        type: Boolean,
        required: true,
        default: false,
      },
      is_deleted_flag: {
        type: Boolean,
        required: true,
        default: false,
      },
      user_id: { type: Schema.Types.ObjectId, ref: "User" },
    },
    {
      timestamps: true,
    }
  );

  mongoose.model("govindcap-book", govindStockSchema);
  next();
};
