const yt = require("youtube-search-without-api-key")
const {Video} = require("./video")

module.exports.ytbSearch = async function(interaction){
    const param = interaction.options.getString("目标")
    const videos = await yt.search(param)
    res = []
    videos.forEach(video=>{
        res.push(new Video(video.title, true, null, null, null, null, video.url, null))
        //res.push({title: video.title, url: video.url})
    })
    return res
}