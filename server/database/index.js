const DB = {};
const Mongo = {};
require("./no-db")(DB);
require('./mongo-db')(Mongo);
module.exports = { DB, Mongo }; 