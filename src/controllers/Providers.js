const Providers = require("../models/Providers");


const getAll = (req,res) => {
    Providers.find({isDeleted: false})//busca todos los productos por baja logica
            .then(data => res.json({data}))
            .catch(error => res.status(500).json({message: error}))
};

const getDeleted = (req,res) => {
    Providers.find({isDeleted: true})//busca todos los productos con baja logica
            .then(data => res.json({data}))
            .catch(error => res.status(500).json({message: error}))
};

const getById = (req,res) => {
    const id = req.params.id
    Providers.findOne({_id: id})
            .then(data => {
                if(!data) return res.status(404).json({msg: "Not Found"})
                return res.json({data})
            })
            .catch(error => res.status(500).json({message: error}))
};

const getByName = (req,res) => {
    const name = req.params.name
    Providers.findOne({name: name})
            .then(data => {
                if(!data) return res.status(404).json({msg: "Not Found"})
                return res.json({data})
            })
            .catch(error => res.status(500).json({message: error}))
};


// -----------------------°---------------------


const createProvider = (req, res) => {
    const newProduct = new Providers(req.body)
    newProduct.save() //guarda el objeto en la base de datos
              .then(data => res.status(200).json({message: "Product created", data})) // data todo lo que se guarda en Providers
              .catch(error => res.status(500).json({message: error}))
              // si no coumple las condiciones del esquema tira error
};


// -----------------------°---------------------


const updateProvider = (req,res) => {
    const id = req.params.id;
    Providers.findByIdAndUpdate(id, req.body)
    .then(data => res.status(200).json({mensaje: "Product updated", data}))
    .catch(error => res.status(500).json({mensaje: error}));
};


//Primero realizamos baja logica con metodo .delete y en caso de querer dar alta nuevamente, un put
const removeProvider = (req,res) => {
    const id = req.params.id;
    Providers.findByIdAndUpdate(id, {isDeleted: true})
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
    Providers.findByIdAndUpdate(id, {isDeleted: false})
    .then(data => res.status(200).json({mensaje: `The product ${data.name} has been enabled again`}))
    .catch(error => res.status(500).json({mensaje: error}));
};


// -----------------------°---------------------

module.exports = {
    getAll,
    getDeleted,
    getById,
    getByName,
    createProvider,
    updateProvider,
    removeProvider,
    undoDeleteById
  };