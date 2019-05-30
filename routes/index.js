var express = require('express');
var router = express.Router();
var multer = require('multer')
var path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Edit Profile', Username: 'John'});
});

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, callback){
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const uploadImage = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, callback){
    checkFileExt(file, callback);
  }
}).single('profileImage');

function checkFileExt(file, callback){
  const fileExt = /jpeg|jpg|png|gif/;
  const extName = fileExt.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileExt.test(file.mimetype);

  if(mimeType && extName){
    return callback(null, true);
  }
  else{
    callback('File is not a image');
  }
}

router.post('/upload', (req, res) => {
  uploadImage(req, res, (error) => {
    if(error){
      res.render('index', { message: error});
    }
    else{
      if(req.file == undefined){
        res.render('index', { message: 'No file selected.'});
      }
      else{
        res.render('index', {message: 'Image uploaded.', UserProfile: `uploads/${req.file.filename}`});
      }
    }
  });
});


module.exports = router;
