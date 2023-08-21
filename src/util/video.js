module.exports.Video = class {

    constructor(
                title=null,
                isYtb=false,
                bvid=null,
                author=null,
                cid=null,
                partTitle=null,
                url=null,
                aid=null
                ){
        this.title = title
        this.isYtb = isYtb
        this.bvid = bvid
        this.author = author
        this.cid = cid
        this.partTitle = partTitle
        this.url = url
        this.aid = aid
    }
}