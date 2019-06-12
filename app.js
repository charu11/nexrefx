var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
//var io = SocketIo.listen(server)
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb  = require('mongodb');
var nodemailer = require('nodemailer');
var http = require('http');server
var https = require('https');
var fs = require('fs');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const smpp = require('smpp');
// const session = new smpp.Session({host: '119.235.5.234', port: 5019});
const fileUpload = require('express-fileupload');





//routers
//var index = require('./routes/index');
var user = require('./routes/user');
var superAdmin = require('./routes/superAdmin');
var company = require('./routes/company');
var task = require('./routes/task');
var category = require('./routes/category');
var taskType = require('./routes/taskType');
var userTask = require('./routes/userTask');
// var sms = require('./routes/sms');
// var otp = require('./routes/otp');

//Models
var User = require('./models/user');
var Company = require('./models/company');
var SuperAdmin = require('./models/superAdmin');
var Task = require('./models/task');
var Category = require('./models/category');
var TaskType = require('./models/taskType');
var UserTask = require('./models/userTask');
// var SMS = require('./models/sms');
// var OTP = require('./models/otp');

var jsonwebtoken = require('jsonwebtoken');
var app = express();
app.use(fileUpload());
var cors = require('cors');
app.use(cors());var http = require('http');
app.use(express.static('/public'));
app.use('/public', express.static('/public'));


var portSelected = 8281;
var dbe = 'mongodb://localhost/project';
 app.listen(portSelected, function() {
  console.log('Nexgen Nexzent-core API App listening on port ' + portSelected);

});



mongoose.connect(dbe);
// mongoose.connect(uri);
mongoose.connection.once('open', function(){
  console.log('connection has made');
}).on('error', function(error){
  console.log('connection error', error);
})


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// view engine setup
//app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(morgan('Nexzent-core-log'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//Token middleware
app.use(function(req, res, next){
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'nexrefx_api'){
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode){
      if(err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});


/* Routes */
//app.use('/', index);
app.use('/user', user);
app.use('/superAdmin', superAdmin);
app.use('/company', company);
app.use('/task', task);
app.use('/category', category);
app.use('/taskType', taskType);
app.use('/userTask', userTask);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
next(err);
});

//enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
 // res.render('error');
});

module.exports = app;
