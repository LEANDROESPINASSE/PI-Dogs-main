const axios = require("axios");
const { Dog, Temperament } = require("../db.js");
const { API_KEY } = process.env

//--------------------------- GET -----------------------------

const getApiDogs = async () => {

    try {
        const apiRequest = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

            let apiInfo = apiRequest.data.map(element => {

                function weightAux() {
                    if(element.weight.metric ==="NaN"){
                        return "20 - 35"
                    }else if(element.weight.metric.includes("NaN")){
                    let spliter=  element.weight.metric.split("-")
                    if(spliter[0]="NaN"){
                        return spliter[1]
                    }else if(spliter[1]="NaN"){
                        return spliter[0]
                    }
                    }else{
                        return element.weight.metric
                    }
                }
                
                return {
                id: element.id,
                name: element.name,
                weight: weightAux(),
                height: element.height.metric,
                lifeSpan: element.life_span,
                temperament: element.temperament? element.temperament : "Dog without temperament",
                image: element.image.url? element.image.url : "https://st2.depositphotos.com/1229718/8159/i/950/depositphotos_81597492-stock-photo-404-error.jpg"
                }
            })
                        return apiInfo;
    } catch(error) {
        console.log("getApiDogs Error", error)
    }
}

// try{
//     const apiRequest = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

//         let apiInfo = apiRequest.data.map(element => {
//         return {
//             id: element.id,
//             name: element.name,
//             weight: element.weight.metric,
//             height: element.height.metric,
//             lifeSpan: element.life_span,
//             temperament: element.temperament,
//             image: element.image.url,
//         }
//     })
//         return apiInfo;

//     }catch(error) {
//         console.log("getApiDogs Error", error)
//     }
// }

const getDbDogs = async () => {

try {
    let dogs = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: [ "name"],
            through: {
                attributes: [],
            }
        }
    })
        return dogs

    } catch(error) {
        console.log("getDbDogs Error", error)
    }
}

const allInfo = async (req, res) => {

    try {
        const { name } = req.query;

        const apiData = await getApiDogs();
        const dbData = await getDbDogs();
        const allData = apiData.concat(dbData);


        //--------------------------- GET/NAME -----------------------------


        if(name) {
                let dogsName = allData.filter(puppy => puppy.name.toLowerCase().includes(name.toLowerCase()))
                console.log(allData)
            if(dogsName.length > 0) {
                return res.status(200).json(dogsName)
            } else {
                return res.status(400).json({message: "No dogs found whit this " + name})
            }
        }
        return res.json(allData)

    } catch(error) {
        console.log("allInfo Error", error)
    }
}

module.exports = {
    getApiDogs,
    allInfo
}