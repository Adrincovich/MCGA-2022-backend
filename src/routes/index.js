const express = require("express")
const productsRoutes = require("./products")
const providersRoutes = require("./providers")

const router = express.Router()

router.use("/products", productsRoutes)
router.use("/providers", providersRoutes)

module.exports = router