var express = require('express');
var router = express.Router();
var {uploadImage,deleteImage, getCurrentUserImage, getImageById, getImageByUserName, getAllUserImage} = require('../controllers/image')
var images = require('../helpers/images')
var { userAuth } = require('../middlewares/auth')



/* GET users listing. */
router.get('/', userAuth, getCurrentUserImage)
router.get('/id/:id',userAuth, getImageById)
router.post('/', userAuth, images.multer.single('image'),images.sendUploadToGCS,uploadImage)
router.delete('/:id', userAuth, deleteImage)
router.get('/user/', userAuth, getImageByUserName)
router.get('/alluser', userAuth, getAllUserImage)

module.exports = router;