const User = require('../models/user')

class UserController {
    constructor() {

    }
    //register user
    async createUser(req, res) {
        try {
            await new User(req.body).save();
            return res.status(200).send({ success: true, message: "User Created" })
        } catch (error) {
            // console.log("======error========",error);
            return res.status(400).send({ success: false, message: "User Failed To Create" })
        }
    }

    //login user
    async loginUser(req, res) {
        const user = await User.findOne({ email: req.body.email })
        if (user.password == req.body.password) {
            const token = await user.generateAuthToken()
            console.log("==========token==",token);
            res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false }).json({ success: true, message: "Login Successful" })
        }
    }

    //logout user
    async logoutUser(req, res) {
    res.clearCookie('token')
    res.status(200).json({ success: true, message: 'Logout Success' })
    }

}

module.exports = UserController
