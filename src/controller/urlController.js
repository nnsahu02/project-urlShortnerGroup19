const shortid = require('shortid')
const axios = require('axios')
const urlModel = require('../model/urlModel')

const { isvalidUrl, regexcheck } = require('../validation/validator')

//---------------------------------------------- URL SHORTEN -------------------------------------------------//

const shortUrl = async (req, res) => {
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

        // if (!regexcheck(bodyData)) {
        //     return res.status(400).send({ status: false, message: "url regex validation failed." })
        // }

        const uniqueCheck = await urlModel.findOne({ longUrl: bodyData })

        if (uniqueCheck) {
            return res.status(400).send({ status: false, message: "The url is already exist." })
        }

        const checkingUrl = await axios.get(bodyData)
            .then(() => bodyData)
            .catch(() => null)

        if (!checkingUrl) {
            return res.status(404).send({ status: false, message: "no such url found" })
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

//----------------------------------------------------------------------------------------------------------------//


//------------------------------------------- REDIRECTING URL ---------------------------------------------------//

const getShortUrl = async (req, res) => {
    try {
        urlCode = req.params.urlCode

        if (!urlCode) {
            return res.status(400).send({ status: false, message: "please provide uriCode in params" })
        }

        const urlData = await urlModel.findOne({ urlCode })

        if (!urlData) {
            return res.status(404).send({ status: false, message: "no url found with this urlCode." })
        }

        const longUrl = urlData.longUrl

        return res.status(302).redirect(longUrl)
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//------------------------------------------------------------------------------------------------------------------//

module.exports = { shortUrl, getShortUrl }