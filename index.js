const express = require("express")
const mongoose = require('mongoose');
const router = require("./routes")

const app = express()
const PORT = 3001

app.use(express.json())

app.use(router) // conectamos el server con el router - en este caso ./router
                // luego la ruta index conecta con las rutas necesarias.. (products, proveedores, etc..)

app.get("/", (req, res) => {
    res.send("Ping")
})

mongoose.connect("mongodb+srv://adrincovich:adrian@cluster0.evpr3zb.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
            console.log("bd ok")
            app.listen(PORT, () => console.log("Server ok"))
        })
        .catch((error) => console.log(error))

