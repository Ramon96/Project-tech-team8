var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('match', {message: "hello"});
});

module.exports = router;
