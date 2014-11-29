var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer')

var routes = require('./routes/index');
var upload = require('./routes/upload');

var app = express();

global.__appBaseDir = __dirname;

app.use(multer({
  dest: './uploads/',
  onFileUploadStart: function (file) {
    console.log(file.fieldname + ' is starting ...');
  },
  onFileUploadComplete: function (file){
    console.log(file.fieldname + ' upload completed ...!');
  },
  inMemory: true,
  rename: function (fieldname, filename) {
    return filename + '_IMCII'
  }
}))
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('appName', 'IMCII');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/upload', upload);

// error handlers

app.use(function(err, req, res, next) {        
    res.render('error', {
        message: err.message,
        error: err
    });
});


var server = app.listen(process.env.PORT || 9001, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(app.get('appName') + ' Image processing server listening at http://%s:%s', host, port)
});


module.exports = app;
