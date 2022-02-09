const express = require('express')
require('dotenv').config({ path: __dirname + '/config/.env' })

const cookieParser = require('cookie-parser')
require('./config/db');
 
let blog = require('./routers/blog')
let user = require('./routers/user')
const app = express() 

app.use(express.json())
app.use(cookieParser())
app.use(blog);
app.use(user);

app.listen(5000, () => {
    console.log("Running at the port 5000");
})
