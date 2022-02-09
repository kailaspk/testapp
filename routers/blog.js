const express = require('express')
const auth = require('../middleware/auth')

const BlogController = require('../contollers/blog')
const blogController = new BlogController();

const router = express.Router()

router.post('/addBlog',auth, blogController.addblog)
router.get('/getAllBlog',auth, blogController.getAllBlog)
router.get('/getAllBlogByid/:user_id',auth, blogController.getAllBlogByid)
router.patch('/updateBlog/:id',auth, blogController.updateBlog)
router.delete('/deleteBlog/:id',auth, blogController.deleteBlog)

module.exports = router