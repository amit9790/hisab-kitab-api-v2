const fastifyPlugin = require("fastify-plugin");
const mongoose = require('mongoose');

//check if the user is a provider or an admin
const guard = function (fastify, _, next) {
  fastify.decorate("guard", function (options) {
    return function (request, reply, done) {
      //   return reply.code(200).send({ message: options })
      //if the request does not have provier id reject it
      if (options.includes["OWNER"] && !request?.headers?.provider_id) {
        return reply
          .code(401)
          .send({ message: "Unauthorized: Missing provider ID" });
      }

      isSomeRolesPresent = options.some((role) =>
        request.user.roles.includes(role)
      );

      if (options.includes["OWNER"]) {
        mongoose.model("Provider").findOne(
          //query mongodb for the provider ID and check if the isdeleted flag is not set to ture
          { _id: request.headers.provider_id, is_deleted_flag: false },
          (error, provider) => {
            if (error) {
              return reply.code(500).send({ message: error.message });
            }
            //if failed to find the provider id
            if (!provider) {
              request.log.error(
                `Failed to find provider ${request.headers.provider_id}`
              );
              return reply.code(401).send({ message: "Unauthorized" });
            }

            //match the userID with the field provider ownerID to ensure they are both related
            if (
              isSomeRolesPresent ||
              request.user._id.equals(provider.user_id)
            ) {
              request.provider_id = provider._id;
              done();
            }
            //if the api request is for a specific provider but not from the owner
            else {
              request.log.error(`User is not owner of resource`);
              return reply.code(401).send({ message: "Unauthorized" });
            }
          }
        );
      }
      if (isSomeRolesPresent) {
        done();
      } else {
        if (!options.includes["OWNER"]) {
          request.log.error(`User is not owner of resource`);
          return reply.code(401).send({ message: "Unauthorized" });
        }
      }
    };
  });

  next();
};

module.exports = fastifyPlugin(guard, ">=0.13.1");
