import React from "react";
import "./Detail.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail, deleteDog, clearDogCache } from "../../redux/actions";
import { Link } from "react-router-dom";
import defaultImage from "./Style/defaultDog.jpg";
import loadingGif from "../Home/Styles/loadingGif.gif";


//import dogTemp from "./Temp"


export default function Detail() {
  const dispatch = useDispatch();
  const dogDetails = useSelector(state => state.dogDetail);
  const loading = useSelector((state) => state.loading);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDogDetail(id));
    return () => {
      dispatch(clearDogCache())
    }
  }, [dispatch, id]);

  // console.log(dogDetail);

  // function handleDelete(element) {
  //   if (id.lenght > 5) {
  //     element.preventDefault();
  //     dispatch(deleteDog(id));
  //     alert("Dog deleted");
  //     history.push("/home");
  //   } else {
  //     alert("You can delete only your Dogs");
  //   }
  // }

  return (
    <div key={id}>
      {dogDetails.length === 0 ? (
        <div className="loading"> <img src={loadingGif} alt="loading" /></div>
      ) : (
        <div className="body">
          <h1 className="detailname">{dogDetails.name}</h1>
          {dogDetails.image ? (
            <div>
            <img src={dogDetails.image} className="image" alt="Dog image" />
            </div>
          ) : (
            <img id="imgDetail" src={defaultImage} alt="dogImg" />
          )}
          <div>
            {dogDetails.temperament ? (
              <p className="letters">Dog temperaments: {dogDetails.temperament}.</p>
            ) : (
              <p className="letters">Temperaments not found</p>
            )}
            <p className="letters">Weight in Kg: {dogDetails.weight}</p>

            <p className="letters">Height in Cm: {dogDetails.height}</p>

            <p className="letters">Life expectancy: {dogDetails.lifeSpan}</p>
          </div>
          <Link to="/home">
            {/* <button className="detailButton" onClick={(e) => handleDelete(e)}>
              Delete
            </button> */}
            <button className="lettersB" >Back</button>
          </Link>
        </div>
      )}
    </div>
  );
}
