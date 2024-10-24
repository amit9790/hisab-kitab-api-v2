
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
    .register(require('fastify-multipart'), {addToBody: true}) //to upload files to the server
    .register(require('fastify-swagger'), {
        routePrefix: '/documentation',
        swagger: {
            info: {
                title: 'Hisab kitab',
                description: 'Hisab kitab application backend api',
                version: '1.0.0'
            },
        },
        exposeRoute: true //---------------------------------do we need this?
    }) 

    .register(require('./src/model/user'))
    .register(require('./src/model/master-stock'))
    .register(require('./src/model/melting-book'))
    .register(require('./src/model/govind/govind-melting-book'))
    .register(require('./src/model/govind/govind-tar-patta'))
    .register(require('./src/model/govind/govind-machine-account'))
    .register(require('./src/model/govind/govind-dai-bhuka'))
    .register(require('./src/model/govind/govind-dai-account'))
    .register(require('./src/model/vijay-book'))
    // .register(require('./src/model/vijay/vijay-melting-book'))
    .register(require('./src/model/kareegar'))
    .register(require('./src/model/kareegar-book'))
    .register(require('./src/model/polish'))
    .register(require('./src/model/loss'))
    .register(require('./src/model/utility'))

    .register(require('./src/auth/jwt-auth'))
    .register(require('./src/auth/is-admin'))
    .register(require('./src/auth/is-owner-or-admin'))
    .register(require('./src/routes/userRoutes'), {prefix: '/users'})
    .register(require('./src/routes/versionRoute'))
    .register(require('./src/routes/admin/admin-masterStock'), {prefix: '/admin'})
    .register(require('./src/routes/admin/admin-meltingBook'), {prefix: '/admin'})
    .register(require('./src/routes/admin/govind/admin-govindMeltingBook'), {prefix: '/admin'})
    .register(require('./src/routes/admin/govind/admin-govindTarPatta'), {prefix: '/admin'})
    .register(require('./src/routes/admin/govind/admin-govindDaiBhuka'), {prefix: '/admin'})
    .register(require('./src/routes/admin/govind/admin-govindDaiAccount'), {prefix: '/admin'})
    .register(require('./src/routes/admin/admin-vijayBook'), {prefix: '/admin'})
    // .register(require('./src/routes/admin/vijay/admin-vijayMeltingBook'), {prefix: '/admin'})
    .register(require('./src/routes/admin/admin-kareegar'), {prefix: '/admin'})
    .register(require('./src/routes/admin/admin-utility'), {prefix: '/admin'})
    .register(require('./src/routes/admin/admin-kareegarBook'), {prefix: '/admin'})
    .register(require('./src/routes/admin/admin-loss'), {prefix: '/admin'})
    .register(require('./src/routes/admin/admin-polish'), {prefix: '/admin'})
    .register(require('./src/routes/normal_user/master-stock.routes'))
    .register(require('./src/routes/normal_user/melting-book.routes'))

fastify.listen(process.env.PORT || 3000, '0.0.0.0')
