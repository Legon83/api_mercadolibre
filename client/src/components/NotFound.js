import React from 'react'
import './NotFound.css'

const NotFound = () => {
    return (
        <div className="notFound-container">
            <img src="/images/not-found.jpg" alt=""/>
            <div>
                <h3>No hay publicaciones que coincidan con tu búsqueda.</h3>
                <ul>
                    <li>Revisá la ortografía de la palabra.</li>
                    <li>Utilizá palabras más genéricas o menos palabras.</li>
                    <li>Navegá por las categorías para encontrar un producto similar.</li>
                </ul> 
            </div>
        </div>
    )
}

export default NotFound
