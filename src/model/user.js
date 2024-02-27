const mongoose = require('mongoose')

module.exports = function (fastify, opts, next) {
  const Schema = mongoose.Schema

  const User = new Schema({
    username: String,
    company: String,
    email: String,
    roles: [String],
    password: String,
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    created: { type: Date, default: Date.now }
  })

  fastify.mongo.db.model('User', User)

  const UsedToken = new Schema({
    tokenJti: String,
    user: Schema.Types.ObjectId,
    createdAt: {
      type: Date,
      expires: '2hr', // this needs to be greater than the value of ResetTokenExpiry
      default: Date.now
    }
  });
  fastify.mongo.db.model('UsedToken', UsedToken);

  next()
}
