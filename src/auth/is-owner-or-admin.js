const fastifyPlugin = require('fastify-plugin')

//check if the user is a provider or an admin
const isOwnerOrAdmin = function (fastify, _opts, next) {
    fastify.decorate('isOwnerOrAdmin', function (request, reply, done) {
        //if the request does not have provier id reject it
        if (!request.headers.provider_id) {
            return reply.code(401).send({ message: 'Unauthorized: Missing provider ID' })
        }
        fastify.mongo.db.model('Provider')
            .findOne(
                //query mongodb for the provider ID and check if the isdeleted flag is not set to ture
                { _id: request.headers.provider_id, is_deleted_flag: false },
                (error, provider) => {
                    if (error) {
                        return reply.code(500).send({ message: error.message })
                    }
                    //if failed to find the provider id
                    if (!provider) {
                        request.log.error(`Failed to find provider ${request.headers.provider_id}`)
                        return reply.code(401).send({ message: 'Unauthorized' })
                    }
                    //match the userID with the field provider ownerID to ensure they are both related
                    if (request.user._id.equals(provider.user_id) || request.isAdminUser) {
                        request.provider_id = provider._id;
                        done();
                    }
                    //if the api request is for a specific provider but not from the owner 
                    else {
                        request.log.error(`User is not owner of resource`)
                        return reply.code(401).send({ message: 'Unauthorized' })
                    }
                })
    })

    next()
}

module.exports = fastifyPlugin(isOwnerOrAdmin, '>=0.13.1')