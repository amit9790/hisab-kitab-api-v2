// const mongoose = require("mongoose");

// const ENV = process.env;

// const MOGODB_CONFIG = {
//     "getConfig": function () {
//         let db_url = "";
//         if (ENV.DB_USER && ENV.DB_PASS) {
//             db_url = 'mongodb+srv://' + ENV.DB_USER + ':' + ENV.DB_PASS + '@' + ENV.MONGO_DB_ATLAS + '/' + ENV.DB_NAME;
//         } else {
//             db_url = 'mongodb://' + ENV.DB_URL + ":" + ENV.DB_PORT + "/" + ENV.DB_NAME;
//         }
//         console.log(db_url);
//         return db_url;
//     },

//     "getConnection": function () {
//         const MONGO_ENDPOINT = this.getConfig();
//         const connect = mongoose.connect("mongodb://localhost:27017/feedback", {
//             // useNewUrlParser: true,
//             // useUnifiedTopology: true,
//             useFindAndModify: false
//         });
//         connect.then((db) => {
//             console.log('Connected to MongoCloud');
//         }, (err) => {
//             console.error(err);
//         });
//     }

// };

// module.exports = MOGODB_CONFIG;