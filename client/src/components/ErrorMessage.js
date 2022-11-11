import React from 'react'
import './ErrorMessage.css'

const NotFound = () => {
    return (
        <div className="error-container">
            <img src="/images/serverError.jpg" alt=""/>
            <div className="errorMessage">
                <h3>Algo salió mal</h3>
                <h4>Estamos trabajando para solucionarlo.</h4> 
            </div>
        </div>
    )
}

export default NotFound
