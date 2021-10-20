const path = require('path');
const fs = require('fs');
const multer  = require('multer');

const folderUploads = path.resolve('public/imgs');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, folderUploads);
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const limits = {fileSize: 500000};

const upload = multer({ storage: storage, fileFilter: fileFilter, limits});
const uploadsSingle = upload.single('image');

module.exports = {
    uploadsSingle
}