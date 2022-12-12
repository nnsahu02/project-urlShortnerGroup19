const express = require('express')
const router = express.Router()

const urlController = require('../controller/urlController')

router.post('/url/shorten', urlController.sortUrl)

router.get('/:urlCode', urlController.getSortUrl)

module.exports = router