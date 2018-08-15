// const Model = require('../models/image')

const uploadImage = function (req, res) {
    // Model.create(
    //     {

    //     }
    // )
    res.send({
        status: 200,
        message: 'Your file is successfully uploaded',
        link: req.file.cloudStoragePublicUrl
    })
}


module.exports = {uploadImage}