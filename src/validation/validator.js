
const isvalidUrl = function (value) {
    if (typeof value === 'String' || value.trim().length >= 1) return true

    if (value === 'null' || value === 'undefined') return false
}


module.exports = { isvalidUrl }