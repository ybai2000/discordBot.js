module.exports.musicSelection = function(message, client){
    if(message.content.length == 1 && (!isNaN(message.content) || message.content == 'c' || message.content == 'a')){
        let username = message.author.username
        if(client.music.user[username] != null){
            client.music.handleSelection(message)
            return true
        }
    }
    return false
}