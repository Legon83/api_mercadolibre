import React from 'react'
import './ProductCard.css'
import { Link } from 'react-router-dom'

const ProductCard = (props) => {
    return (
        <Link to={`/items/${props.id}`} className="productsSearch-container">
            <div className="right-group">
                <img src={props.thumbnail} alt="" className="productsImage-container"/>
                <div className="productsInfo-container">
                    <div className="productsPrice">$ {Intl.NumberFormat("de-DE").format(props.price)}</div>
                    <img src="/images/ic_shipping.png" alt="search"/>
                    <p className="productsDescription">{props.title}</p>
                    <p className="productsTip">{props.condition === "used"? "Usado" : null}</p>
                </div>
            </div>
            <h3 className="productsLocation">{props.location}</h3>
        </Link>
    )
}

export default ProductCard
