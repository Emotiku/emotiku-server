require('dotenv').config()
const vision = require('@google-cloud/vision')
const client = new vision.ImageAnnotatorClient()

const emotionDetect = function (imgURL) {
  return new Promise(function (resolve, reject) {
    client
      .faceDetection(imgURL)
      .then(results => {
        const faces = results[0].faceAnnotations;
        let numberFaces = faces.length;
        let emotion = "Maaf Muka Ga Jelas"
        console.log(faces)
        faces.forEach((face) => {
          if (face.joyLikelihood == "VERY_LIKELY" || face.joyLikelihood == "LIKELY" || face.joyLikelihood == "POSSIBLE") {
            emotion = "Joy"
          }
          if (face.angerLikelihood == "VERY_LIKELY" || face.angerLikelihood == "LIKELY" || face.angerLikelihood == "POSSIBLE") {
            emotion = "Anger"
          }
          if (face.sorrowLikelihood == "VERY_LIKELY" || face.sorrowLikelihood == "LIKELY" || face.sorrowLikelihood == "POSSIBLE") {
            emotion = "Sorrow"
          }
          if (face.surpriseLikelihood == "VERY_LIKELY" || face.surpriseLikelihood == "LIKELY" || face.surpriseLikelihood == "POSSIBLE") {
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

module.exports = {emotionDetect}