const express = require('express')
const axios = require("axios")
const app = express()
let cors = require("cors")

app.use(cors())


app.get("/api/search", (req, res) => {
  const product = req.query.q;
  const regex = /-I./;

  axios
    .get(`https://api.mercadolibre.com/sites/MLA/search?q=${product}`)
    .then( product => {
      try{
        const result = product.data.results;
        if (result.length > 0) {
  
          const categoryList =  product.data.filters.length > 0 && product.data.filters[0].values[0].path_from_root.map(el => el.name)
  
          let productsArray = result.map((product) => {
            const decimal = product.price - parseInt(product.price) === 0? "00" : (product.price - parseInt(product.price)).toFixed(2)*100
            const int = parseInt(product.price)
  
            return {
              id: product.id,
              title: product.title,
              price: {
                currency: product.currency_id,
                amount: int,
                decimals: decimal
              },
              picture: product.thumbnail.replace(regex, "-O."),
              condition: product.condition,
              free_shipping: product.shipping.free_shipping,
              location: product.address.state_name
            }
          })
  
          products = {
            author: {
              name: product.data.author,
              lastname: product.data.lastname
            },
            categories: categoryList,
            items: productsArray
          };    
          
          res.status(200).send(products)
        } else {
          res.status(200).send("Product not found");
        }
      }
      catch(err)
      {
        res.status(500).send("Internal server error");
      }
    })
})


app.get("/api/items/:id", (req, res) => {
  const id = req.params.id;

  let productData;
  axios.get(`https://api.mercadolibre.com/items/${id}`)
  .then( product => {
    try{
      const result = product.data
      const decimal = product.data.price - parseInt(product.data.price) === 0? "00" : (product.data.price - parseInt(product.data.price)).toFixed(2)*100
      const int = parseInt(product.data.price)
      
      productData = {
        author: {
          name: result.author,
          lastname: result.lastname
        },
        item: {
          id: result.id,
          title: result.title,
          price: {
            currency: result.currency_id,
            amount: int,
            decimals: decimal
          },
          picture: result.pictures[0].url,
          condition: result.condition,
          free_shipping: result.shipping.free_shipping,
          sold_quantity: result.sold_quantity,
          description: "string"
        }  
      }    

      axios.get(`https://api.mercadolibre.com/items/${id}/description`)
      .then( desc => {
        productData.item.description = desc.data.plain_text
    
        res.status(200).send(productData);
      })
    }
    catch(err)
    {
      res.status(500).send("Internal server error");
    }
  })
  .catch(() => {
    res.status(200).send("Product ID not found");
  })
})


app.listen(5000, () => { console.log("Server started on port 5000")})




