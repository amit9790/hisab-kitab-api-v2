const mongoose = require("mongoose");

module.exports = function (fastify, opts, next) {
  const Schema = mongoose.Schema;
  const { v4: uuidv4 } = require('uuid');

  const govindTarPattaSchema = new mongoose.Schema(
    {
      _id: {type: String, default:  () => { let res = uuidv4(); return res.id}, alias: "govindTarPatta_id" },

      date: {
        type: Date,
        required: true,
      },
      goods: {
        type: String,
        required: true,
      },
      meltingWt: {
        type: String,
        required: true,
      },
      meltingId:{
        type: String,
        required: true,
      },
      weights: {
        type: [String],
        required: true,
      },
      issue: {
        type: String,
        required: true,
      },
      receive: {
        type: String,
        required: true,
      },
      loss: {
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

  mongoose.model("govind-tar-patta", govindTarPattaSchema);
  next();
};
