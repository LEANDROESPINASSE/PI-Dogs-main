const { getApiDogs } = require("./DogsController.js")
const { Dog, Temperament } = require("../db")

// --------------------------- GET/ID -----------------------------

const getIdDogs = async (req, res) => {

try {
    
    const { id } = req.params

    if(id.includes("-")) {

        const idDb = await Dog.findOne({
            where : {
                id: id
            },
            include: Temperament 
        })

        if(idDb) {
            return res.json(idDb)
        } else {
            return res.status(404).json({message: "Id dog not found"})
        }
    }

    let idInfo = await getApiDogs();

    let infoFilter = idInfo.find(element => element.id.toString() === id)
        if(infoFilter) {
            return res.status(200).json(infoFilter)
        } else {
            return res.status(404).json({message: "Dog not found"})
        }
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    getIdDogs
}