const express = require('express')
const server = express()
const PORT = process.env.PORT || 3000
const connectDB = require('./config/db')
const cors = require('cors')
require('dotenv').config();

connectDB()
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use('/images', express.static('public/images'))
server.use(cors())


server.use('/auth', require('./routes/authRoutes'));
server.use('/' , require('./routes/testRoutes'))

server.listen(PORT , ()=> 
    console.log('server is running on port' + " " +  PORT)
)