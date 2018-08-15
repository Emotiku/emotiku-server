var express = require('express');
var router = express.Router();
var {uploadImage,deleteImage, getImage, getImageById} = require('../controllers/image')
var images = require('../helpers/images')
var { userAuth } = require('../middlewares/auth')



/* GET users listing. */
router.get('/', userAuth, getImage)
router.get('/:id',userAuth, getImageById)
router.post('/', userAuth, images.multer.single('image'),images.sendUploadToGCS,uploadImage)
router.delete('/:id', userAuth, deleteImage)

module.exports = router;