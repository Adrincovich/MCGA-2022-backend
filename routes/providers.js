const router = require("express").Router()
const providers = require("../schemes/providers")


router.get("/", (req,res) => {
    providers.find({isDeleted: false})//busca todos los proveedires con baja logica
            .then((data) => res.json({data}))
            .catch((error) => res.status(500).json({message: error}))
})

router.get("/:id", (req,res) => {
    const id = req.params.id
    providers.findOne({_id: id})
            .then((data) => {
                if(!data) return res.status(404).json({msg: "Not Found"})
                return res.json({data})
            })
            .catch((error) => res.status(500).json({message: error}))
})

router.get("/:name", (req,res) => {
    const name = req.params.name
    providers.findOne({name: name})
            .then((data) => {
                if(!data) return res.status(404).json({msg: "Not Found"})
                return res.json({data})
            })
            .catch((error) => res.status(500).json({message: error}))
})


// -----------------------°---------------------


router.post("/add", (req, res) => {
    const newProvider = new providers(req.body)
    newProvider.save() //guarda el objeto en la base de datos
              .then(data => res.status(200).json({message: "Provider created", data})) // data todo lo que se guarda en providers
              .catch((error) => res.status(500).json({message: error}))
              // si no coumple las condiciones del esquema tira error
})


// -----------------------°---------------------


router.put("/update/:id", (req,res) => {
    const id = req.params.id;
    providers.findByIdAndUpdate(id, req.body)
    .then(data => res.status(200).json({mensaje: "Provider updated", data}))
    .catch(() => res.status(500).json({mensaje: error}));
})


//Primero realizamos baja logica con metodo .delete y en caso de querer dar alta nuevamente, un put
router.delete("/delete/:id", (req,res) => {
    const id = req.params.id;
    providers.findByIdAndUpdate(id, {isDeleted: true})
    .then(data => {
        if (!data) {
            return res.status(404).json({mensaje: "Not Found"})
        }
        return res.status(204).json({mensaje:"Provider logically deleted"});
    })
    .catch(error => res.status(500).json({mensaje: error}));
})


// se actualiza el atributo isDeleted para dar nuevamente el alta
router.put("/alta/:id", (req,res) => {
    const id = req.params.id;
    providers.findByIdAndUpdate(id, {isDeleted: false})
    .then(data => res.status(200).json({mensaje: `The provider ${data.name} has been enabled again`}))
    .catch(() => res.status(500).json({mensaje: error}));
})


// -----------------------°---------------------


module.exports = router