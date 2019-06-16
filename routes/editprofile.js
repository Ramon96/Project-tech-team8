// import dependencies
var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var mongoose = require('mongoose');
// assign mongoose data schema to var userdata
var userData = mongoose.model('UserData');
require('dotenv').config({});


/* GET home page. */
router.get('/', function (req, res) {
    if(!req.session.loggedin){
        console.log("Session bestaat nog niet");
        req.session.errormessage = "You need to login first";
        return res.redirect('/login');
    }
    userData.findOne({username: req.session.loggedin})
        .then(function (doc) {
            res.render('index', {
                title: doc.username + "'s profile",
                Username: doc.username,
                UserProfile: doc.profilePicture,
                aboutme: doc.aboutme,
                premium: doc.premium,
                zodiac: doc.zodiac
            });
        });
});

// process uploads
router.post('/upload', function (req, res) {
    uploadImage(req, res, (error) => {
        if (error) {
            res.render('index', {
                message: error
            });
        } else {
            if (req.file == undefined) {
                res.render('index', {
                    message: 'No file selected.'
                });
            } else {
                userData.findOne({username: req.session.loggedin})
                    .then(function (doc) {
                        res.render('index', {
                            message: 'Image uploaded.',
                            UserProfile: `/uploads/${req.file.filename}`,
                            title: doc.username + "'s profile",
                            Username: doc.username,
                            aboutme: doc.aboutme,
                            premium: doc.premium,
                            zodiac: doc.zodiac
                        });
                        doc.profilePicture = `/uploads/${req.file.filename}`;
                        doc.save();
                    });
            }
        }
    });
});

// Get edit profile page
router.get('/editprofile', function (req, res) {
    if(!req.session.loggedin){
        console.log("Session bestaat nog niet");
        req.session.errormessage = "You need to login first";
        return res.redirect('/login');
    }
    userData.findOne({username: req.session.loggedin})
        .then(function (doc) {
            res.render('editprofile', {
                aboutme: doc.aboutme,
                function: doc.function,
                company: doc.company,
                city: doc.city,
                isMale: doc.isMale
            });
        });
});

// Change changed values in database
router.post('/editprofile/update', function (req, res) {
    userData.findOne({username: req.session.loggedin}).then(function (doc) {
        doc.aboutme = req.body.aboutme;
        doc.function = req.body.function;
        doc.company = req.body.company;
        doc.city = req.body.city;
        if (req.body.gender == "male") {
            doc.isMale = true;
        } else {
            doc.isMale = false;
        }
        doc.save();
    });
    return res.redirect('/edit/editprofile');
});

// Get settings page
router.get('/settings', function (req, res) {
    if(!req.session.loggedin){
        console.log("Session bestaat nog niet");
        req.session.errormessage = "You need to login first";
        return res.redirect('/login');
    }
    userData.findOne({username: req.session.loggedin})
        .then(function (doc) {
            res.render('settings', {
                email: doc.email,
                dob: doc.DoB,
                maxDistance: doc.maxDistance,
                minAge: doc.minAge,
                maxAge: doc.maxAge,
                prefMen: doc.prefMen,
                username: doc.username,
                pushNotification: doc.pushNotification
            });
        });
});

// Change settings values in database
router.post('/settings/update', function (req, res) {
    var zodiacSign = zodiac(req.body.DoB);
    userData.findOne({username: req.session.loggedin}).then(function (doc) {
        doc.email = req.body.email;
        doc.DoB = req.body.DoB;
        doc.maxDistance = req.body.maxDistance;
        doc.minAge = req.body.minAge;
        doc.maxAge = req.body.maxAge;
        doc.zodiac = zodiacSign;
        if (req.body.gender == "male") {
            doc.prefMen = true;
        } else {
            doc.prefMen = false;
        }
        doc.username = req.body.username;
        if (req.body.pushNotification == "pushOn") {
            doc.pushNotification = true;
        } else {
            doc.pushNotification = false;
        }
        doc.save();
    });
    req.session.loggedin = req.body.username;
    console.log(req.session.loggedin);
    return res.redirect('/edit/settings');
});

// check file type
function checkFileExt(file, callback) {
    const fileExt = /jpeg|jpg|png|gif/;
    const extName = fileExt.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileExt.test(file.mimetype);

    if (mimeType && extName) {
        return callback(null, true);
    } else {
        callback('File is not a image');
    }
}

// store uploaded image
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// process image
const uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, callback) {
        checkFileExt(file, callback);
    }
}).single('profileImage');


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