const router = require("express").Router()
const products = require("../schemes/products")


router.get("/", (req,res) => {
    products.find({isDeleted: false})//busca todos los productos por baja logica
            .then(data => res.json({data}))
            .catch(error => res.status(500).json({message: error}))
})

router.get("/deleted", (req,res) => {
    products.find({isDeleted: true})//busca todos los productos con baja logica
            .then(data => res.json({data}))
            .catch(error => res.status(500).json({message: error}))
})

router.get("/byId/:id", (req,res) => {
    const id = req.params.id
    products.findOne({_id: id})
            .then(data => {
                if(!data) return res.status(404).json({msg: "Not Found"})
                return res.json({data})
            })
            .catch(error => res.status(500).json({message: error}))
})

router.get("/byName/:name", (req,res) => {
    const name = req.params.name
    products.findOne({name: name})
            .then(data => {
                if(!data) return res.status(404).json({msg: "Not Found"})
                return res.json({data})
            })
            .catch(error => res.status(500).json({message: error}))
})


// -----------------------°---------------------


router.post("/add", (req, res) => {
    const newProduct = new products(req.body)
    newProduct.save() //guarda el objeto en la base de datos
              .then(data => res.status(200).json({message: "Product created", data})) // data todo lo que se guarda en products
              .catch(error => res.status(500).json({message: error}))
              // si no coumple las condiciones del esquema tira error
})


// -----------------------°---------------------


router.put("/update/:id", (req,res) => {
    const id = req.params.id;
    products.findByIdAndUpdate(id, req.body)
    .then(data => res.status(200).json({mensaje: "Product updated", data}))
    .catch(error => res.status(500).json({mensaje: error}));
})


//Primero realizamos baja logica con metodo .delete y en caso de querer dar alta nuevamente, un put
router.delete("/deleteById/:id", (req,res) => {
    const id = req.params.id;
    products.findByIdAndUpdate(id, {isDeleted: true})
    .then(data => {
        if (!data) {
            return res.status(404).json({mensaje: "Not Found"})
        }
        return res.status(204).json({mensaje:"Product logically deleted"});
    })
    .catch(error => res.status(500).json({mensaje: error}));
})


// se actualiza el atributo isDeleted para dar nuevamente el alta
router.put("/alta/:id", (req,res) => {
    const id = req.params.id;
    products.findByIdAndUpdate(id, {isDeleted: false})
    .then(data => res.status(200).json({mensaje: `The product ${data.name} has been enabled again`}))
    .catch(error => res.status(500).json({mensaje: error}));
})


// -----------------------°---------------------


module.exports = router