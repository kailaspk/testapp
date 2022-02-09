const express = require('express')
const auth = require('../middleware/auth')

const UserController = require('../contollers/user')
const userController = new UserController();

const router = express.Router()

router.post('/createUser', userController.createUser)
router.post('/loginUser', userController.loginUser)
router.get('/logoutUser',auth, userController.logoutUser)

module.exports = router