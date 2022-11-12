const VTCovid = "https://d2uchevld25wrj.cloudfront.net/MicroStrategy-public/servlet/mstrWeb?evt=2048001&src=mstrWeb.2048001&documentID=5211891511EB51F200000080EF75366F&currentViewMedia=1&visMode=0&Server=BI-PROD-APP-ESX.DB.VT.EDU&Project=Public%20Facing%20Project&Port=0&share=1&hiddensections=header,path,dockTop,dockLeft,footer"
const UWCovid = "https://webapps.ehs.washington.edu/coviddashboard/newdashboard.php"
const UPENNCovid = 'https://coronavirus.upenn.edu/content/dashboard'
const UCONNCovid = "https://coviddashboard.uconn.edu/"

module.exports.getCovid = async function(message){
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    
    const VTresponse = await fetch(VTCovid);
    const UWresponse = await fetch(UWCovid);
    //const UPENNresponse = await fetch(UPENNCovid);
    const UCONNresponse = await fetch(UCONNCovid);
    const VTbody = await VTresponse.text();
    const UWbody = await UWresponse.text();
    //const UPENNbody = await UPENNresponse.text();
    const UCONNbody = await UCONNresponse.text();
    
    
 
    message.channel.send(readVT(VTbody))
    message.channel.send(readUW(UWbody))
    message.channel.send(readUCONN(UCONNbody))
    var UPENN = "宾大数据请前往 "+UPENNCovid+" 自行查阅"
    message.channel.send(UPENN)
    //message.channel.send(readUPENN(UPENNbody))
}

function readVT(body){
    body = body.split("\n")[806];
    body = body.split("<")[148];
    body = body.split(">")[1];
    var result = "VT过去一周共测出"+body+"个阳性"
    return result;
}

function readUW(body){
    body = body.split("\n")[184];
    body = body.split("<")[1];
    body = body.split(">")[1];
    var result = "UW西雅图校区过去十天共测出"+body+"个阳性"
    return result;
    /*
    for(var i = 0; i < body.length; i++){
        console.log(i);
        console.log(body[i])
    }
    */
    
}

function readUPENN(body){
    body = body.split("\n")[1];
    body = body.split(",")[2];
    var result = "宾大过去一周共测出"+body+"个阳性"
    return result;
}

function readUCONN(body){
    body = body.split("\n");
    /*
    for (var i = 0; i < body.length; i++){
        console.log(i);
        console.log(body[i]);
    }
    */
    var storrs = body[767];
    //console.log(storrs);
    storrs = storrs.split("<")[0];

    storrs = storrs.split(" ")[2];
    var hartford = body[1088];
    //console.log(hartford);
    hartford = hartford.split("<")[0];

    hartford = hartford.split(" ")[2];
    var result = "UCONN自8月25日起Storrs共测出"+storrs+"个阳性，Hartford共测出"+hartford+"个阳性"
    return result;
}

/*
    module.exports.httpGetAsync = function(theUrl, callback)
{
    import fetch from 'node-fetch';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
*/

