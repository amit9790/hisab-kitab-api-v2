const jwt = require('jsonwebtoken')
const fastifyPlugin = require('fastify-plugin')

const jwtAuth = function (fastify, _opts, next) {
    fastify.decorate('jwtAuth', function (request, reply, done) {
        //check for the authorization(bearer) header in the request
        if (!request.headers.authorization) {
            return reply.code(401).send({message: ' Unauthorized'})
        }
        //encoded based on the secret, uses HMAC
        jwt.verify(request.headers.authorization.replace('Bearer', '').trim(),
            process.env.JWT_SECRET,
            (err, decoded) => {
                if (err || !decoded.username) {
                    return reply.code(401).send({message: 'Unauthorized'})
                }
                //find the user based on the decoded info
                fastify.mongo.db.model('User').findOne(
                    {username: decoded.username},
                    (error, user) => {
                        if (error) {
                            return reply.code(500).send({message: error.message})
                        }

                        if (!user) {
                            return reply.code(401).send({message: 'Unauthorized'})
                        }
                        //special case for admin user as we need to display the send email to only admin
                        let isAdminUser = false;
                        if (user.roles && user.roles.includes('ROLE_ADMIN')) {
                            isAdminUser = true;
                        }
                        request.user = user
                        request.isAdminUser = isAdminUser

                        done()
                    })
            })
    })

    next()
}

module.exports = fastifyPlugin(jwtAuth, '>=0.13.1')
