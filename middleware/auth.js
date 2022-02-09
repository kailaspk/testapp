const jwt = require('jsonwebtoken')

const User = require('../models/user')

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.token
        const decode = await jwt.verify(token, 'blackcat')
        const user = await User.findOne({ _id: decode._id,status:true })
            //console.log(user)
        if (!user) {
            throw new Error('user invalid')
        }

        req.token = token
        req.user = user
        next()

    } catch (error) {
        console.log(error.message)
        res.status(401).send({ success: false, message: 'please authenticate' })

    }
}

module.exports = auth