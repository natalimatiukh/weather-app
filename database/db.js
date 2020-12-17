const mongoose = require("mongoose");
const {db} = require("./../configuration");

function createConnection() {
    mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
    return mongoose.connection;
}

module.exports = createConnection();