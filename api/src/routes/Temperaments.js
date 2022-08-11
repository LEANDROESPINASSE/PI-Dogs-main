const { Router } = require("express");
const { getAllTemperament } = require ("../Controllers/TemperamentController");

const router = Router();

//GET

router.get("/", getAllTemperament);

module.exports = router;