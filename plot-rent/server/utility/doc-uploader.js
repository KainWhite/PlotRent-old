const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/docs');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const docUploader = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.pdf') {
      return callback(new Error('Only .pdf files are allowed'));
    }
    callback(null, true);
  },
}).single('document');

module.exports = docUploader;
