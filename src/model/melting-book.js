const mongoose = require("mongoose");

module.exports = function (fastify, opts, next) {
  const Schema = mongoose.Schema;
  const { v4: uuidv4 } = require('uuid');

  const meltingStockSchema = new mongoose.Schema(
    {
      _id: {type: String, default:  () => { let res = uuidv4(); return res.id}, alias: "meltingBook_id" },

      date: {
        type: Date,
        required: true,
      },
      category: {
        type: String,
        required: true,
        enums: ["Gold", "Bhuka"],
      },
      description: {
        type: String,
        required: true,
        enums: ["issue", "receive"],
      },
      weight24k: {
        type: [String],
        required: true,
        enums: ["Raw gold", "Chain", "Kada", "Para", "Jhumka"],
      },
      purity: {
        type: [String],
        required: false,
      },
      conversion: {
        type: [String],
        required: false,
      },
      issue22k: {
        type: String,
        required: true,
      },
      issue22kActual: {
        type: String,
        required: true,
      },
      receive22k: {
        type: String,
        required: true,
      },
      loss22k: {
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

  mongoose.model("melting-book", meltingStockSchema);
  next();
};
