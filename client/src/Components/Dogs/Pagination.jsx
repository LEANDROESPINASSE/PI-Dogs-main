import React from "react"
import "./Dogs.css"

export default function Pagination ({ dogsPerPage, cardState, page }) {
    const pageNumbers = []

    for( let i=0; i < Math.ceil(cardState/dogsPerPage); i++) {
        pageNumbers.push(i+1)
    }
    return (
        <div className="paginado1"> 
            { pageNumbers && pageNumbers.map(number => (
                <ul key={number}
                    className="numbers1"> <button onClick={() => page(number)} className="buttonnumber">{number}</button>
                </ul>
            ))}
        </div>
    )
}