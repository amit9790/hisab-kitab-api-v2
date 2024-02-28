// const bodyParser = require('body-parser');
// // const MONGODB = require('../database/mongodb.config');
// const apiRoutes = require('./src/routes/api.routes');
// const authRoutes = require('./src/auth/auth.routes');
require('dotenv').config();

function ajvPlugin(ajv, _options) {
    ajv.addKeyword('isFileType', {
        compile: (_schema, parent, _it) => {
            // Change the schema type, as this is post validation it doesn't appear to error.
            parent.type = 'file'
            delete parent.isFileType
            return () => true
        },
    })

    return ajv
}
//Configure the Ajv instance used by Fastify
const fastify = require('fastify')({
    logger: true, // for default logging to STDOUT
    // logger: { level:'info', file: '/tmp/log.txt'}, 
    // this is for logging to file
    disableRequestLogging: true, // this is to disable individual requests from being logged
    ajv: {
        customOptions: {
            useDefaults: true,
            coerceTypes: 'array',
            $data: true,
            extendRefs: true,
            removeAdditional: true
        },
        plugins: [
            ajvPlugin
        ]
    }
});

const mongoose = require('mongoose');
try {
    mongoose.connect(process.env.CONNECT_DB);
  } catch (e) {
    console.error(e);
  }

fastify
    .register(require('fastify-cors'), {origin: true}) //allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served
    .register(require('fastify-auth'))
    // .register(require('fastify-multipart'), {addToBody: true}) //to upload files to the server
    .register(require('fastify-swagger'), {
        routePrefix: '/documentation',
        swagger: {
            info: {
                title: 'MazingDay - Provider',
                description: 'Provider application backend api',
                version: '1.0.0'
            },
        },
        exposeRoute: true //---------------------------------do we need this?
    })
    // get the mongodb uri from the env variables and throw an error if it doesn't work
    // .register(require('fastify-mongoose'), {uri: process.env.CONNECT_DB}, err => {
    //     if (err) throw err
    // })
    

    .register(require('./src/model/user'))
    .register(require('./src/auth/jwt-auth'))
    .register(require('./src/auth/is-admin'))
    .register(require('./src/auth/is-owner-or-admin'))
    .register(require('./src/routes/userRoutes'), {prefix: '/users'})
    .register(require('./src/routes/versionRoute'))


fastify.listen(process.env.SERVER_PORT || 3000, '0.0.0.0')
