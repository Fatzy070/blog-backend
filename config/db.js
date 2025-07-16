const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async(req , res) => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to mongoDB successfully')
    }catch(error){
        console.error('cannot connect'  , error)
        process.exit(1)
    }
}

module.exports = connectDB