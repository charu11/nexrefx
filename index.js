var express = require('express');
var router = express.Router();
var expressLayouts = require('express-ejs-layouts');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var Socketdb = require('./models/socketdb');
var userTask = require('./models/userTask');
var AdminSocketdb = require('./models/adminSocketdb');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb  = require('mongodb');
var nodemailer = require('nodemailer');
var https = require('https');
var fs = require('fs');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const smpp = require('smpp');
// const session = new smpp.Session({host: '119.235.5.234', port: 5019});
const fileUpload = require('express-fileupload');
var request = require('request');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



http.listen(8282, function(){
  console.log('listening on port 8282');

});



  var dbe = 'mongodb://localhost/project';
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
  
  router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
 

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html')
});
 

     io.on('connection', function(socket){
  console.log('socket connection has made', socket.id);
 
  
  
       //.....................user connection..................

  socket.on('user details', function(data, socketId){
    console.log('message', data );
      
     Socketdb.findOne({'socketId': socket.id})
     .exec(function(err, userData){
       console.log('registering the socket');
       if(err){
        console.log('error occured');
        console.log(err);

       }else{
        if(userData !== null){
         console.log('.........................failed.............................');
        // res.json({message: 'failed', details: 'userIduserIduser adding failed' });
       }else{
      
        var socketdb = new Socketdb();
        socketdb.socketId = socket.id;

        socketdb.save(function(err){
          if(err){
            console.log('something is wrong');
            console.log(err);
            //res.json({message: 'register failed', details: 'user adding unsuccessful', content: userData});
          }else{
           // res.json({message: 'success', details: 'userData added successful', content: userData})
            console.log('user success');
            io.emit('user details', data);
           
          }
        });

       }
       }
     
     });
   
    });  
    
    
    //..................user reconnect....................
    
    socket.on('user-reconnected', function (username) {
      console.log(username + ' just reconnected');
 });
 



    //....................... user disconncetion.......................

     socket.on('disconnect', function(){
      console.log('user disconnected');
      
      var socketId = socket.id;

      Socketdb.findOne({'socketId': socket.id})
      .exec(function(err, userDetails){
        if(err){
          console.log('error occured', err);

        }else{
          if(socketId == socket.id){
            Socketdb.remove(function(err, result){
              if(err){
                console.log('error occured, something wrong', err);
              }else{
                console.log('success the user has been deleted');
              }
            })
          }
        }
      });

      //.....................set user task on socket.....................

      socket.on('task', function(data){
        console.log(data);

        router.post('http://localhost:8281/userTask/updateUserTask' );
      });s

    });




});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
next(err);
});

   //enable CORS
  



  
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