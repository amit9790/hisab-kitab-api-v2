const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars');
const forgotPasswordTemplateStr = fs.readFileSync(path.resolve(__dirname, '../templates/forgot-password.hbs')).toString('utf8')
const renderForgotPasswordTemplate = Handlebars.compile(forgotPasswordTemplateStr, { noEscape: true });
const mongoose = require('mongoose')


module.exports = function (fastify, opts, next) {
  const registerSchema = {
    schema: {
      description: 'Register a new User',
      tags: ['User'],
      summary: 'Register a new User',
      body: {
        type: 'object',
        required: ['username', 'email', 'password'],
        properties: {
          username: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string' },
            roles: { type: 'array', items: { type: 'string' } }
          }
        },
        409: {
          type: 'object',
          properties: {
            errorCode: { type: 'string' },
            errorMessage: { type: 'string' }
          }
        }
      }
    }
  }

  fastify.post('/register', registerSchema, async (req, reply) => {
    const User = mongoose.model('User')

    User.findOne({ username: req.body.username, email: req.body.email, isDeleted: false }, async (error, user) => {
      if (error) throw error

      if (user) {
        return reply.code(409).send({ errorCode: 409, errorMessage: 'Username already exists' })
      }

      const password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
      const newUser = new User(Object.assign(req.body, { password, roles: ['ROLE_USER'] }))
      const { _id, username, email, roles } = await newUser.save()

      reply.send({ _id, username, email, roles })
    })
  })

  const loginSchema = {
    schema: {
      description: 'Login User API',
      tags: ['User'],
      summary: 'Create a JWT for authenticate API calls',
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                username: { type: 'string' },
                email: { type: 'string' },
                roles: { type: 'array', items: { type: 'string' } }
              }
            }
          }
        },
        401: {
          type: 'object',
          properties: {
            errorCode: { type: 'string' },
            errorMessage: { type: 'string' }
          }
        }
      }
    }
  }

  fastify.post('/login', loginSchema, async (req, reply) => {
    const User = mongoose.model('User')
    console.log("testing")
    User.findOne({ username: req.body.username, isDeleted: false }, async (error, user) => {
      if (error) throw error

      if (!user) {
        return reply.code(409).send({ errorCode: 409, errorMessage: 'Login failed' })
      }

      if (await bcrypt.compare(req.body.password, user.password) === false) {
        return reply.code(409).send({ errorCode: 409, errorMessage: 'Login failed' })
      }
      console.log("testing1")

      const { _id, username, email, roles } = user

      const userObject = { _id, username, email, roles }

      jwt.sign(userObject, process.env.JWT_SECRET, (error, token) => {
        if (error) throw error

        reply.send({ token, user: userObject })
      })
    })
  })



  const forgotPasswordSchema = {
    schema: {
      description: 'Forgot password API',
      tags: ['User'],
      summary: 'Sends password reset link to users email (if account exists)',
      body: {
        type: 'object',
        required: ['email'],
        properties: {
          email: { type: 'string' },
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        },
      }
    }
  }

  fastify.post('/forgot-password', forgotPasswordSchema, async (req, reply) => {
    const User = mongoose.model('User')
    const userAccount = await User.findOne({ email: req.body.email, isDeleted: false });
    if (!!userAccount) {
      const jti = uuidv4();
      const userId = userAccount._id
      const token = jwt.sign({ jti, userId }, process.env.RESET_SECRET, { expiresIn: '1hr' });
      try {
        await fastify.mailer.sendMail({
          to: userAccount.email,
          subject: 'HisabKitab: Reset your password',
          html: renderForgotPasswordTemplate({
            name: userAccount.username,
            action_url: `${process.env.FRONTEND_URL}/#/update-password?token=${token}`
          })
        })
      } catch (e) {
        console.log(e.message)
        console.log(`Sending email to recepient: '${userAccount.email}' failed`)
      }
    }
    reply.send({ success: true, message: 'Reset link sent' })
  })

  const resetPasswordSchema = {
    schema: {
      description: 'Reset password API',
      tags: ['User'],
      summary: 'Updates the password for owner of resetToken',
      body: {
        type: 'object',
        required: ['resetToken', 'password'],
        properties: {
          resetToken: { type: 'string' },
          password: { type: 'string' },
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        },
      }
    }
  }
  fastify.post('/reset-password', resetPasswordSchema, async (req, reply) => {
    const UsedToken = mongoose.model('UsedToken')
    const User = mongoose.model('User')
    try {
      const { jti, userId } = jwt.verify(req.body.resetToken, process.env.RESET_SECRET);

      const usedToken = await UsedToken.findOne({ tokenJti: jti });
      if (!!usedToken) {
        throw Error('Token has already been used')
      }

      // blacklist this token
      const resetToken = new UsedToken({ tokenJti: jti, user: userId });
      await resetToken.save();

      // token is valid and not used, => update user password
      const password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
      // update password 
      await User.findOneAndUpdate(
        { _id: userId, isDeleted: false },
        { password },
        { useFindAndModify: true }
      );
      reply.send({ success: true, message: 'Updated successfully' })
    } catch (e) {
      console.log('Reset token is expired / invalid');
      reply.code(409).send({ success: false, message: 'Reset token is expired / invalid' })
    }
  })


  next()
}
