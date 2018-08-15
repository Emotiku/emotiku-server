var express = require('express');
var router = express.Router();
var {uploadImage} = require('../controllers/image')
var images = require('../helpers/images')



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',images.multer.single('image'),images.sendUploadToGCS,uploadImage)

module.exports = router;