var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kiibou\'s Website' });
});

router.get('/binary', (req, res, next) => {
  res.render('binary', {} );
});

module.exports = router;
