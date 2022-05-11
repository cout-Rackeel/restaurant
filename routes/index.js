var express = require('express');
var router = express.Router();
var connection = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express',  stylesheet: '/stylesheets/index.css'});
});

module.exports = router;
