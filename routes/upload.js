var express = require('express');
var router = express.Router();
var image = require('../custom_modules/imageToAscii');

router.post('/image', function (req, res) {
  var file = req.files.file;
  image.convertToASCII(file.buffer, file.name, file.colored, file.height, file.width, function (asciiBuffer) {
    res.status(200).end(asciiBuffer);
  });
});

module.exports = router;