const Model = require('../models/image')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {emotionDetect} = require('../helpers/vision')

const uploadImage = function (req, res) {
    try {
        const token = req.headers.token
        let decoded = jwt.verify(token, process.env.JWT_KEY)
        emotionDetect(req.file.cloudStoragePublicUrl)
            .then(emotion => {
                Model.create({
                    user: decoded.id,
                    url: req.file.cloudStoragePublicUrl,
                    emotion: emotion.emotion,
                    numberFaces: emotion.numberFaces
                }, (err, result) => {
                    if (err) {
                        res.status(500)
                        res.json({
                            error: 'error save image url to database'
                        })
                    } else {
                        res.status(200)
                        res.json({
                            message: "photo successfully saved to database",
                            data: result
                        })
                    }
                })
            })
            .catch(err => {
                res.status(500)
                    res.json({
                        error: err
                    })
            })
    } catch (err) {
        res.status(400)
            .json({
                message: "token invalid"
            })
    }
}

const deleteImage = function (req, res) {
    Model.remove({
            _id: req.params.id
        })
        .then(function () {
            res.status(200).json({
                message: 'delete image success'
            })
        })
        .catch(function (err) {
            res.status(500).json({
                message: 'delete image failed'
            })
        })

}

const getImage = (req, res) => {
    try {
        const token = req.headers.token
        let decoded = jwt.verify(token, process.env.JWT_KEY)
        let query = {
            user: decoded.id
        }
        Model.find(query)
            .then(img => {
                res.status(200)
                res.json({
                    message: "successfully get photos",
                    data: img
                })
            })
            .catch(err => {
                res.status(500)
                res.json({
                    error: 'error getting photos'
                })
            })
    } catch (err) {
        res.status(400)
            .json({
                message: "token invalid"
            })
    }
}

const getImageById = (req, res) => {
    try {
        const token = req.headers.token
        let decoded = jwt.verify(token, process.env.JWT_KEY)
        let query = {
            user: decoded.id,
            _id: req.params.id
        }
        Model.find(query)
            .then(img => {
                res.status(200)
                res.json({
                    message: "successfully get photo",
                    data: img
                })
            })
            .catch(err => {
                res.status(500)
                res.json({
                    error: 'error getting photo'
                })
            })
    } catch (err) {
        res.status(400)
            .json({
                message: "token invalid"
            })
    }
}


module.exports = {
    uploadImage,
    deleteImage,
    getImage,
    getImageById
}