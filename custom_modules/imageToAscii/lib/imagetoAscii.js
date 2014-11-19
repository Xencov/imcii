var ImageToAscii = require("image-to-ascii");

var Image = {
  public: {
    convertToASCII: function(image, colored, height, width, callback) {
      if(!image){
        return callback(new Error('No Image Data'));
      }
      var imcii = Image.private.getImageToAsciiObject();
      imcii.convert(__dirname + "/nodeconfin.png", function(err, converted) {
        console.log(err || converted);
      });
    }
  },
  private: {
    getImageToAsciiObject: function(colored, height, width){
      return new ImageToAscii({
        resize: {
            height: height || "100%",
            width: width || "50%"
        },
        multiplyWidth: 1,
        colored: colored || true
      });
    }
  }  
}





