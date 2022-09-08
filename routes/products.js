const router = require("express").Router()
const Products = require("../schemes/products")


router.get("/", (req,res) => {
    Products.find({isDeleted: false})//busca todos los productos con baja logica
            .then((data) => res.json({data}))
            .catch((error) => res.status(500).json({message: error}))
})


router.get("/:name", (req,res) => {
    const name = req.params.name
    Products.findOne({name: name})
            .then((data) => {
                if(!data) return res.status(404).json({msg: "Not Found"})
                return res.json({data})
            })
            .catch((error) => res.status(500).json({message: error}))
})


router.post("/add", (req, res) => {
    const newProduct = new Products(req.body)
    newProduct.save() //guarda el objeto en la base de datos
              .then(data => res.status(200).json({message: "Product created", data})) // data todo lo que se guarda en products
              .catch((error) => res.status(500).json({message: error}))
              // si no coumple las condiciones del esquema tira error

    // res.send({message: "OK"})
})

module.exports = router