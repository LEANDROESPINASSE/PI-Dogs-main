import React from "react";
import { Link } from "react-router-dom"
import "./About.css"

export default function About() {
    return (
        <div className="about">
            <h2 className="tittle" >About this project</h2>
            <Link to="/home">
                <button className="btn">Back Home</button>
            </Link>
            <Link className="btn" to="https://www.linkedin.com/in/leandro-espinasse/">
                <button>My LinkedIn profile</button>
            </Link>
            <Link className="btn" to="https://github.com/LEANDROESPINASSE">
                <button>My GitHub profile</button>
            </Link>
            <h5>
                This project is a Simple Web Application, witch allows you to search dogs 
            by races, sizes, ages furthermore a creation of a new Dog race.
                A project where i can demostrate Back-End and Front-End skils. Some of the tools
            i use in this projects are:
            </h5>
                <div>
                    <h3>Data Base:</h3>
                    <li>PostgresSQL</li> 
                    <li>Sequelize</li> 
                </div>
                <div>
                    <h3>Back-End:</h3>
                    <li>Node</li>
                    <li>Express</li>
                </div>
                <div>
                    <h3>Front-End:</h3>
                    <li>React</li>
                    <li>Redux</li>
                </div>
        </div>
    )
}