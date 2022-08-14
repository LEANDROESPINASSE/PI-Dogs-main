const { Temperament, Dog } = require("../db")

//----------------------- POST -----------------------------

const createDog = async (req, res) => {
    try {
        const { name, weightMax, weightMin, heightMax, heightMin, lifeSpanMax, lifeSpanMin, temperament, image, createdInDb } = req.body;
        
        if(!name || !weightMax || !weightMin || !heightMax  || !heightMin || !lifeSpanMax || !lifeSpanMin || !temperament) return res.status(404).json({message: "Missing data"}) 
        const newDog = await Dog.create({
            name,
            weightMax,
            weightMin,
            heightMax,
            heightMin,
            lifeSpanMax,
            lifeSpanMin,
            image,
            createdInDb
        })

        let temperamentDb = await Temperament.findAll({
            where: {
                name: temperament
            }
        })
        if(!temperament.length === 0) { 
        await newDog.addTemperament(temperamentDb)
        return res.status(200).send(newDog)
    } else {
        // return res.status(400).json({message: "Cant find the missing temperament"})
    }
    } catch(error) {
        console.log("Created dog Error", error)
        res.status(400).json({message: "Error creating a new dog", error: error})
    }
}

module.exports = {
    createDog
}