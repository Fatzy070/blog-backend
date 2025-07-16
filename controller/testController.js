const Blog = require('../model/blogSchema')

const test = async (req , res) => {
    try {
        let blogs = await Blog.find()
        res.status(200).json(blogs)
    }catch(err) {
        res.status(500).json({ message: 'error fetching blogs' , error: err.message })
    }
}

const createBlog = async (req, res) => {
  try {
    const { blog, headline, author } = req.body
    const image = req.file ? req.file.filename : ''

    const newBlog = new Blog({
      blog,
      headline,
      author,
      image
    })

    await newBlog.save()
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog })
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog', error: err.message })
  }
}

const deleteBlog = async(req , res) => {
  try {
    const { id } = req.params
    await Blog.findByIdAndDelete(id)
    res.status(200).json({ message: 'blog deleted successfully' })
  }catch(error){
    res.status(500).json({ message: ' error deleting Blog' , error: error.message})
  }
}

module.exports = { test, createBlog , deleteBlog }
