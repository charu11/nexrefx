var express = require('express');
var router = express.Router();
var cors = require('cors');


router.use(cors());


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("index")
  res.render('index', { title: 'NexgenITs - Experience Beyond The Imagination' });
});

module.exports = router;
