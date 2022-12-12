const shortid = require('shortid')

const urlModel = require('../model/urlModel')

const sortUrl = async (req, res) => {
    try {
        const longUrl = req.body.longUrl

        let urlCode = shortid.generate()

        let shortUrl = "http://localhost:3000" + "/" + urlCode;

        const url = {
            longUrl: longUrl,
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

        return res.status(302).redirect(longUrl)
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { sortUrl, getSortUrl }