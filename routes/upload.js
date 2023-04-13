var express = require('express');
var router = express.Router();
var fs = require('fs')
const dayjs = require('dayjs')
const multer = require('multer')


const storageDate = multer.diskStorage({
    destination: (req, file, cb) => {

        const path = 'public/uploads/' + dayjs().format('YYYYMMDD') + '/'
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


const storageNone = multer.diskStorage({
    destination: (req, file, cb) => {

        const path = 'public/uploads/other/'
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
const uploadNone = multer({ storage: storageNone }).single('file')


/* GET users listing. */
router.post('/news', uploadDate, function (req, res, next) {
    let path = req.file.path.replace(/\\/g, '/').replace('public/', '/')
    res.json({
        status: 1,
        data: { path }
    })
});

router.get('/news/get', function (req, res, next) {

    const path = 'public/uploads/' + dayjs().format('YYYYMMDD') + '/data.json'

    if (!fs.existsSync(path)) {
        return res.json({
            status: 0,
            msg: 'empty'
        })
    }

    const data = fs.readFileSync(path, 'utf-8')

    res.json({
        status: 1,
        data: JSON.parse(data)
    })
});

router.post('/news/set', function (req, res, next) {

    const path = 'public/uploads/' + dayjs().format('YYYYMMDD')
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }

    fs.writeFileSync(path + '/data.json', JSON.stringify(req.body))


    res.json({
        status: 1,
        msg: 'completed'
    })
});

// 新一份, 其他的已经制作完成了
router.get('/news/new', function (req, res, next) {

    const _path = 'public/uploads/' + dayjs().format('YYYYMMDD')

    if (!fs.existsSync(_path)) {
        fs.mkdirSync(_path, { recursive: true });
    }

    const path = _path + '/data.json'
    let data = []

    if (fs.existsSync(path)) {
        const _data = fs.readFileSync(path, 'utf-8')
        if (_data) data = JSON.parse(_data)
    }

    console.log(data, 'data')

    const backupPath = _path + '/backup.json'
    let backupData = []

    if (fs.existsSync(backupPath)) {
        const _backupData = fs.readFileSync(backupPath, 'utf-8')
        if (_backupData) backupData = JSON.parse(_backupData)
    }

    console.log(backupData, 'backupData')


    fs.writeFileSync(path, JSON.stringify([]))

    fs.writeFileSync(backupPath, JSON.stringify([...data, ...backupData]))

    res.json({
        status: 1,
        data: []
    })

});


router.post('/other', uploadDate, function (req, res, next) {
    let path = req.file.path.replace(/\\/g, '/').replace('public/', '/')
    res.json({
        status: 1,
        data: { path }
    })
});



module.exports = router;
