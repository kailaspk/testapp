const Blog = require('../models/blog')
let nodemailer = require('nodemailer');
const User = require('../models/user');

class BlogController {
    constructor() {

    }
    //add blog
    async addblog(req, res) {
        try {
            let user = await new Blog(req.body)
            user.user_id = req.user._id
            await user.save()

            let alluser = await User.find({})

            let email = process.env.EMAILID
            let pass = process.env.PASS

            alluser.forEach(element => {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user:email ,
                        pass: pass
                    }
                });

                // console.log("========email=", element.email);
                var mailOptions = {
                    from: 'blogapp@gmail.com',
                    to: element.email,
                    subject:  req.user.name + ' Added a new blog',
                    text: 'A new blog was added to blogs list'
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            });

            return res.status(200).send({ success: true, message: "Blog Created" })
        } catch (error) {
            console.log("======error========", error);
            return res.status(400).send({ success: false, message: "Blog Failed To Create" })
        }
    }

    //getall blog
    async getAllBlog(req, res) {
        const blog = await Blog.find({})
        if (blog.length > 0) {
            return res.status(200).send({ success: true, data: blog, message: "Blogs Fetcched Successfully" })
        } else {
            return res.status(400).send({ success: false, message: "No Blogs Found" })
        }
    }

    //getall blog by autherid
    async getAllBlogByid(req, res) {
        const blog = await Blog.find({ user_id: req.params.user_id })
        if (blog.length > 0) {
            return res.status(200).send({ success: true, data: blog, message: "Blog Fetcched Successfully" })
        } else {
            return res.status(400).send({ success: false, message: "No Blog Found" })
        }
    }

    //update blogs
    async updateBlog(req, res) {
        let result = await Blog.findOne({ _id: req.params.id });
        if (result) {
            let updates = Object.keys(req.body)
            updates.forEach((update) => result[update] = req.body[update])
            await result.save();

            return res.status(200).send({ success: true, data: result, message: "Successfully Updated Details" })
        } else {
            return res.status(400).send({ success: false, message: "Blog Not Found !" })
        }
    }

    //delete blog by id
    async deleteBlog(req, res) {
        await Blog.deleteOne({ _id: req.params.id })
        res.status(200).send({ success: true, message: "Blog Deleted" })
    }

}

module.exports = BlogController
