var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userData = mongoose.model('UserData');
require('dotenv').config({});



router.get('/', function (req, res) {
    res.render('signup', {
        errors: req.session.errors,
        userTaken: req.session.userTaken
    });
    req.session.userTaken = null;
    req.session.errors = null;
});

router.post('/insert', function (req, res) {
    var genderMale = true;
    var preferMale = true;
    // converting date of birth to a zodiac sign
    var zodiacSign = zodiac(req.body.DoB);
    var errors = req.validationErrors();
    // template to store in the db
    var items = {
        username: req.body.username,
        profilePicture: "images/capricorn.png",
        password: req.body.password,
        premium: false,
        pushNotification: true,
        aboutme: "I dont have a about me yet",
        function: "",
        company: "",
        city: "",
        email: req.body.email,
        DoB: req.body.DoB,
        maxDistance: 5,
        minAge: 18,
        maxAge: 18,
        isMale: genderMale,
        prefMen: preferMale,
        zodiac: zodiacSign
    };

    if (req.body.gender == "male") {
        genderMale = true;
    } else {
        genderMale = false;
    }

    if (req.body.prefGender == "male") {
        preferMale = true;
    } else {
        preferMale = false;
    }

    // Checking if the passwords and email are valid
    req.check('email', 'This email adress is not valid').isEmail();
    req.check('password', 'Password should be longer then 6 characters', 'Passwords dont match').isLength({
        min: 6
    }).equals(req.body.confPassword);

    if (errors) {
        req.session.errors = errors;
    }
    userData.find({
        username: req.body.username
    }, function (err, doc) {
        var data = new userData(items);
        if (doc.length) {
            // Username was already taken
            req.session.userTaken = true;
            res.redirect('/signup');

        } else {
            req.session.userTaken = false;
            req.session.loggedin = req.body.username;
            data.save();
            res.redirect('/login');
        }
    });
    // });


    // console.log(items);
});




//takes the date in the year-month-day format and returns the corrosponding zodiac in a string
function zodiac(date) {
    var ymd = date.split("-");
    // var year = ymd[0];
    var month = ymd[1];
    var day = ymd[2];


    //  I was too lazy to write this if else chain myself... Source https://gist.github.com/kladov/5080233
    if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
        return "capricorn";
    } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
        return "aquarius";
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
        return "pisces";
    } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
        return "aries";
    } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
        return "taurus";
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
        return "gemini";
    } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
        return "cancer";
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
        return "leo";
    } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
        return "virgo";
    } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
        return "libra";
    } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
        return "scorpio";
    } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
        return "sagittarius";
    }
}

module.exports = router;