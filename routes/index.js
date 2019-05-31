var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('localhost:27018/test', {useNewUrlParser: true});
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  aboutme: String,
  Function: String
}, {collection: 'user-data'});


var userData = mongoose.model('UserData', userDataSchema);
// var mongo = require('mongodb');
// require('dotenv').config();

// var db = null;
// var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;



// var assert = require('assert');

// var url = 'mongodb://localhost:27018/';


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Edit Profile',
    Username: 'John'
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
    }
  });
});

router.get('/editprofile', function (req, res, next) {
  res.render('editprofile', {
    title: 'Edit Profile',
    Username: 'John'
  });
});

router.get('/editprofile/get-data', function (res, req, next) {
  userData.find()
    .then(function(doc){
      res.render('editprofile', {itmes: doc});
    });
  // var resultArray = [];
  // mongo.connect(url, function(error, db){
  //   assert.equal(null, error);
  //   var dbTest = db.db('test');
  //   var cursor = dbTest.collection('user-data').find();
  //   cursor.forEach(function(doc, error){
  //     assert.equal(null, error);
  //     resultArray.push(doc);
  //   }, function(){
  //     db.close();
  //     res.render('editprofile', {items: resultArray});
  //   });
  // });
});

router.post('/editprofile/insert', function (res, req, next) {
  var item = {
    aboutme: req.body.aboutme,
    function: req.body.function,
    company: req.body.company,
    city: req.body.city,
    gender: req.body.gender
  };

  var data = new userData(item);
  data.save();
  
  // mongo.connect(url, function(error, db){
  //   assert.equal(null, error);
  //   var dbTest = db.db('test');
  //   dbTest.collection('user-data').insertOne(item, function(error, result){
  //     assert.equal(null, error);
  //     console.log('Item is inserted');
  //     db.close();
  //   })
  // })

  res.redirect('/editprofile');
});

router.post('/editprofile/update', function (res, req, next) {

});

router.post('/editprofile/delete', function (res, req, next) {

});


module.exports = router;