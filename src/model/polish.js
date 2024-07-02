const mongoose = require("mongoose");

module.exports = function (fastify, opts, next) {
  const Schema = mongoose.Schema;
  const { v4: uuidv4 } = require('uuid');

  const polishSchema = new mongoose.Schema(
    {
      _id: {type: String, default:  () => { let res = uuidv4(); return res.id}, alias: "polish_id" },

    //   type: {
    //     type: String,
    //     required: true,
    //     enums: ["issue", "receive"],
    //   },
      date: {
        type: Date,
        required: true,
      },
      goods: {
        type: String,
        required: false,
      },
      fine: {
        type: Number,
        required: false,
      },
      chatka: {
        type: Number,
        required: false,
      },
      issueWeight: {
        type: Number,
        required: false,
      },
      recvWeight: {
        type: Number,
        required: false,
      },
      lossWeight: {
        type: Number,
        required: false,
      },
      chill: {
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

  mongoose.model("polish", polishSchema);
  next();
};
