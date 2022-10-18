const express = require("express")
const product = require("./Products")
const provider = require("./Providers")

const router = express.Router()

router.use("/product", product)
router.use("/provider", provider)

module.exports = router