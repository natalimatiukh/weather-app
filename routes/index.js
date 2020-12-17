const express = require("express");
const {City} = require("../public/src/models/city");
const router = express.Router();
const fetch = require('node-fetch');

// router.get("/", async (req, res) => {
//     res.render("index.jade",  { title: 'Admin' });
// });
router.get('/', async function (req, res) {
    const cities = await City.find();
    var city = req.query.city;

    var appId = 'b5018676b6c9e7d01aa7056fd2b9186d';
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`;
    var result = await fetch(url);
    var weather = await result.json();
    res.render('weather.hbs', {city, weather, cities})
});

module.exports = router;