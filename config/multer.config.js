const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {        
        cb(null, 'public/images/products/');
    },
    filename: (req, file, cb) => {
        let filetype = '';
        if(file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if(file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if(file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }

        if(file.mimetype === 'image/jpg') {
          filetype = 'jpg';
      }

        cb(null, file.fieldname + '-' + Date.now() + '.' + filetype);
    } 
});

module.exports = multer({ storage });