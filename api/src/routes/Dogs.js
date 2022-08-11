const { Router } = require("express");
const { allInfo } = require ("../Controllers/DogsController");
const { getIdDogs } = require ("../Controllers/DogsIdController");
const { createDog } = require ("../Controllers/DogCreateController");


const router = Router();

//GET 

router.get("/", allInfo);
router.get("/:id", getIdDogs);

//POST

router.post("/create", createDog);

module.exports = router;