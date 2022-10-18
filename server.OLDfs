// EN ESTE ARCHIVO TRABAJAMOS CON FILE SYSTEM (fs) SIN RUTAS NI CONTROLADOR, SOLO POSTMAN

// USAMOS POSTMAN PARA INTERACTURAN CON LA API REST.
// CUANDO USAMOS (app.post) Y (app.put) SE USA EL BODY - RAW  -JSON EN POSTMAN
// SI NO SE USA POR ID EN EL METODO (app.get) (app.delete)

const express = require("express")
const app = express()
const fs = require("fs")
const products = require("./data/productos.json") // esto es un mock de productos generado con mockaro

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://adrincovich:adrian@cluster0.evpr3zb.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log("bd ok")
            app.listen(PORT, () => console.log("Server ok"))
        })
        .catch((error) => console.log(error))

const PORT = 3000

app.use(express.json()) //para decirle al server que acepte json. En back con express no usamos parse - stringify

app.get("/", (req, res) => {
    res.send("Ping")
})

app.get("/products", (req, res) => {
    res.json(products)
})

app.get("/products/byName/:name", (req, res) => {
    const name = req.params.name
    const filterProducts = products.filter(item => item.name === name)
    if (filterProducts.length == 0) return res.status(204).json(filterProducts)
    res.status(200).json(filterProducts)
})
// si vamos a http://localhost:3000/products/byName/Fanta devuelve el objeto
// si hacemos la misma peticion en postman devuelve lo mismo pero indentado


app.post("/products/add", (req, res) => { // post para agregar productos
    const newProduct = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
    }
    if (products.some(item => item.id === req.body.id)) { // si existe retorne mensaje de error
        return res.status(500).json({ message: "This product is already exists" })
    }
    products.push(newProduct) // crea el nuevo producto
    fs.writeFile("./data/productos.json", JSON.stringify(products), (error) => {
        if (error) res.status(500).json({ message: "Internal Error" })
    }) // indicamos que pushee en file system (fs) y si falla que muestre mensaje de error
    res.json(newProduct)
})

// para el ejercicio delete hacerlo por id por ruta

app.delete("/products/deleteById/:id", (req, res) => {
    const id = req.params.id

    products.filter((item, index) => {
        if (item.id == id) {
            products.splice(index, 1)
        }
    })

    return res.send(products)

});

app.delete("/products/deleteByName/:name", (req, res) => {
    const name = req.params.name

    products.filter((item, index) => {
        if (item.name == name) {
            products.splice(index, 1)
        }
    })

    return res.send(products)

});


app.listen(PORT, () => {
    console.log("OK")
})
// se reemplaza con mongoose.connect arriba de todo