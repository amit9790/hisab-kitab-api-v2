const fastifyPlugin = require('fastify-plugin')

//check if the request is from admin
const isAdmin = function (fastify, _opts, next) {
    fastify.decorate('isAdmin', function (request, reply, done) {
        //is it a user?
        if (!request.user) {
            return reply.code(401).send({message: 'Unauthorized'});
        }
        //does the user have a role parameter in the request
        if (!request.user.roles) {
            return reply.code(401).send({message: 'Roles missing'});
        }
        //is the role admin?
        if (!request.user.roles.includes('ROLE_ADMIN')) {
            request.log.warn(`User is not admin`)
            return reply.code(401).send({message: 'Unauthorized'})
        }
        done();
    })
    next()
}

module.exports = fastifyPlugin(isAdmin, '>=0.13.1')
