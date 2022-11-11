import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './Navbar.css'
import { config } from '../config'
import axios from 'axios'
import Home from '../main/Home'
import CategoriesList from './CategoriesList'
import ProductList from '../main/ProductList'
import Product from '../main/Product'
import NotFound from '../components/NotFound'
import ErrorMessage from '../components/ErrorMessage'


const Navbar = () => {

    const [ search, setSearch ] = useState("")
    const [ productsFound, setProductsFound ] = useState('');
    const [ error, setError ] = useState(false)
    const [ notFound, setNotFound ] = useState(false)

    const hadleChange = e => {
        let value = e.target.value
        setSearch(value)   
    }

    const onSearch =  () => {
        axios.get(`${config.host}/api/search?q=${search}`)
        .then( res => {
            if(res.data.items) {
                console.log("Response:",res)
                setNotFound(false)
                setError(false)
                setProductsFound(res.data)
            } else {
                console.log("No hay productos")
                setError(false)
                setNotFound(true)
            }
        })
        .catch( err => {
            console.log("Error:", err);
            setError(true)
        })
    }

    return (
        <>
            <header className='nav-header'>
                <Link to='/' className='nav-logo' onClick={() => setSearch('')}>
                    <img src="/images/Logo_ML@2x.png" alt="logo"/>
                </Link>
                <form action="" className="nav-search" onClick={search.length > 0? onSearch : null}>
                    <input 
                        type="text" 
                        placeholder="Nunca dejes de buscar"
                        value={search}
                        onChange={hadleChange}
                    />
                    <Link to={search.length > 0? `/items?search=${search}` : null}>
                        <button type="submit" className="nav-search-btn"><img src="/images/ic_Search.png" alt="search"/></button>
                    </Link>
                </form>
            </header>
            <main className="main-container">
                {notFound?
                <NotFound/>
                :
                error?
                <ErrorMessage/>
                :
                <>
                    <CategoriesList notFound={notFound} data={productsFound}/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/items"  element={<ProductList search={productsFound} />}></Route>
                        <Route path="/items/:id" element={<Product notFound={notFound} setNotFound={setNotFound} setError={setError}/>} />
                        <Route path="*" element={<NotFound/>} />
                    </Routes> 
                </>
                }
            </main>
        </>  
    )
}

export default Navbar