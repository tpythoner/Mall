var express = require('express');
//var auth = require('./middlewares/auth');
var router = express.Router();
var index = require('./controllers/index');


//Index
router.get('/', index.index);
router.get('/update/:opt', index.update);

module.exports = router;
