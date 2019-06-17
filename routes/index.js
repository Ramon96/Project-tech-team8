// import dependencies
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
// define schema
var userDataSchema = new Schema({
    username: String,
    password: String,
    profilePicture: String,
    premium: Boolean,
    aboutme: String,
    function: String,
    company: String,
    city: String,
    isMale: Boolean,
    prefMen: Boolean,
    email: String,
    DoB: String,
    minAge: Number,
    maxAge: Number,
    maxDistance: Number,
    pushNotification: Boolean,
    zodiac: String
}, {
    collection: 'user-data'
});
require('dotenv').config({});



userDataSchema.pre('save', function (next) {
    var user = this;

    if(!user.isModified('password')) {
        return next();
    }

    this.hashPass(user.password, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        console.log("nice!" + user);

        next();
    });
});

userDataSchema.methods.hashPass = function (givenPassword, cb) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return cb(err);
        }
        bcrypt.hash(givenPassword, salt, function (err, hashedPassword) {
            if (err) {
                return cb(err);
            }
            return cb(null, hashedPassword);
        });
    });
};

// assign mongoose data schema to var userdata
//eslint-disable-next-line
var userData = mongoose.model('UserData', userDataSchema);

// Local databse
// mongoose.connect(process.env.DB_LOCAL, {
//     useNewUrlParser: true
// });

// Deployed database
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});

// Logs a message when succesfully connected to the database
mongoose.connection.on('connected', function () {
    console.log("Connected to mongoose..");
});

// Getting the ladingpage
router.get('/', function (req, res) {
    res.render('landing', {
        headerless: true
    });
});

// Get test area page
router.get('/testarea', function (req, res) {
    res.render('testarea');
});

// Retrieve all entry's  from database
router.get('/testarea/get-data', function (req, res) {
    userData.find()
        .then(function (doc) {
            res.render('testarea', {
                items: doc
            });
        });
});

// insert into database
router.post('/testarea/insert', function (req, res) {
    var item = {
        username: req.body.username,
        profilePicture: req.body.profilePicture,
        premium: req.body.premium,
        pushNotification: req.body.pushNotification,
        aboutme: req.body.aboutme,
        function: req.body.function,
        company: req.body.company,
        city: req.body.city,
        email: req.body.email,
        DoB: req.body.DoB,
        maxDistance: req.body.maxDistance,
        minAge: req.body.minAge,
        maxAge: req.body.maxAge,
        isMale: req.body.isMale,
        prefMen: req.body.prefMen
    };
    var data = new userData(item);
    data.save();
    res.redirect('/testarea');
});

// update database entry of given id
router.post('/testarea/update', function (req, res) {
    var chosenId = req.body.chosenId;
    userData.findById(chosenId, function (err, doc) {
        if (err) {
            console.error('entry not found');
        }
        doc.username = req.body.username;
        doc.profilePicture = req.body.profilePicture;
        doc.premium = req.body.premium;
        doc.pushNotification = req.body.pushNotification;
        doc.aboutme = req.body.aboutme;
        doc.function = req.body.function;
        doc.company = req.body.company;
        doc.city = req.body.city;
        doc.email = req.body.email;
        doc.DoB = req.body.DoB;
        doc.maxDistance = req.body.maxDistance;
        doc.minAge = req.body.minAge;
        doc.maxAge = req.body.maxAge;
        doc.isMale = req.body.isMale;
        doc.prefMen = req.body.prefMen;
        doc.save();
    });
    res.redirect('/testarea');

});

// Delete database entry of given ID
router.post('/testarea/delete', function (req, res) {
    var chosenId = req.body.chosenId;
    userData.findByIdAndRemove(chosenId).exec();
    res.redirect('/testarea');
});

module.exports = router;