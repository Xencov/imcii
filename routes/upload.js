var express = require('express');
var router = express.Router();

router.post('/image', function(req, res){  
  //Todo do the external image processing and send the buffer to the client
  
  res.status(200).end(req.files.file.buffer.toString('base64'));
});

module.exports = router;



var ImageToAscii = require("image-to-ascii");

var imcii = new ImageToAscii({
    resize: {
        height: "100%",
        width: "50%"
    },
    multiplyWidth: 1,
    colored: true
});

imcii.convert(__dirname + "/nodeconfin.png", function(err, converted) {
    console.log(err || converted);
});