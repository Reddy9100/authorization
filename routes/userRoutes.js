const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")


router.post("/register",userController.registerFunction)
router.post("/login",userController.loginFunction)

module.exports = router