const mongoose = require('mongoose')
const Schema = mongoose.Schema


const blog = new Schema ({
    blog : String ,
    headline: String ,
    author: String ,
    image: String,
    createdAt: {
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('blogs' , blog)