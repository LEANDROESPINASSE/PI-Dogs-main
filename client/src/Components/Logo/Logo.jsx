import React from "react"
import "./Logo.css"
import { Link } from "react-router-dom"

export default function Logo() {
    return (
        <div>
            <nav className="Logo">
                <Link to="/" id="click">  
                    <button className="logoButton">DOG</button>
                </Link>
            </nav>
        </div>
    )
}