const Model = require('../models/image')

const uploadImage = function (req, res) {
    let emotion = 'test emotion'
    let user = 'test user'
    Model.create(
        {
            url:req.file.cloudStoragePublicUrl,
            emotion:emotion
        }
    )
    res.send({
        status: 200,
        message: 'Your file is successfully uploaded',
        link: req.file.cloudStoragePublicUrl
    })
}

const deleteImage = function(req,res){
    Model.remove(
        {
            _id:req.params.id
        }
    )
    .then(function () {
        res.status(200).json({ msg: 'delete image success' })
    })
    .catch(function (err) {
        res.status(500).json({ msg: 'delete image failed' })
    })

}


module.exports = {uploadImage,deleteImage}