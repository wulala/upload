var express = require('express');
var router = express.Router();
var fs = require('fs')
const multer = require('multer')

const storageDate = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = 'public/uploads/images/'
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
        cb(null, path)
    },
    filename: function (req, file, cb) {
        const suffix = file.originalname.match(/\w+$/g)?.[0]
        cb(null, +(new Date()) + '.' + suffix)
    }
})


const uploadDate = multer({ storage: storageDate }).single('file')

router.post('/index', uploadDate, function (req, res, next) {
    let path = req.file.path.replace(/\\/g, '/').replace('public/', '/')
    res.json({
        status: 1,
        data: { path }
    })
});

module.exports = router;
