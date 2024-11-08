const mongoose = require("mongoose");

module.exports = function (fastify, opts, next) {
  const Schema = mongoose.Schema;
  const { v4: uuidv4 } = require('uuid');

  const govindStockSchema = new mongoose.Schema(
    {
      _id: {type: String, default:  () => { let res = uuidv4(); return res.id}, alias: "govindBook_id" },

      meltingDate: {
        type: Date,
        required: true,
      },
      meltingCategory: {
        type: [String],
        required: true,
        enums: ["Gold", "Bhuka"],
      },
      meltingDescription: {
        type: String,
        required: true,
      },
      meltingWeight: {
        type: [String],
        required: true,
      },
      meltingPurity: {
        type: [String],
        required: false,
      },
      meltingConversion: {
        type: [String],
        required: false,
      },
      meltingIssue: {
        type: String,
        required: true,
      },
      meltingIssueActual: {
        type: String,
        required: true,
      },
      meltingReceive: {
        type: String,
        required: true,
      },
      meltingBhuka: {
        type: String,
        required: true,
      },
      meltingLoss: {
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
      is_melting_receiver_updated: {
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

  mongoose.model("govindcapmelting-book", govindStockSchema);
  next();
};
