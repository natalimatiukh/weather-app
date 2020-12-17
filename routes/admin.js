const express = require("express");
const {City} = require("../public/src/models/city");
const router = express.Router();

router.get("/admin", async (req, res) => {
    res.render("admin.jade",  { title: 'Admin' });
});

router.get("/admincities", async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).send({cities});
    } catch(error) {
        res.status(401).send(error.message);
    }
});

router.get("/admincities/:id", async (req, res) => {
    try{
        let city = await City.findById(req.params.id);
        res.status(200).send(city);
    } catch(error) {
        res.send(error.message);
    }
});
router.post("/admin", async (req, res) => {
    try {
        let id = req.body.id;
        if (id == 0) {
            const city = new City({name_en: req.body.cityName, name_ua: req.body.cityNameUA});
            console.log(city);
            await city.save();
            res.status(201).send(city);
        } else {
            const city = await City.findById(id);
            if (!city) {
                return res.status(404).send();
            }
            if (req.body.cityName) {
                city.name_en = req.body.cityName;
            }
            if (req.body.cityNameUA) {
                city.name_ua = req.body.cityNameUA;
            }
            await city.save();
            res.status(200).send(city).render("admin.jade");
        }
    } catch (error) {

        res.status(401).send(error.message);
    }
});
router.post("/admincities", async (req, res) => {
    try {
        let id = req.body.id;
        if (id == 0) {
            const city = new City({name_en: req.body.cityName, name_ua: req.body.cityNameUA});
            console.log(city);
            await city.save();
            res.status(201).send(city);
        } else {
            const city = await City.findById(id);
            if (!city) {
                return res.status(404).send();
            }
            if (req.body.cityName) {
                city.name_en = req.body.cityName;
            }
            if (req.body.cityNameUA) {
                city.name_ua = req.body.cityNameUA;
            }
            await city.save();
            res.status(200).send(city).render("admin.jade");
        }
    } catch (error) {

        res.status(401).send(error.message);
    }
});

router.delete('/admincities/:id', async (req, res) => {
    try {
        const city = await City.findByIdAndDelete(req.params.id);
        if (!city) {
            return res.status(404).send();
        }
        res.status(200).send(city);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = router;