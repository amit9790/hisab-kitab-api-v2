const mongoose = require("mongoose");

module.exports = function (fastify, opts, next) {
  const Schema = mongoose.Schema;
  const { v4: uuidv4 } = require('uuid');

  const utilitySchema = new mongoose.Schema(
    {
      _id: {type: String, default:  () => { let res = uuidv4(); return res.id}, alias: "utility_id" },

      masterStockOpeningBalance: {
        type: String,
        required: false,
      },
      masterStockClosingBalance: {
        type: String,
        required: false,
      },
      meltingBookOpeningBalance: {
        type: String,
        required: false,
      },
      meltingBookClosingBalance: {
        type: String,
        required: false,
      },
      meltingBookOpening995Balance: {
        type: String,
        required: false,
      },
      meltingBookClosing995Balance: {
        type: String,
        required: false,
      },
      meltingBookOpening100Balance: {
        type: String,
        required: false,
      },
      meltingBookClosing100Balance: {
        type: String,
        required: false,
      },
      visible: {
        type: Boolean,
        required: true,
        default: true,
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

  mongoose.model("utility", utilitySchema);
  next();
};