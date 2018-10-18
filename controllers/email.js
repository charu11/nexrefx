var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rakshitha.m.rodrigo@gmail.com',
    pass: 'pathfinderrover11b'
  },
  tls:{
    rejectUnauthorized: false
  }
});

var mailOptions = {
  from: 'rakshitha.m.rodrigo@gmail.com',
  to: 'pathfinder.rover11b@gmail.com',
  subject: 'neXgenITs : Experience Beyond the Imagination',
  text: 'Hi, we glad you are with the neXgenITs'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
