import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Product.css'
import { config } from '../config'
import axios from 'axios'
import Loader from '../components/Loader'

const Product = (props) => {

    const [ product, setProduct ] = useState()
    const { id } = useParams();

    useEffect(() => {
        onSearch()
    }, [])

    window.scrollTo(0, 0);

    const onSearch =  () => {
        id &&
        axios.get(`${config.host}/api/items/${id}`)
            .then( res => {
                if(res.data.item){
                    console.log("Response:",res)
                    props.setError(false)
                    props.setNotFound(false)
                    setProduct(res.data)
                } else {
                    console.log("No hay productos")
                    props.setError(false)
                    props.setNotFound(true)
                }
            })
            .catch( err => {
                console.log("Error:", err)
                props.setError(true)
        })
    }


    return (
        
        <>
            <div className="search-results">
                {product? 
                <div className="productSearch-container">
                    <div className="productImage-container">
                        <img src={product.item.picture} alt=""/>
                        <div className="productDescription-container">
                            <div className="productDescription-title">Descripción del producto</div>
                            <div className="productDescription">{product.item.description}</div>
                        </div>
                    </div>
                    <div className="productInfo-container">
                        <p className="productSold">{product.item.condition === "new"? "Nuevo" : product.item.condition === "used"? "Usado" : null} - {product.item.condition === "used" && product.item.sold_quantity === 0? null : product.item.sold_quantity} {product.item.condition === "used" && product.item.sold_quantity === 0? null : product.item.sold_quantity > 1? "vendidos" : "vendido"}</p>
                        <p className="productTitle">{product.item.title}</p>
                        <div className="productPrice">$ {Intl.NumberFormat("de-DE").format(product.item.price.amount)}<span>{product.item.price.decimals}</span></div>
                        <button type="submit" className="buy-product-btn">Comprar</button>
                    </div>
                </div>
                :
                <Loader/>
                }       
            </div>
        </>
        
)
}

export default Product
