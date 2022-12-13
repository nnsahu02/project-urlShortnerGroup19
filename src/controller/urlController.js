const shortid = require('shortid')
const axios = require('axios')

const urlModel = require('../model/urlModel')

const { isvalidUrl, regexcheck } = require('../validation/validator')


const sortUrl = async (req, res) => {
    try {
        const bodyData = req.body.longUrl

        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({ status: false, message: "The body can not be empty." })
        }

        if (!bodyData) {
            return res.status(400).send({ status: false, message: "Please provide longUrl in body." })
        }

        if (!isvalidUrl(bodyData)) {
            return res.status(400).send({ status: false, message: "please enter valid Url." })
        }

        if (!regexcheck(bodyData)) {
            return res.status(400).send({ status: false, message: "url regex failed." })
        }

        const uniqueCheck = await urlModel.findOne({ longUrl: bodyData })

        if (uniqueCheck) {
            return res.status(400).send({ status: false, message: "The url is already exist." })
        }

        let options = {
            method: 'get',
            url: bodyData
        }

        let result = await axios(options)
            .then(() => result.data)
            .catch(err => err)

        if (!result) {
            return res.status(400).send({ status: false, message: "The url is not accessible" })
        }

        let urlCode = shortid.generate()

        let shortUrl = "http://localhost:3000" + "/" + urlCode;

        const url = {
            longUrl: bodyData,
            shortUrl: shortUrl,
            urlCode: urlCode
        }

        const urlData = await urlModel.create(url)

        return res.status(200).send({ status: true, data: url })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getSortUrl = async (req, res) => {
    try {
        urlCode = req.params.urlCode

        const urlData = await urlModel.findOne({ urlCode })

        const longUrl = urlData.longUrl

        return res.redirect(longUrl)
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { sortUrl, getSortUrl }