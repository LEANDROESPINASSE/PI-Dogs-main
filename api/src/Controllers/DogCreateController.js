const { Temperament, Dog } = require("../db")

//----------------------- POST -----------------------------

const createDog = async (req, res) => {
    try {
        const { name, weightMax, weightMin, height, lifeSpan, temperament, image, createdInDb } = req.body;

        if(!name || !weightMax || !weightMin || !height || !lifeSpan || !temperament) return res.status(404).json({message: "Missing data"}) 
        const newDog = await Dog.create({
            name,
            weight: `${weightMin.trim()} - ${weightMax.trim()}`,
            height,
            image,
            lifeSpan
        })

        let temperamentDb = await Temperament.findAll({
            where: {
                name: temperament
            }
        })

        await newDog.addTemperament(temperamentDb)
        return res.status(200).send(newDog)

    } catch(error) {
        console.log("Created dog Error", error)
        res.status(400).json({message: "Error creating a new dog", error: error})
    }
}

module.exports = {
    createDog
}