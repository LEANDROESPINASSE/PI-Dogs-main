import React from "react";
import "./Detail.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail, deleteDog } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import defaultImage from "./Style/defaultDog.jpg";
import loadingGif from "../Home/Styles/loadingGif.gif";

function dogTemperament(temperaments) {
  if (typeof temperaments === "string") {
    return temperaments;
  }
  if (Array.isArray(temperaments)) {
    let temps = temperaments.map((e) => e.name);
    return temps.join(", ");
  }
}

export default function Detail() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]);

  const dogDetail = useSelector((state) => state.dogDetail);
  const loading = useSelector((state) => state.loading);

  console.log(dogDetail);

  function handleDelete(element) {
    if (id.lenght > 5) {
      element.preventDefault();
      dispatch(deleteDog(id));
      alert("Dog deleted");
      history.push("/home");
    } else {
      alert("You can delete only your Dogs");
    }
  }
  return (
    <div>
      {loading ? (
        <div className="loading"> <img src={loadingGif} alt="loading" /></div>
      ) : (
        <div id="detailCard">
          <h1 id="tittle">{dogDetail.name}</h1>
          {dogDetail.image ? (
            <img src={dogDetail.image} alt="Dog image" id="imgDetail" />
          ) : (
            <img id="imgDetail" src={defaultImage} alt="dogImg" />
          )}
          <div>
            {dogDetail.temperaments ? (
              <p>Temperaments: {dogTemperament(dogDetail.temperaments)}</p>
            ) : (
              <p>Temperaments not found</p>
            )}
            <p>Max Weight: {dogDetail.weightMax}</p>
            <p>Min Weight: {dogDetail.weightMin}</p>
            <p>Max Height: {dogDetail.heightMax}</p>
            <p>Min height: {dogDetail.heightMin}</p>
            <p>Max life expectancy: {dogDetail.lifeSpanMax}</p>
            <p>Min life expectancy: {dogDetail.lifeSpanMin}</p>
          </div>
          <Link to="/home">
            <button className="detailButton" onClick={(e) => handleDelete(e)}>
              Delete
            </button>
            <button className="detailButton">Back</button>
          </Link>
        </div>
      )}{" "}
    </div>
  );
}
