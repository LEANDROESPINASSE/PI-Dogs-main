const { Temperament }  = require("../db")
const { getApiDogs } = require("./DogsController")

//--------------------------- GET -----------------------------

const getAllTemperament = async (req, res) => {


    try {
        
        const apiTemperaments = await getApiDogs();
        
        let temperamentapi = apiTemperaments.map(
            (element) => element.temperament?.split(",")).flat() // element.temperament)
            

        temperamentapi.forEach( async (temp) => {
            if(!temp) return 
            const [ createdTemp, isCreated ] = await Temperament.findOrCreate({
                where: {
                    name: temp
                },
                defaults: {
                    name: temp
                }
            })
            console.log(isCreated)
        })

        const temperamentsDb = await Temperament.findAll()

        return res.status(200).json(temperamentsDb)

    } catch(error) {
        console.log("getAllTemperament Error", error)
    }
}

module.exports = {
    getAllTemperament
}