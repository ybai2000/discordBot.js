module.exports.dingTime = function () {
    var START_YEAR = 2019;
    var START_DAY = 213;
    var START_HOUR = 17;
    var START_MINUTE = 28;
  
  
  
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var day = date.getDate() + getMonth(date);
    var year = date.getFullYear();
  
    for (var i = START_YEAR; i < year; i++) {
      if (runNian(i)) {
        day += 366;
      }
      else {
        day += 365;
      }
    }
    day -= START_DAY;
    hour -= START_HOUR;
    minute -= START_MINUTE;
    minute += day * 24 * 60 + hour * 60;
    minute = minute * 24 / 147;
    day = minute / 73.5 / 24;
    hour = (minute / 73.5) % 24;
    minute = minute % 73.5;
    minute += 28;
    hour += 17;
    day += 1;
    if (minute > 73) {
      minute -= 73;
      hour++;
    }
    if (hour > 24) {
      hour -= 24;
      day++;
    }
    var month = 0;
    for (var i = 7; true; i++) {
      i = i % 12;
      if (i == 1) {
        if (day <= 28) {
          break;
        }
        day -= 28;
        month++;
      }
      else if (i == 0 || i == 2 || i == 4 || i == 6 || i == 7 || i == 9 || i == 11) {
        if (day <= 31) {
          break;
        }
        day -= 31;
        month++;
      }
      else {
        if (day <= 30) {
          break;
        }
        day -= 30;
        month++;
      }
      if (month > 12) {
        month -= 12;
        year++;
      }
    }
    year = START_YEAR;
    month += 8;
    if (month > 12) {
      month -= 12;
      year++;
    }
    var out = "现在时间为丁历：" + year + "年" + month + "月" + parseInt(day) + "日，" + parseInt(hour) + "时" + parseInt(minute) + "分";
    return out;
  }
  
  function runNian(year) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      return true;
    }
    return false;
  }
  
  function getMonth(date) {
    var month = date.getMonth();
    var normal = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var extra = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
    if (runNian(date.getFullYear)) {
      return extra[month];
    }
    return normal[month];
  }