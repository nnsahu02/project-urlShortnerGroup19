

const isvalidUrl = function (value) {
    if (typeof value === 'String' || value.trim().length >= 1) return true

    if (value === 'null' || value === 'undefined') return false
}

const regexcheck = function (value) {
    let urlcheck = /^(:?^((https|http|HTTP|HTTPS){1}:\/\/)(([w]{3})[\.]{1})?([a-zA-Z0-9]{1,}[\.])[\w]*((\/){1}([\w@?^=%&amp;~+#-_.]+))*)$/
    return urlcheck.test(value)
}


module.exports = { isvalidUrl, regexcheck }