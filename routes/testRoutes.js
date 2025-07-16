const express = require('express')
const router = express.Router()
const { test, createBlog , deleteBlog} = require('../controller/testController')
const upload = require('../middleware/multerupload')

router.get('/blogs' , test)
router.post('/blogs', upload.single('image'), createBlog)
router.delete('/blogs/:id' , deleteBlog)


 module.exports = router