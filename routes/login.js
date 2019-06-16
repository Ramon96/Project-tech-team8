var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userData = mongoose.model('UserData');


router.get('/', function (req, res) {
    res.render('login', {
        error: req.session.errormessage
    });
    req.session.errormessage = null;
});

router.post('/check', function (req, res) {
    userData.findOne({
        username: req.body.username
    }, function (err, doc) {
        if (doc.length == 0) {
            //username doesnt exist
            req.session.errormessage = "Invalid username";
            res.redirect('/login');
        } else {
            bcrypt.compare(req.body.password, doc.password)
                .then(function (isMatch) {
                    if (!isMatch) {
                        req.session.errormessage = "Invalid password";
                        res.redirect('/login');
                    }
                    console.log("matched");
                    req.session.loggedin = doc.username;
                }).finally(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    req.session.loggedin = doc.username;
                    //must become redirect to edit (or matching if that gets done)
                    res.redirect('/edit');
                })
                .catch(function (err) {
                    return console.log(err);
                });
        }

    });
    // res.redirect('/login');

});

module.exports = router;