const mongoose = require("mongoose");

const City = mongoose.model('City', new mongoose.Schema({
    name_en: String,
    name_ua: String
}));
module.exports.City = City;