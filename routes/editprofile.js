// import dependencies
var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var mongoose = require('mongoose');
require('dotenv').config({});

var id = process.env.USER_ID;

// assign mongoose data schema to var userdata
var userData = mongoose.model('UserData');

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


// Database connection
// Local database
mongoose.connect(process.env.DB_LOCAL, {
    useNewUrlParser: true
});

// Deployed database
// mongoose.connect(process.env.DB_URL, {
//     useNewUrlParser: true
//   });

/* GET home page. */
router.get('/', function (req, res, next) {
    userData.findById(id)
        .then(function (doc) {
            res.render('index', {
                title: doc.username + "'s profile",
                Username: doc.username,
                UserProfile: doc.profilePicture,
                aboutme: doc.aboutme,
                premium: doc.premium
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
                userData.findById(id)
                    .then(function (doc) {
                        res.render('index', {
                            message: 'Image uploaded.',
                            UserProfile: `/uploads/${req.file.filename}`,
                            title: doc.username + "'s profile",
                            Username: doc.username,
                            aboutme: doc.aboutme,
                            premium: doc.premium
                        });
                        doc.profilePicture = `/uploads/${req.file.filename}`;
                        doc.save();
                    });
            }
        }
    });
});

// Get edit profile page
router.get('/editprofile', function (req, res, next) {
    userData.findById(id)
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
router.post('/editprofile/update', function (req, res, next) {
    userData.findById(id, function (err, doc) {
        if (err) {
            console.error('entry not found');
        }
        doc.aboutme = req.body.aboutme;
        doc.function = req.body.function;
        doc.company = req.body.company;
        doc.city = req.body.city;
        if (req.body.gender == "male") {
            doc.isMale = true;
        } else {
            doc.isMale = false;
        }
        console.log("yoooo");

        doc.save();
    });
    res.redirect('/edit/editprofile');
});

// Get settings page
router.get('/settings', function (req, res) {
    userData.findById(id)
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
    userData.findByIdss(id, function (err, doc) {
        if (err) {
            console.error('entry not found');
        }
        doc.email = req.body.email;
        doc.DoB = req.body.DoB;
        doc.maxDistance = req.body.maxDistance;
        doc.minAge = req.body.minAge;
        doc.maxAge = req.body.maxAge;
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
    res.redirect('/edit/settings')
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

module.exports = router;