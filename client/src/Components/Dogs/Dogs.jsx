import React from "react";
import "./Dogs.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllDogs, deleteDog } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
//import defaultImage from "./Style/defaultDog.jpg";
import Pagination from "../Pagination/Pagination";
import Dog from "../Dog/Dog"

// function dogTemperament(temperaments) {
//   if (typeof temperaments === "string") {
//     return temperaments;
//   }
//   if (Array.isArray(temperaments)) {
//     let temps = temperaments.map((e) => e.name);
//     return temps.join(", ");
//   }
// }

export default function Dogs() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();

  //const loading = useSelector((state) => state.loading);
  const cardState = useSelector((state) => state.allDogs);


  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const[dogsPerPage, setCardsPerPag ] = useState (10);
  const indexOfLastCards = currentPage * dogsPerPage;
  const indexOfFirstCards = indexOfLastCards - dogsPerPage;
  const currentDetails = cardState.slice(indexOfFirstCards,indexOfLastCards)
  
  const page = (pagNumber) => {
    setCurrentPage(pagNumber)
}
  
useEffect(() => {
  dispatch(getAllDogs());
}, [dispatch]);

function handleDelete(element) {
  if (id.lenght > 5) {
    element.preventDefault();
    dispatch(deleteDog(id));
    alert("Dog deleted");
    navigate("/home");
  } else {
    alert("You can delete only your Dogs");
  }
}  

  return (
    <div>
        <div id="detailCard">          
          <div className="detailOrder">
            {currentDetails.map( (dogs) => {
                  return (
                      <div key={dogs.id} >
                          <Link to={"/dogs/" + dogs.id} className="detail">
                              <Dog 
                                name={dogs.name} 
                                image={dogs.image} 
                                temperament={dogs.temperament} 
                                id={dogs.id}
                                weight={dogs.weight} /> 
                                  <Link to="/home">
                                      <button className="detailButton"
                                        onClick={(e) => handleDelete(e)}>
                                          Delete
                                      </button>
                                  </Link>
                          </Link>
                      </div>
                  )}               
              )}           
            </div>
          <div className="paginaterOrder">
          <Pagination  dogsPerPage={dogsPerPage} cardState= {cardState.length} page={page} />
          </div>
        </div>
    </div>
  );
}
