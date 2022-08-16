import React from "react";
import "./Dog.css";
import defaultImage from "../Detail/Style/defaultDog.jpg";

// function dogTemperament(temperaments) {
//     if (typeof temperaments === "string") {
//     return temperaments;
//     }
//     if (Array.isArray(temperaments)) {
//     let temps = temperaments.map((e) => e.name);
//     return temps.join(", ");
//     }
// }

export default function Dog({
    name,
    image,
    temperament,
    weight
}) {
  return (
    <div>
      <h1 className="dogname">{name}</h1>
      {image ? (
        <img className="image" src={image} alt="dogImg" />
      ) : (
        <img src={defaultImage} alt="dogImg" />
      )}
      {temperament ? (
        <h4 className="dogname">Dog temperaments: {temperament}.</h4>
      ) : (
        <h4>Not temperament found</h4>
      )}
      {weight ? (
      <h4 className="dogname">Weight between: {weight} Kg
      </h4>
      ) : (
      <h4 className="dogname">Weight Not found</h4>
      )}
    </div>     
  );
}
