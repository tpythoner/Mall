var express = require('express');
//var auth = require('./middlewares/auth');
var router = express.Router();
var index = require('./controllers/index');


router.get('/', index.index);

router.get('/update', index.update);

module.exports = router;
