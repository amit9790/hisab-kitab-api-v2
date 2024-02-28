module.exports = function (fastify, opts, next) {
    // Declare route
    fastify.get(
      "/",
      {
        schema: {
          summary: "API Version",
          tags: ["General"],
          description: "Returns the current API version",
        },
      },
      async (request, reply) => {
        return {
          name: "hisab kitab",
          version: "default", // FIXME: read from version file
        };
      }
    );
  
    next();
  };