const router = require("express").Router();

const {
        getAll,
        getDeleted,
        getById,
        getByName,
        createProvider,
        updateProvider,
        removeProvider,
        undoDeleteById
    } = require('../controllers/Providers');


// PING
router.get('/',(req,res)=>res.send('OK'));

// ALL PROVIDERS
router.get('/all', getAll);
// DELETED PROVIDERS
router.get('/deleted', getDeleted);
// PROVIDERS BY ID
router.get('/byId/:id',getById);
// PROVIDERS BY NAME
router.get('/byName/:name',getByName);
// CREATE PROVIDER
router.post('/add',createProvider);
// UPDATE PROVIDER
router.put('/update/:id',updateProvider);
// DELETE PROVIDER
router.delete('/delete/:id',removeProvider);
// UNDO DELETE PROVIDER BY ID
router.put('/undoDelete/:id',undoDeleteById);



module.exports=router;