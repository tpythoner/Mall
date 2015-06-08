var express = require('express');
//var auth = require('./middlewares/auth');
var router = express.Router();
var index = require('./controllers/index');
var users = require('./controllers/users');


//Index
router.get('/', index.index);
router.get('/update/:opt', index.update);

//User
router.get('/users/:name', users.index);

module.exports = router;
