const express = require('express')
const router = express.Router()

const urlController = require('../controller/urlController')

// SHORTEN LONG URL
router.post('/url/shorten', urlController.shortUrl)

// REDIRECTING URL
router.get('/:urlCode', urlController.getShortUrl)

// CHECKING PATH
router.all('/*', function (req, res) {
    return res.status(400).send({ status: false, message: "Please provide valid path." })
})

module.exports = router