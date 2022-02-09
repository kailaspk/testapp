const mongoose = require('mongoose');
const options = { useNewUrlParser: true,  useUnifiedTopology: true };

// Mongodb connection
mongoose.connect('mongodb://localhost:27017/blogapp', options);