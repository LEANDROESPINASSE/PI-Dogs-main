import React from "react";
import "./Home.css";
import loadingGif from "./Styles/loadingGif.gif";
//import notfound from "./Styles/404.jpeg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
//import Pagination from "../Pagination/Pagination";
import Dogs from "../Dogs/Dogs";
import Logo from "../Logo/Logo";


//-------------------------- ACTIONS/IMPORT -----------------------------

import {
  getAllDogs,
  getAllTemperament,
  getTemperamentFilter,
  getABCOrder,
  getCBAOrder,
  orderByWeight,
  // getWeightMinOrder,
  // getWeightMaxOrder,
  getOrderByCreation,
} from "../../redux/actions";

//------------------------------ REACT/REDUX ----------------------------

export default function Home() {
  const dispatch = useDispatch();
  //const allDogs = useSelector((state) => state.dogs);
  const dogAllTemperaments = useSelector((state) => state.allTemperaments);
  const loading = useSelector((state) => state.loading);

  //---------------------------- REACT/HOOKS -------------------------------

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperament());
  }, [dispatch]);

const [order, setOrder] = useState('')
const [page, setPage] = useState(1);


  function handleTemperamentFilter(e) {
    e.preventDefault();
    dispatch(getTemperamentFilter(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  }
  
  function handleOrderByCreation(e) {
    e.preventDefault();
    dispatch(getOrderByCreation(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  }

  function handleAlphabetOrder(e){ 
    if(e.target.value === "Asc"){
        e.preventDefault ();
        dispatch(getABCOrder(e.target.value));
        setPage (1);
        setOrder (e.target.value)
    }else if(e.target.value === "Desc"){
        e.preventDefault ();
        dispatch(getCBAOrder(e.target.value));
        setPage (1);
        setOrder (e.target.value)       
    }
}

function handleOrderByWeight(e) {
  e.preventDefault();
  dispatch(orderByWeight(e.target.value));
  setOrder(e.target.value);
  setPage (1);
};

  // function handleWeightOrder(e) {
  //     e.preventDefault()
  //     dispatch(getWeightOrder(e.target.value));
  //     setPage(1)
  //     setOrder(e.target.value)
  // }

  // function handleWeightOrder(e) {
  //   if (e.target.value === "Min") {
  //     e.preventDefault();
  //     dispatch(getWeightMinOrder(e.target.value));
  //     setPage(1);
  //     setOrder(e.target.value);
  //   } else if (e.target.value === "Max") {
  //     e.preventDefault();
  //     dispatch(getWeightMaxOrder(e.target.value));
  //     setPage(1);
  //     setOrder(e.target.value);
  // }


  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllDogs());
  }

  //------------------------------ RENDER/HOME -----------------------------

  
  return (
    <div>
      {loading ? (
        <div>
          <img src={loadingGif} alt="not found" />
        </div>
      ) : (
        <div className="homeback">
          <nav>
            <Logo className="logo"/>
            <SearchBar className="search"/>



            <div className="first">
              <div className="child">
                <button className="button1" onClick={(e) => {handleClick(e);}}>Refresh</button>
              </div>
              <div className="child">
                <Link to="/create">
                    <button id="create" className="button1">Create a new Dog</button>
                </Link>
              </div>
              <div className="child">
                <Link to="/About">
                  <button id="About"className="button1">About</button>
                </Link>
                </div>
              </div>



              <ul>
                <select onChange={(e) => {handleTemperamentFilter(e)}} className="filter">
                    <option value="all">Temperament filter</option>
                        {dogAllTemperaments?.map((e) => (
                    <option value={e.name} key={e.id}>{e.name}</option> 
                    ))}
                </select>
              </ul>
              <ul>
                <select
                    key="alphaOrder"
                    onChange={(e) => handleAlphabetOrder(e)} className="filter">
                  <option value={"allApi"}>Alphabet order</option>
                  <option value={"Asc"}>A to Z</option>
                  <option value={"Desc"}>Z to A</option>
                </select>
              </ul>
              <ul>
                <select
                    onChange={(e) => handleOrderByWeight(e)} className="filter">
                  <option value="selected" hidden>Weight filter</option>
                  <option value="Asc">Heavy-Light</option>
                  <option value="Desc">Light-Heavy</option>
                </select>
              </ul>
              <ul>
                <select
                    onChange={(e) => handleOrderByCreation(e)} className="filter">
                  <option value="all" defaultValue="all">All Dogs</option>
                  <option value="api">DogsFromApi</option>
                  <option value="created">DogsFromDb</option>
                </select>
              </ul>
            
            <div className="clear"></div>
          </nav>
        </div>
          )}
        <div>
          <Dogs/>
        </div>
    </div>

  );
}