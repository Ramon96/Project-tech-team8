var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/.env'}); //???

mongoose.connect('mongodb://localhost:27018/test', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var id = "5cf4ef61c07e76b19c8adb52";

var userDataSchema = new Schema({
  username: String,
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
  pushNotification: Boolean
}, {collection: 'user-data'});

var userData = mongoose.model('UserData', userDataSchema);

/* GET home page. */
router.get('/', function (req, res, next) {
  userData.findById(id)
  .then(function(doc){
    res.render('index', {
      title: doc.username + "'s profile",
      Username: doc.username,
      UserProfile: doc.profilePicture,
      aboutme: doc.aboutme,
      premium: doc.premium
    });
  });
});

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: function (req, file, callback) {
    checkFileExt(file, callback);
  }
}).single('profileImage');

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
        res.render('index', {
          message: 'Image uploaded.',
          UserProfile: `uploads/${req.file.filename}`
        });
      }
      userData.findById(id, function(err, doc){
        if(err){
          console.error('entry not found');
        }
        doc.profilePicture =`uploads/${req.file.filename}`;
        doc.save();
      });
    }
  })
});

router.get('/editprofile', function (req, res, next) {
  userData.findById(id)
  .then(function(doc){
    res.render('editprofile', {
      aboutme: doc.aboutme,
      function: doc.function,
      company: doc.company,
      city: doc.city,
      isMale: doc.isMale
    });
  });


});

router.post('/editprofile/update', function (req, res, next) {
  userData.findById(id, function(err, doc){
    if (err){
      console.error('entry not found');
    }
    doc.aboutme = req.body.aboutme;
    doc.function = req.body.function;
    doc.company = req.body.company;
    doc.city = req.body.city;
    if(req.body.gender == "male"){
      doc.isMale = true;
    }
    else{
      doc.isMale = false;
    }
    doc.save();
  });
  res.redirect('/editprofile');
});


router.get('/settings', function (req, res) {
  userData.findById(id)
  .then(function(doc){
    res.render('settings', {
      email: doc.email,
      dob: doc.DoB,
      maxDistance: doc.maxDistance,
      minAge: doc.minAge,
      maxAge: doc.maxAge,
      prefMen: doc.prefMen,
      username: doc.username,
      pushNotification: doc.pushNotification,
      errors: req.session.errors,
      succes: req.session.succes
    });
    req.session.errors = null;
    req.session.succes = null;

  });
});

router.post('/settings/update', function (req, res) {
  req.check("email", "Email adress is not valid").isEmail();
  var errors = req.validationErrors();
  if (errors){
    req.session.errors = errors;
    req.session.succes = false;
  }
  else{
    req.session.succes = true;
  }
  userData.findById(id, function(err, doc){
    if (err){
      console.error('entry not found');
    }
    doc.email = req.body.email;
    doc.DoB = req.body.DoB;
    doc.maxDistance = req.body.maxDistance;
    doc.minAge = req.body.minAge;
    doc.maxAge = req.body.maxAge;
    if(req.body.gender == "male"){
      doc.prefMen = true;
    }
    else{
      doc.prefMen = false;
    }
    doc.username = req.body.username;
    if(req.body.pushNotification == "pushOn"){
      doc.pushNotification = true;
    }
    else{
      doc.pushNotification = false;
    }
    if(!errors){
    doc.save();
    }
  });

  res.redirect('/settings')
});

router.get('/testarea', function(req, res){
  res.render('testarea');
});

router.get('/testarea/get-data', function(req, res){
  userData.find()
    .then(function(doc){
      res.render('testarea', {items: doc});
    });
});

  router.post('/testarea/insert', function(req, res){
      var item = {
        username: req.body.username,
        profilePicture: req.body.profilePicture,
        premium: req.body.premium,
        pushNotification: req.body.pushNotification,
        aboutme: req.body.aboutme,
        function: req.body.function,
        company:req.body.company,
        city: req.body.city,
        email: req.body.email,
        DoB: req.body.DoB,
        maxDistance: req.body.maxDistance,
        minAge: req.body.minAge,
        maxAge: req.body.maxAge,
        isMale: req.body.isMale,
        prefMen: req.body.prefMen
      }
      var data = new userData(item);
      data.save();
      res.redirect('/testarea');
  });

  router.post('/testarea/update', function(req, res){
    var chosenId = req.body.chosenId;
    userData.findById(chosenId, function(err, doc){
      if (err){
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
  
  router.post('/testarea/delete', function(req, res){
    var chosenId = req.body.chosenId;
    userData.findByIdAndRemove(chosenId).exec();
    res.redirect('/testarea');
  });

module.exports = router;