const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const config = require('config');

aws.config.update({
  secretAccessKey: config.get('AWSSecretAccessKey'),
  accessKeyId: config.get('AWSAccessKeyId'),
  region: config.get('AWSRegion'),
});

const s3 = new aws.S3();

function checkFileType(file, cb) {
  //Allowed ext
  const filetypes = /jpeg|jpg|png/;
  //Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type! .jpeg/.jpg/.png only!'), false);
  }
}

const uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.get('s3bucket'),
    acl: 'public-read',
    metadata: function (req, file, cb) {
      if (file.fieldname === 'profileImage') {
        cb(null, { imageDesc: 'oriPP' });
      }
      if (file.fieldname === 'sizeChart') {
        cb(null, { imageDesc: 'sizeChart' });
      }
      if (
        file.fieldname === 'itemImages' ||
        file.fieldname === 'displayImage' ||
        file.fieldname === 'newItemImages' ||
        file.fieldname === 'newDisplayImage'
      ) {
        cb(null, { imageDesc: 'itemPic' });
      }
    },
    key: function (req, file, cb) {
      if (file.fieldname === 'profileImage') {
        cb(
          null,
          req.user.id.toString() +
            '/oriPP/' +
            Date.now().toString() +
            path.extname(file.originalname).toLowerCase()
        );
      }
      if (file.fieldname === 'sizeChart') {
        cb(
          null,
          req.user.id.toString() +
            '/oriSizechart/' +
            Date.now().toString() +
            path.extname(file.originalname).toLowerCase()
        );
      }
      if (
        file.fieldname === 'itemImages' ||
        file.fieldname === 'displayImage' ||
        file.fieldname === 'newItemImages' ||
        file.fieldname === 'newDisplayImage'
      ) {
        cb(
          null,
          req.user.id.toString() +
            '/oriItemImages/' +
            Date.now().toString() +
            path.extname(file.originalname).toLowerCase()
        );
      }
    },
  }),
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'sizeChart', maxCount: 3 },
  { name: 'displayImage', maxCount: 1 },
  { name: 'itemImages', maxCount: 7 },
  { name: 'newDisplayImage', maxCount: 1 },
  { name: 'newItemImages', maxCount: 7 },
]);

/*const uploadItemPict = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.get('s3bucket'),
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname,
        imageDesc: 'oriItemPic',
      });
    },
    key: function (req, file, cb) {
      cb(
        null,
        req.user.id.toString() +
          Date.now().toString() +
          path.extname(file.originalname).toLowerCase()
      );
    },
  }),
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).array('images', 8);*/

module.exports = uploadImage;
