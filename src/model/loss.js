const mongoose = require("mongoose");

module.exports = function (fastify, opts, next) {
  const Schema = mongoose.Schema;
  const { v4: uuidv4 } = require('uuid');

  const lossSchema = new mongoose.Schema(
    {
      _id: {type: String, default:  () => { let res = uuidv4(); return res.id}, alias: "loss_id" },

      date: {
        type: Date,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
        enums: ["Melting", "Kareegar", "Polish"],
      },
      transactionId: {
        type: String,
        required: true,
      },
      lossWt: {
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

  mongoose.model("loss", lossSchema);
  next();
};
