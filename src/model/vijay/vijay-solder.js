const mongoose = require("mongoose");

module.exports = function (fastify, opts, next) {
  const Schema = mongoose.Schema;
  const { v4: uuidv4 } = require('uuid');

  const vijaySolderStockSchema = new mongoose.Schema(
    {
      _id: {type: String, default:  () => { let res = uuidv4(); return res.id}, alias: "vijaySolderBook_id" },

      date: {
        type: Date,
        required: true,
      },
      goods: {
        type: String,
        required: true,
      },
      tarpattaIssue: {
        type: String,
        required: true,
      },
      tarpattaReceive: {
        type: String,
        required: true,
      },
      tarpattaBhuka: {
        type: String,
        required: true,
      },
      tarpattaLoss: {
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

  mongoose.model("vijay-solder-book", vijayTarPattaStockSchema);
  next();
};
