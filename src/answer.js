module.exports.answer = function (txt, message) {
    if (txt.charAt(0) == "有" && (txt.charAt(txt.length - 1) == "吗" || txt.charAt(txt.length - 2)
        == "吗" || txt.charAt(txt.length - 1) == "?" || txt.charAt(txt.length - 1) == "？")) {
        message.channel.send(answer(txt));
        exist = true;
    }
    else if (txt.slice(0, 3) == "有没有") {
        message.channel.send(answerHaveNot(txt));
        exist = true;
    }
    else if (txt.slice(txt.length - 2, txt.length) == "在吗" || txt.slice(txt.length - 3, txt.length - 1) == "在吗") {
        var rand = Math.random() * 100;
        console.log(rand)
        if (rand > 50) {
            message.channel.send("不在")
        }
        else {
            message.channel.send("在吗？")
        }
    }
}

function answer(str) {
    if (str == "有吗" || str == "有吗？") {
        return "没有吗";
    }
    if (str.charAt(str.length - 2) == "吗" && (str.charAt(str.length - 1) == "?" || str.charAt(str.length - 1) == "？")) {
        str = str.slice(0, str.length - 2);
    }
    else {
        str = str.slice(0, str.length - 1);
    }
    var rand = Math.random() * 100;
    if (rand > 95) {
        return "我不知道啊"
    }
    else if (rand > 50) {
        return str;
    }
    else {
        str = "没" + str;
        return str;
    }
}

function answerHaveNot(str) {
    str = str.slice(2, str.length);
    var rand = Math.random() * 100;
    if (rand > 95) {
        return "我不知道啊"
    }
    else if (rand > 50) {
        return str;
    }
    else {
        str = "没" + str;
        return str;
    }
}