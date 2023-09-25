let rate = 1339.90;
let rate2 = 1.00;
let index = 3;
let index2 = 0;

var won = ['원', '엔', '파운드', '달러', '유로',
           '위안', '달러', '달러', '달러', '바트', '동',
           '달러', '달러' ];
var rateByContry = [1, 9.67, 1635.54, 1336.50, 1422.70, 
          183.09, 860.91, 991.62, 796.55, 37.14, 0.0549,
          170.90, 41.57];

$(function exchange(){
    var contry = document.getElementById("contry");
    var currency = contry.options[contry.selectedIndex].value;

    var contry2 = document.getElementById("contry2");
    var currency2 = contry2.options[contry2.selectedIndex].value;

    index = parseInt(currency);
    index2 = parseInt(currency2);

    rate = rateByContry[index];
    rate2 = rateByContry[index2];
});

$(function exchangeResult(conFrom, conTo) {
    var money = document.getElementById(conFrom);
    var num = money.value;

    var indexFrom = 0;
    var indexTo = 0;

    if(num === "") {
        num = '0';
    }
    num = num.replace(/[^0-9.]/g, '');

    // 소수점 2개 이상 입력 방지
    var decimalIndex = num.indexOf('.');
    if (decimalIndex !== -1) {
        var decimal1 = num.slice(0, decimalIndex+1);
        var decimal2 = num.slice(decimalIndex+1).replace(/\./g, '');
        num = decimal1 + decimal2;
    }
    if (num.startsWith('0') && num !== '0') {
        if  (!num.startsWith('0.')){
            num = num.replace(/^0+/, '');
        }
    }
    money.value = num;

    if (conFrom == "money") {
        var result = (rate * num / rate2).toFixed(2);
        indexFrom = index;
        indexTo = index2;
    }
    else {
        var result = (rate2 * num / rate).toFixed(2);
        indexFrom = index2;
        indexTo = index;
    }

    var resultBox = document.getElementById(conTo);
    resultBox.value = result; 

    var fromText = document.getElementById(conFrom + 'Text');
    var toText = document.getElementById(conTo + 'Text');

    fromText.innerHTML = parseFloat(num).toLocaleString();
    fromText.innerHTML += won[indexFrom];

    toText.innerHTML = parseFloat(result).toLocaleString();
    toText.innerHTML += won[indexTo];
});