const express = require('express')
const router = express.Router()
const { test, createBlog , deleteBlog} = require('../controller/testController')
const upload = require('../middleware/multerupload')
const protect = require('../middleware/authware')

router.get('/blogs' , test)
router.post('/blogs',protect ,  upload.single('image'), createBlog)
router.delete('/blogs/:id', protect , deleteBlog)


 module.exports = router