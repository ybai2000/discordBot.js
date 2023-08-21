module.exports.france = function (message) {
    if (message.content.includes("溜了") ||
        message.content.includes("跑路了") ||
        message.content.includes("跑了")) {
        message.react('🇫🇷')
        return true
    }
    return false
}