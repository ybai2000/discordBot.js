var COOKIE = `buvid3=B2F2CFDC-4012-494F-893F-BFCD1C136695167644infoc; fingerprint=c7374606eeca2fb85a106e2e18500546; buvid_fp=c7374606eeca2fb85a106e2e18500546; buvid_fp_plain=undefined; CURRENT_FNVAL=4048; blackside_state=0; rpdid=|(ukJR~RRu~m0J'uYJJ)muR|R; video_page_version=v_old_home; PVID=1; LIVE_BUVID=AUTO1816359937738078; CURRENT_BLACKGAP=0; CURRENT_QUALITY=80; i-wanna-go-back=-1; b_ut=5; bp_video_offset_6985219=718529014989324300; buvid4=77CEB3CD-A0A0-83D0-33A7-8A7D49D3472185102-022012707-vbdP82J0xCsOb4IOme6pIg%3D%3D; sid=6245prcx; nostalgia_conf=-1; hit-dyn-v2=1; SESSDATA=07933da2%2C1671299734%2Caced8%2A61; bili_jct=4e27ee532190c604d94e3ef94f0ae5e9; DedeUserID=6985219; DedeUserID__ckMd5=32ffaf768f7408ce; fingerprint3=9199139f435c60d5de9c7e91f86e2d8c; b_nut=100; _uuid=DA4624A9-413A-4C1F-2FE3-42D3FA3A24A646597infoc; innersign=0; b_lsid=4D7CB3D7_184013C7FE8`
const Axios = require('axios');
const Voice = require('@discordjs/voice');
const Events = require('events');
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
//需要使用11.8.3版本的got,否则只能使用import格式
const Got = require('got');
const em = new Events.EventEmitter();
let queue = []
let nowPlaying = { song: null, time: null }
let player = Voice.createAudioPlayer()

module.exports.Music = class {

    constructor() {

        this.user = {}
        this.voiceConnection = null
        this.eventSetUp()
        this.mostRecentIdle = new Date()
    }


    eventSetUp() {
        em.on('newSong', this.play.bind())
        player.on('stateChange', (oldState, newState) => {
            console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
        });
        player.on(Voice.AudioPlayerStatus.Idle, () => {
            if (nowPlaying.time && new Date() - nowPlaying.time < 20000) {
                console.log('播放失败 重试')
                this.retry()
            }
            else {
                if (nowPlaying.time && new Date() - nowPlaying.time < 23000) {
                    nowPlaying.song.channel.send(nowPlaying.song.song.videoTitle + " 播放失败")
                }
                em.emit('newSong')
                this.mostRecentIdle = new Date()
                setTimeout(() => {
                    if ((new Date() - this.mostRecentIdle) > 4700000) {
                        this.endConnection()
                    }
                }, 4800000) // 8min
            }
        })
        player.on(Voice.AudioPlayerStatus.AutoPaused, () => {
            player.stop()
        })
        player.on('error', err => {
            console.log("Error: ", err.message)
        })
    }

    getQueue(interaction) {
        if (queue.length == 0) {
            interaction.reply('列表是空的')
            return
        }
        let text = '```css\n'
        queue.forEach((res, i) => {
            text += i + ': ' + res.song.videoTitle + '\n'
        })
        text += '```'
        interaction.reply(text)
    }



    async play(force = false, interaction = null) {
        if (player.state.status != 'idle' && !force) {
            return
        }
        if (queue.length != 0) {
            let queueElem = queue.shift()
            let audioStream = Got.stream(queueElem.song.url[0], {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0",
                    "refer": "https://bilibili.com",
                    "platform": "html5"
                }
            })
            let audio = Voice.createAudioResource(audioStream)
            let text = '正在播放: ' + queueElem.song.videoTitle
            if(interaction){
                interaction.reply(text)
            }
            else{
                queueElem.channel.send(text)
            }
            
            nowPlaying = { song: queueElem, time: new Date() }
            player.play(audio)
        }
        else if (force && queue.length == 0) {
            interaction.reply('没有下一首歌了')
            player.stop()
            nowPlaying.song = null
            nowPlaying.time = null
            player.stop(true)
        }

    }

    async retry() {
        let cidElem = await this.getLink(nowPlaying.song.song)
        let url = cidElem.url
        //let url = nowPlaying.song.song.url
        let num = Math.floor(Math.random() * url.length)
        let audioStream = Got.stream(url[num], {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0",
                "refer": "https://bilibili.com"
            }
        })
        let audio = Voice.createAudioResource(audioStream)
        player.play(audio)
    }


    //newVoiceConnection(message) {
    newVoiceConnection(channel, guild) {
        if (!channel) {

            throw "你先进个频道"
        }
        this.voiceConnection = Voice.joinVoiceChannel({
            channelId: channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator
        })
        this.voiceConnection.subscribe(player)
        this.voiceConnection.on('stateChange', (oldState, newState) => {
            console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
            if (newState.status == 'disconnected') {
                this.voiceConnection = null
            }
        });
    }

    endConnection() {
        if (!this.voiceConnection) {
            return
        }
        this.voiceConnection.destroy()
        this.voiceConnection = null
    }

    async parseRequest(interaction) {
        let input = interaction.options.getString("目标")
        //let input = 'BV1iP4y1Y7NE'
        if (input[0] == 'B' && input[1] == 'V') {

            this.addVideo(input, false, interaction)
                .catch(err => {
                    err = '```\n出错了: ' + err + '```'
                    interaction.editReply(err)
                })
        }
        else if (input[0] == 'A' && input[1] == 'V' ||
            input[0] == 'a' && input[1] == 'v') {
            input = input.substring(2)
            this.addVideo(input, true, interaction)
                .catch(err => {
                    err = '```\n出错了: ' + err + '```'
                    interaction.editReply(err)
                })

        }
        else if (input.includes("www.bilibili.com")) {
            let id = await this.getByVidURL(input)
            this.addVideo(id, true, interaction)
                .catch(err => {
                    err = '```\n出错了: ' + err + '```'
                    interaction.editReply(err)
                })
        }
        else {
            let searchResult = await this.search(interaction)
            let text = '```css\n'
            let page = 0
            for (let index = 0; index < 9; index++) {
                text += (index + 1) + ": " + searchResult[index + page * 9].title + '  ' + searchResult[index + page * 9].author + '\n'
            }
            // searchResult.forEach((res, index) => {
            //     text += index + ": " + res.title + '  ' + res.author + '\n'
            // })
            text += '0 或 c: 取消\n'
            text += '```'

            let prev = new ButtonBuilder()
                .setCustomId('prev')
                .setLabel('←')
                .setStyle(ButtonStyle.Primary)

            let next = new ButtonBuilder()
                .setCustomId('next')
                .setLabel('→')
                .setStyle(ButtonStyle.Primary)


            let row = new ActionRowBuilder().addComponents([prev, next])

            let embed = new EmbedBuilder()
                .setDescription(text)
            interaction.editReply({ embeds: [embed], components: [row] })
            this.user[interaction.user.username] = { status: 'onSearch', data: searchResult.slice(page * 9, page * 9 + 9), interaction: interaction }
        }
    }

    handleSelection(message) {
        let record = this.user[message.author.username]
        let num = message.content
        if (record == null) {
            throw '记录中没有这个request'
        }
        else if (num == '0' || num == 'c') {
            delete this.user[message.author.username]
            let embed = new EmbedBuilder().setDescription('已取消')
            record.interaction.editReply({ embeds: [embed], components: [] })
            message.delete()
        }
        else if (record.status == 'onSearch') {
            delete this.user[message.author.username]
            if (num > 9 || num < 0 || record.data[num - 1] == undefined) {
                let embed = new EmbedBuilder().setDescription("没有这个选项，已取消")
                record.interaction.editReply({ embeds: [embed], components: [] })
                message.delete()
                return
            }
            this.addVideo(record.data[num - 1].bvid, false, record.interaction)
                .catch(err => {
                    err = '```\n出错了: ' + err + '```'
                    let embed = new EmbedBuilder().setDescription(err)
                    record.interaction.editReply({ embeds: [embed], components: [] })
                })
            message.delete()
        }
        else if (record.status == 'onPart') {
            delete this.user[message.author.username]
            if (num == 'a') {
                record.data.forEach(res => {
                    this.addPart(res, record.interaction)
                        .catch(err => {
                            err = '```\n出错了: ' + err + '```'
                            let embed = new EmbedBuilder().setDescription(err)
                            record.interaction.editReply({ embeds: [embed], components: [] })

                        })

                })
                message.delete()
            }
            else {
                if (record.data[num] == undefined) {
                    let embed = new EmbedBuilder().setDescription("没有这个选项，已取消")
                    record.interaction.editReply({ embeds: [embed], components: [] })
                    message.delete()
                    return
                }
                this.addPart(record.data[num], message)
                    .catch(err => {
                        err = '```\n出错了: ' + err + '```'
                        let embed = new EmbedBuilder().setDescription(err)
                        record.interaction.editReply({ embeds: [embed], components: [] })
                    })
                message.delete()

            }


            if (this.voiceConnection == null) {
                try {
                    this.newVoiceConnection(message.member.voice.channel, message.guild)
                }
                catch (err) {
                    err = '```\n出错了: ' + err + '```'
                    let embed = new EmbedBuilder().setDescription(err)
                    record.interaction.editReply({ embeds: [embed], components: [] })
                    return
                }
            }
            let text = "将 " + record.data[0].videoTitle + " 加入队列"
            let embed = new EmbedBuilder().setDescription(text)
            record.interaction.editReply({ embeds: [embed], components: [] })
            em.emit('newSong')
        }

    }

    async addVideo(id, isAV = false, interaction) {

        let detail = await this.idToDetail(id, isAV)
        let cids = await this.findCid(detail)
        if (cids.length == 1) {
            let song = await this.getLink(cids[0])
            queue.push({ song: song, channel: interaction.channel })
            if (this.voiceConnection == null) {
                try {
                    this.newVoiceConnection(interaction.member.voice.channel, interaction.guild)
                }
                catch (err) {
                    interaction.editReply(err)
                    return
                }
            }
            let text = "将 " + song.videoTitle + " 加入队列"
            let embed = new EmbedBuilder().setDescription(text)
            interaction.editReply({ embeds: [embed], components: [] })
            em.emit('newSong')
        }
        else {
            this.askPart(cids, interaction)
        }

    }

    async askPart(cids, interaction) {
        let text = '```css\n' + cids[0].videoTitle + '\n该视频下有多个分p\n'
        cids.forEach((res, i) => {
            text += i + ': ' + res.partTitle + '\n'
        })
        text += 'a: 全部\nc: 取消\n```'
        let embed = new EmbedBuilder().setDescription(text)
        interaction.editReply({ embeds: [embed], components: [] })
        this.user[interaction.user.username] = { status: 'onPart', data: cids, interaction: interaction }
    }

    async addPart(cid, interaction) {
        let song = await this.getLink(cid)
        queue.push({ song: song, channel: interaction.channel })
        em.emit('newSong')
    }


    async search(interaction) {
        let keyword = interaction.options.getString("目标")
        //keyword.replaceAll(" ", "+")
        let res = await Axios.get('http://api.bilibili.com/x/web-interface/search/all/v2', {
            params: {
                keyword: keyword
            },
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0",
                Cookie: COOKIE
            }
        },
        )
        switch (res.data.code) {
            case -400:
                throw '请求错误'
            case -412:
                throw '请求被拦截，可能cookie过期了'
        }
        return this.parseSearchResult(res)
    }

    parseSearchResult(src) {
        let data = src.data.data.result
        let videos = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].result_type == 'video') {
                videos = data[i].data
                break;
            }
        }
        if (videos.length == 0) {
            throw "什么都没有找到"
        }
        let res = []
        videos.slice(0, 45).forEach(video => {
            let title = video.title
            title = title.replaceAll('<em class="keyword">', '[')
            title = title.replaceAll('</em>', ']')
            res.push({ title: title, bvid: video.bvid, author: video.author })
        })
        return res
    }

    //return list of {cid, partTitle, bvid, videoTitle}
    async findCid(detail) {
        let param = { bvid: detail.bvid }
        let parts = []

        let res = await Axios.get('http://api.bilibili.com/x/player/pagelist', {
            params: param
        })
        if (res.data.code != 0) {
            throw "bv或av转cid时出错"
        }
        res['data']['data'].forEach((data) => {
            parts.push({ "cid": data.cid, "partTitle": data.part, bvid: detail.bvid, 'videoTitle': detail.videoTitle })
        })
        return parts
    }

    // return {videoTitle, bvid}
    async idToDetail(id, isAV = false) {
        let param = {}
        if (isAV) {
            param['aid'] = id
        }
        else {
            param['bvid'] = id
        }
        let res = await Axios.get('http://api.bilibili.com/x/web-interface/view', {
            params: param
        })
        switch (res.data.code) {
            case -400:
                throw '请求错误'
            case -403:
                throw 'bot无权播放该视频'
            case -404:
                throw '没有这个视频，可能是由于版权限制'
            case 62002:
                throw '视频不可见'
            case 62004:
                throw '视频审核中'
        }
        return { 'videoTitle': res.data.data.title, 'bvid': res.data.data.bvid }
    }

    //return list of {cid, partTitle,bvid, videoTitle, [links]}
    async getLink(cidElem) {
        let url = []
        let res = await Axios.get('http://api.bilibili.com/x/player/playurl', {
            params: {
                'cid': cidElem.cid,
                'bvid': cidElem.bvid,
                'fnval': 16
            }
        })
        res.data.data.dash.audio.forEach((data) =>
            url.push(data.base_url)
        )
        cidElem.url = url
        return cidElem
    }

    async getByVidURL(url) {
        let webPage = await Axios.get(url).catch(err => { throw "网址有误" })
        let aid_expr = /"aid":\d+/
        let cid_expr = /"pages":\[.+?\]/
        let content = await webPage.data
        let cid = content.match(cid_expr)
        let aid = content.match(aid_expr)
        if (aid == null) {
            throw "网址有误"
        }
        return aid[0].split(":")[1]
    }

    async testRun() {
        // let detail = await this.idToDetail('BV1iP4y1Y7NE')
        // //console.log(detail)
        // let parts = await this.bvToCid(detail.bvid)
        // console.log(parts)
        //let links = await this.cidToLink(parts[0].cid, detail.bvid)
        await this.parseRequest("播放 BV1iP4y1Y7NE")

    }


}


// let music = new Music()
// music.testRun()
