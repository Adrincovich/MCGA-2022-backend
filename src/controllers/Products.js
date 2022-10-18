const Products = require("../models/Products")


const getAll = (req,res) => {
    Products.find({isDeleted: false})//busca todos los productos por baja logica
            .then(data => res.json({data}))
            .catch(error => res.status(500).json({message: error}))
};

const getDeleted = (req,res) => {
    Products.find({isDeleted: true})//busca todos los productos con baja logica
            .then(data => res.json({data}))
            .catch(error => res.status(500).json({message: error}))
};

const getById = (req,res) => {
    const id = req.params.id
    Products.findOne({_id: id})
            .then(data => {
                if(!data) return res.status(404).json({msg: "Not Found"})
                return res.json({data})
            })
            .catch(error => res.status(500).json({message: error}))
};

const getByName = (req,res) => {
    const name = req.params.name
    Products.findOne({name: name})
            .then(data => {
                if(!data) return res.status(404).json({msg: "Not Found"})
                return res.json({data})
            })
            .catch(error => res.status(500).json({message: error}))
};


// -----------------------°---------------------


const createProduct = (req, res) => {
    const newProduct = new Products(req.body)
    newProduct.save() //guarda el objeto en la base de datos
              .then(data => res.status(200).json({message: "Product created", data})) // data todo lo que se guarda en Products
              .catch(error => res.status(500).json({message: error}))
              // si no coumple las condiciones del esquema tira error
};


// -----------------------°---------------------


const updateProduct = (req,res) => {
    const id = req.params.id;
    Products.findByIdAndUpdate(id, req.body)
    .then(data => res.status(200).json({mensaje: "Product updated", data}))
    .catch(error => res.status(500).json({mensaje: error}));
};


//Primero realizamos baja logica con metodo .delete y en caso de querer dar alta nuevamente, un put
const removeProduct = (req,res) => {
    const id = req.params.id;
    Products.findByIdAndUpdate(id, {isDeleted: true})
    .then(data => {
        if (!data) {
            return res.status(404).json({mensaje: "Not Found"})
        }
        return res.status(204).json({mensaje:"Product logically deleted"});
    })
    .catch(error => res.status(500).json({mensaje: error}));
};


// se actualiza el atributo isDeleted para dar nuevamente el alta
const undoDeleteById = (req,res) => {
    const id = req.params.id;
    Products.findByIdAndUpdate(id, {isDeleted: false})
    .then(data => res.status(200).json({mensaje: `The product ${data.name} has been enabled again`}))
    .catch(error => res.status(500).json({mensaje: error}));
};


// -----------------------°---------------------

module.exports = {
    getAll,
    getDeleted,
    getById,
    getByName,
    createProduct,
    updateProduct,
    removeProduct,
    undoDeleteById
  };