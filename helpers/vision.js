require('dotenv').config()
const vision = require('@google-cloud/vision')
const client = new vision.ImageAnnotatorClient()

const emotionDetect = function (imgURL) {
  return new Promise(function (resolve, reject) {
    client
      .faceDetection(img.url)
      .then(results => {
        const faces = results[0].faceAnnotations;
        let numberFaces = faces.length;
        let emotion = ""
        faces.forEach((face) => {
          if (face.joyLikelihood == "VERY_LIKELY" || face.joyLikelihood == "LIKELY") {
            emotion = "Joy"
          }
          if (face.angerLikelihood == "VERY_LIKELY" || face.angerLikelihood == "LIKELY") {
            emotion = "Anger"
          }
          if (face.sorrowLikelihood == "VERY_LIKELY" || face.sorrowLikelihood == "LIKELY") {
            emotion = "Sorrow"
          }
          if (face.surpriseLikelihood == "VERY_LIKELY" || face.surpriseLikelihood == "LIKELY") {
            emotion = "Surprise"
          }
        })
        resolve(emotion)
      })
      .catch(err => {
        reject("Unable detect emotion")
      });
  })
}

module.exports = emotionDetect