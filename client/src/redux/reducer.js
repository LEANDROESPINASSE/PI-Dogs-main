const initialState = {
    loading: false,
    dogs: [],
    allDogs: [],
    AllTemperaments: [],
    dogDetail: []
}

function rootReducer(state = initialState, action) {

    switch(action.type) {

        case "LOADING":
            return {
                ...state,
                loading: action.payload
            }

        case "GET_ALL_DOGS":
            return {
                ...state,
                dogs: [...action.payload],
                allDogs: [...action.payload],
            }
        
        case "GET_DOGS_TEMPERAMENT":
            return {
                ...state,
                allTemperaments: action.payload,
            }

        case "GET_TEMPERAMENT_FILTERED":

            const filterTemp = state.allDogs.filter(dog => {
                if (!dog.temperaments) return undefined;
                return dog.temperaments.includes(action.payload)
            })
            return {
                ...state,
                dogs: filterTemp
            }

        // const newDog = state.allDogs.filter(e => e.temperaments);
        // const newDogFiltered = newDog.filter(e => {

        //     if(typeof (e.temperaments) === "string") {
        //         return e.temperaments.includes(action.payload);
        //     }

        //     if(Array.isArray(e.temperaments)) {
        //         const temperamentDb = e.temperaments.map(e => e.name)
        //         return temperamentDb.includes(action.payload)
        //     }

        //     return ("Temperament not found")
        // })
    
        // return {
        //     ...state,
        //     dogs: action.payload === "all" ? newDog : newDogFiltered,
        // }

        case "GET_ABC_ORDERED":

            let abc = state.allDogs.sort(function(a, b){
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            });
            return {
                ...state,
                dogs: abc
            }
        case "GET_CBA_ORDERED":
            
            let cba = state.allDogs.sort(function(a, b){
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            });
            return {
                ...state,
                dogs: cba
            };

        // case "GET_WEIGHT_ORDERED":

        //     const weightOrder = state.allDogs.filter(el => el.weightMax)
        //     const orderedWeight = action.payload === "asc" ?
        //     weightOrder.sort(function(a,b) {

        //         return (a.weightMax) - (b.weightMax)
        //     }) :
        //     weightOrder.sort(function(a,b) {

        //         return (b.weightOrder) - (b.weightOrder)
        //     })
        //     return {
        //         ...state,
        //         dogs: orderedWeight
        //     }

        case "GET_WEIGHTMIN_ORDERED":
            
            let resultsMin = state.allDogs.sort((a,b) => parseInt(a.weight.split(" - ")[0]) - parseInt(b.weight.split(" - ")[0]))
            let resultmin1 = resultsMin.sort((a,b)=> {
                if (parseInt(a.weight.split(" - ")[0]) === parseInt(b.weight.split(" - ")[0])) {

                    return parseInt(a.weight.split(" - ")[1]) - parseInt(b.weight.split(" - ")[1])
                } else return 0;
            } )

                return {
                    ...state,
                    races: resultmin1 
                }
            case "GET_WEIGHTMAX_ORDERED":

                let resultsMax = state.allDogs.sort((a,b) => parseInt(b.weight.split(" - ")[0]) - parseInt(a.weight.split(" - ")[0]))
                let resultMax1 = resultsMax.sort((a,b)=> {
                if (parseInt(b.weight.split(" - ")[0]) === parseInt(a.weight.split(" - ")[0])) {
                    console.log (resultMax1)
                    return parseInt(b.weight.split(" - ")[1]) - parseInt(a.weight.split(" - ")[1])
                } else return 0;
            } )

                return {
                    ...state,
                    dogs: resultMax1
                };

            case "GET_ORDER_BY_CREATION":
                const creationOrder = action.payload === "Created" ? state.allDogs.filter(e => e.createdInDb) : state.allDogs.filter(el => !el.createdInDb)
                    return {
                        ...state,
                        dogs: creationOrder
                    }

        case "GET_DOGS_BY_NAME":
            return {
                ...state,
                dogs: action.payload
            }

        case "GET_DOG_DETAIL":
            console.log(action.payload, "action.payload")
            return {
                ...state,
                dogDetail: action.payload
            }

        case "CREATE_DOG":
            return {
                ...state,
            }

        case "DELETE_DOG":
            return {
                ...state,
            }
        default: 
        return state
    }
}

export default rootReducer;




