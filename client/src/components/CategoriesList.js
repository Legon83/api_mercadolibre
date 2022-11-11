import React from 'react'
import { Link } from 'react-router-dom'
import './CategoriesList.css'

const CategoriesList = (props) => {
    return (
        <>
            {!props.notFound && props.data && props.data.categories?
                <p className="productCategory">{props.data.categories.map( (el, index) => props.data.categories.length > index +1? <Link key={index}>{el} - </Link> :  <b key={index}><Link>{el}</Link></b>)}</p>
                :
                null
            }
        </>
    )
}

export default CategoriesList
