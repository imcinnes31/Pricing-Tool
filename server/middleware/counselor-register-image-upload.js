//preconfigured middleware group for file uploading.
const multer = require('multer');
const uuid = require('uuid')
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const counselorImageUpload = multer({
    limits: 500000, //max file size = 0.5 MB
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, uuid.v1() + '.' + ext);
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type. Is this file not png, jpeg, jpg?');
        cb(error, isValid);
    }
});

module.exports = counselorImageUpload;