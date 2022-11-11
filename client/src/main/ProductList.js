import React from 'react'
import './ProductList.css'
import ProductCard from './ProductCard'
import Loader from '../components/Loader'
import NotFound from '../components/NotFound'



const ProductList = (props) => {
    return (
        <div className="search-results">
            {props.search? 
                props.search.items.map( (el, index) =>  index < 6 &&
                    <ProductCard price={el.price.amount} title={el.title} thumbnail={el.picture} id={el.id} key={index} location={el.location} condition={el.condition}/>
                )
                :
                props.notFound?
                <NotFound/>
                :
                <Loader/>
            }
        </div>
    )
}

export default ProductList

