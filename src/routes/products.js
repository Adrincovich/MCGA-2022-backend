const router = require("express").Router();

const {
        getAll,
        getDeleted,
        getById,
        getByName,
        createProduct,
        updateProduct,
        removeProduct,
        undoDeleteById
    } = require('../controllers/Products');


// PING
router.get('/',(req,res)=>res.send('OK'));

// ALL PRODUCTS
router.get('/all', getAll);
// DELETED PRODUCTS
router.get('/deleted', getDeleted);
// PRODUCTS BY ID
router.get('/byId/:id',getById);
// PRODUCTS BY NAME
router.get('/byName/:name',getByName);
// CREATE PRODUCT
router.post('/add',createProduct);
// UPDATE PRODUCT
router.put('/update/:id',updateProduct);
// DELETE PRODUCT
router.delete('/delete/:id',removeProduct);
// UNDO DELETE PRODUCT BY ID
router.put('/undoDelete/:id',undoDeleteById);



module.exports=router;