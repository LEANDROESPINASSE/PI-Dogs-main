import React from "react"
import "./Logo.css"
import logo from "./logo.png"
import { Link } from "react-router-dom"

export default function Logo() {
    return (
        <div>
            <nav>
                <Link to="/" id="click">  
                    <button className="logo"></button>
                </Link>
            </nav>
        </div>
    )
}