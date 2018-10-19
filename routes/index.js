var express = require('express');
var router = express.Router();
var cors = require('cors');
var http = require('http');
var url = require('url');
var fs = require('fs');

router.use(cors());


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("index")
  res.render('index.html', { title: 'NexgenITs - Experience Beyond The Imagination' });
});

module.exports = router;
