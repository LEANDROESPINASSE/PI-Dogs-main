import React from "react";
import "./Home.css";
import loadingGif from "./Styles/loadingGif.gif";
import notfound from "./Styles/404.jpeg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import Dog from "../Dog/Dog";

//-------------------------- ACTIONS/IMPORT -----------------------------

import {
  getAllDogs,
  getAllTemperament,
  getTemperamentFilter,
  getABCOrder,
  getCBAOrder,
  getWeightMinOrder,
  getWeightMaxOrder,
  getOrderByCreation,
} from "../../redux/actions";

//------------------------------ REACT/REDUX ----------------------------

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const loading = useSelector((state) => state.loading);
  const dogallTemperaments = useSelector((state) => state.AllTemperaments);

  const [order, setOrder] = useState("");

  //----------------------------- PAGINADO ---------------------------------

  const [page, setPage] = useState(1);
  const [dogsxPage, setDogsxPage] = useState(8);
  const indice = page * dogsxPage;

  const indiceFinal = indice - dogsxPage;

  const currentPage = allDogs.slice(indiceFinal, indice);

  const pagina = (numPage) => {
    setPage(numPage);
  };

  //---------------------------- REACT/HOOKS -------------------------------

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperament());
  }, [dispatch]);

  function handleTemperamentFilter(e) {
    e.preventDefault();
    dispatch(getTemperamentFilter(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  }

  function handleAlphabetOrder(e){ 
    if(e.target.value === "ABC"){
        e.preventDefault ();
        dispatch (getABCOrder(e.target.value));
        setPage (1);
        setOrder (e.target.value)
    }else if(e.target.value === "CBA"){
        e.preventDefault ();
        dispatch (getCBAOrder(e.target.value));
        setPage (1);
        setOrder (e.target.value)       
    }
}

  // function handleWeightOrder(e) {
  //     e.preventDefault()
  //     dispatch(getWeightOrder(e.target.value));
  //     setPage(1)
  //     setOrder(e.target.value)
  // }

  function handleWeightOrder(e) {
    if (e.target.value === "Min") {
      e.preventDefault();
      dispatch(getWeightMinOrder(e.target.value));
      setPage(1);
      setOrder(e.target.value);
    } else if (e.target.value === "Max") {
      e.preventDefault();
      dispatch(getWeightMaxOrder(e.target.value));
      setPage(1);
      setOrder(e.target.value);
  }

  function handleOrderByCreation(e) {
    e.preventDefault();
    dispatch(getOrderByCreation(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllDogs());
  }

  //------------------------------ RENDER/HOME -----------------------------


  
  return (
    <div>
      {loading ? (
        <div className="loading">
          <img className="loadingImg" src={loadingGif} alt="not found" />
        </div>
      ) : (
        <div>
          <nav id="nav">
            <h1 id="homeTittle">DOGS</h1>
            <ul>
              <li>
                <button
                  className="btnStyle1"
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  Refresh
                </button>
              </li>
              <li>
                <Link to="/dogs">
                  <button id="create">Create a new Dog</button>
                </Link>
              </li>
              <li>
                <select
                  onChange={(e) => {
                    handleTemperamentFilter(e);
                  }}
                  className="navFilter"
                >
                  <option value={"all"}>All Temperaments</option>
                  {dogallTemperaments?.map((e) => {
                    return (
                      <option key={e.id} value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <select
                  key="alphaOrder"
                  onChange={(e) => handleAlphabetOrder(e)}
                  className="navFilter"
                >
                  <option value={"allApi"}>Alphabet order</option>
                  <option value={"ABC"}>A to Z</option>
                  <option value={"CBA"}>Z to A</option>
                </select>
              </li>
              <li>
                <select
                  onChange={(e) => handleWeightOrder(e)}
                  className="navFilter"
                >
                  <option value="selected" hidden>
                    Weight filter
                  </option>
                  <option value="Min">Heavy-Light</option>
                  <option value="Max">Light-Heavy</option>
                </select>
              </li>
              <li>
                <select
                  onChange={(e) => handleOrderByCreation(e)}
                  className="navFilter"
                >
                  <option value="all">Origin filter</option>
                  <option value="api">DogsFromApi</option>
                  <option value="created">DogsFromDb</option>
                </select>
              </li>
              <li>
                <SearchBar />
              </li>
            </ul>
            <div className="clear"></div>
          </nav>

          <Pagination
            dogsxPage={dogsxPage}
            allDogs={allDogs.length}
            pagina={pagina}
          />

          {allDogs?.length ? (
            allDogs?.map((e) => {
              return (
                <div>
                  <Link to={`/dogs/${e.id}`}>
                    <Dog
                      name={e.name}
                      image={e.image}
                      temperaments={e.temperament}
                      id={e.id}
                      weight={e.weight}
                    />
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="noFoundError">
              <h1 className="dogNotFound">The Dog has not been found</h1>
              <img className="notFound" src={notfound} alt="notfound" />
              <button
                className="btnStyle2"
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Back
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
}