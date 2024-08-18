const mongoose = require("mongoose");

module.exports = function (fastify, opts, next) {
  const Schema = mongoose.Schema;
  const { v4: uuidv4 } = require('uuid');

  const kareegarBookSchema = new mongoose.Schema(
    {
      _id: {type: String, default:  () => { let res = uuidv4(); return res.id}, alias: "kareegarBook_id" },

      kareegar_id: {
        type: String,
        required: true,
        enums: ["issue", "receive"],
      },
      type: {
        type: String,
        required: true,
        enums: ["Issue", "Receive"],
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
      issue_wt: {
        type: String,
        required: false,
      },
      recv_wt: {
        type: String,
        required: false,
      },
      loss_wt: {
        type: String,
        required: false,  
      },
      beads_issue_wt: {
        type: String,
        required: false,
      },
      beads_recv_wt: {
        type: String,
        required: false,
      },
      issuer: {
        type: String,
        required: true,
      },
      receiver: {
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
        default: true,
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

  mongoose.model("kareegar-book", kareegarBookSchema);
  next();
};
