var express = require('express');
var router = express.Router();
var fs = require('fs')
const dayjs = require('dayjs')



router.get('/news/get', function (req, res, next) {
    const d = dayjs().format('YYYYMMDD')

    const path = 'public/uploads/news/' + d + '.json'

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
    const d = dayjs().format('YYYYMMDD')

    const path = 'public/uploads/news/'
    const json = path + d + '.json'

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }

    fs.writeFileSync(json, JSON.stringify(req.body))

    res.json({
        status: 1,
        msg: 'completed'
    })
});



router.get('/topic/get', function (req, res, next) {
    const d = dayjs().format('YYYYMMDD')

    const path = 'public/uploads/topic/data.json'

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

router.post('/topic/set', function (req, res, next) {
    const d = dayjs().format('YYYYMMDD')

    const path = 'public/uploads/topic/'
    const json = path + 'data.json'

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }

    fs.writeFileSync(json, JSON.stringify(req.body))

    res.json({
        status: 1,
        msg: 'completed'
    })
});



module.exports = router;
