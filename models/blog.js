const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'please provide title']
      },
      user_id:{
        type: mongoose.Schema.Types.ObjectId
      },
    description: {
        type: String,
    },
    author: {
        type: String,
        required: [true, 'please provide auther name'],
    }
},{ timestamps: true });


const Blog = mongoose.model('blogs', blogSchema)

module.exports = Blog