var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var mongoose = require('mongoose');

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

var profileSettings = {
  username: "John",
  profilePicture: "images/capricorn.png",
  premium: false,
  aboutme: "I like turtles",
  function: "Teacher",
  company: "Good Students School",
  city: "London",
  isMale: false,
  prefMen: true,
  email: 'John_wick@gmail.com',
  DoB: "1990-10-25",
  minAge: 18,
  maxAge: 25,
  maxDistance: 10,
  pushNotification: false
};


/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', {
  //   title: 'Edit Profile',
  //   Username: profileSettings.username,
  //   UserProfile: profileSettings.profilePicture,
  //   premium: profileSettings.premium
  // });

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
      // profileSettings.profilePicture = `uploads/${req.file.filename}`;
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
  // res.render('editprofile', {
  //   title: 'Edit Profile',
  //   aboutme: profileSettings.aboutme,
  //   function: profileSettings.function,
  //   company: profileSettings.company,
  //   city: profileSettings.city,
  //   isMale: profileSettings.isMale
  // });
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

// router.get('/editprofile/get-data', function (req, res, next) {
//   userData.findById(id)
//     .then(function(doc){
//       res.render('editprofile', {
//         aboutme: doc.aboutme,
//         function: doc.function,
//         company: doc.company,
//         city: doc.city,
//         isMale: doc.isMale
//       });
//     });
//     //Waarschrijnlijk wil ik hier Redirecten maar weet nog niet zo goed hoe ik dat doe zonder mn content te verliezen.
// });

// router.post('/editprofile/insert', function (req, res, next) {
//   var item = {
//     username: profileSettings.username,
//     profilePicture: profileSettings.profilePicture,
//     premium: profileSettings.premium,
//     aboutme: profileSettings.aboutme,
//     function: profileSettings.function,
//     company: profileSettings.company,
//     city: profileSettings.city,
//     isMale: profileSettings.isMale,
//     prefMen: profileSettings.prefMen,
//     email: profileSettings.email,
//     DoB: profileSettings.DoB,
//     minAge: profileSettings.minAge,
//     maxAge: profileSettings.maxAge,
//     maxDistance: profileSettings.maxDistance
//   };

//   var data = new userData(item);
//   data.save();
//   res.redirect('/editprofile');
// });

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

// router.post('/editprofile/delete', function (req, res, next) {

// });

router.get('/settings', function (req, res) {
  // res.render('settings', {
  //   title: 'More settings',
  //   email: profileSettings.email,
  //   username: profileSettings.username,
  //   dob: profileSettings.DoB,
  //   minAge: profileSettings.minAge,
  //   maxAge: profileSettings.maxAge,
  //   maxDistance: profileSettings.maxDistance,
  //   pushNotification: profileSettings.pushNotification,
  //   prefMen: profileSettings.prefMen
  // });

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
      pushNotification: doc.pushNotification
    });
  });

});

router.post('/settings/update', function (req, res) {
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
    doc.save();
  });

  res.redirect('/settings')
});
module.exports = router;