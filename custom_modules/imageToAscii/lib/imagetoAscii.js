var ImageToAscii = require("image-to-ascii");
var size = require('image-size');
var Png = require('png');
var PNG = require('pngjs').PNG;
var fs = require('fs');
var Ascii = require('ascii');
var Canvas = require('canvas');

var Image = {
  public: {
    convertToASCII: function (image, name, colored, height, width, callback) {
      if (!image) {
        return callback(new Error('No Image Data'));
      }
      var imageBuffer = Image.public.getPNGImageBuffer(image);
      var tmpPath = Image.private.writeImageBufferToDisk(imageBuffer, name);
      var picture = new Ascii(tmpPath);
      picture.convert(function (err, ascii) {
        var convertedBuffer = Image.private.getImageFromASCIIString(ascii, imageBuffer);
        callback(convertedBuffer);
        fs.unlink(tmpPath);
      })
    },
    getSize: function (image) {
      return size(image);
    },
    getPNGImageBuffer: function (image) {
      var buffer = null;
      if (typeof image === 'string') {
        buffer = fs.readFileSync(image);
      }
      buffer = image;
      var info = Image.public.getSize(buffer);
      if (info.type != 'png') {
        return Image.private.convertToPNG(buffer, info.width, info.height);
      }
      return buffer;
    }
  },
  private: {
    getImageToAsciiObject: function (colored, height, width) {
      return new ImageToAscii({
        resize: {
          height: height || "100%",
          width: width || "50%"
        },
        multiplyWidth: 1,
        colored: colored || true
      });
    },
    getImageFromASCIIString: function (asciiString, imageBuffer) {
      console.log(asciiString);
      var info = Image.public.getSize(imageBuffer);
      var canvas = new Canvas(info.width, info.height),
        ctx = canvas.getContext('2d');
      ctx.fillStyle = "#000000";
      return Image.private.wrapText(ctx, asciiString, 1, 10, info.width, 12, canvas);
    },
    convertToPNG: function (imageBuffer, width, height) {
      var png = new Png(imageBuffer, width, height, 'rgb');
      return png.encodeSync();
    },
    writeImageBufferToDisk: function (imageBuffer, name) {
      var fileURL = __appBaseDir + '/uploads/' + name + +new Date() + '.png';
      var wstream = fs.createWriteStream(fileURL);
      wstream.write(imageBuffer);
      wstream.end();
      return fileURL;
    },
    wrapText: function (context, text, x, y, maxWidth, lineHeight, canvas) {
      var words = text.split('\n');
      var line = '';
      for (var n = 0; n < words.length; n++) {
        line = words[n].replace(/(\!)|(\s)|(\;)/ig, function(match){
          return match + ' ';
        });
        context.fillText(line, x, y);
        y += lineHeight;
      }
      return canvas.toDataURL();
    }
  }
};


module.exports = Image.public;


