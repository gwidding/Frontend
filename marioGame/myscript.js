var rocketID = 0;
var rocketRemoveCnt = 0;
var score = 0;
var life = 3;

var time;
var interval;
var interval2;

$(function() {
    backStart();
    var randTime = timeChange();

    interval = setInterval(createRocket, randTime);
    interval2 = setInterval(checkGame, 500);

    $(document).on("keypress", function(key) {
        if(key.which == 32) { jump(); }         
    });
    $("#stopButton").on("click", function() { clearInterval(interval);  });
    
});

function timeChange() {
    var rand = Math.random();
    randTime = (Math.floor(rand*3) + 1) * 1000;
    console.log("초 : " + randTime);
    return randTime;
}

function createRocket() {
    $("#outterBox").append("<div id='rocket" + rocketID + "' class='rocketStyle'>" +
                            "<img src='mushroom.png' width='100%' height='100%'></div>");
    $("#rocket" + rocketID).animate({  
        left: '-100px'
    }, 3000);
    rocketID++;
    time = randTime;
}

function backStart() {
    $("#backgroud").css("left", "0px");
    $("#backgroud").animate({
        left: '-1500px'
    }, 5000, "linear", backStart);
}

function jump() {
    $("#mario").animate({
        top: '200px'
        }, 200, function() {
            $(this).animate( {
                top: '410px'
            }, 500)
    });
}

function checkGame() {
    for(index=rocketRemoveCnt; index<rocketID; index++) {

        var rocketX = parseInt($("#rocket" + index).css("left").replace("px", ""));
        var rocketY = parseInt($("#rocket" + index).css("top").replace("px", ""));
        var marioY = parseInt($("#mario").css("top").replace("px", ""));

        const rectangle1 = { x: 50, y: marioY, width: 100, height: 80 };
        const rectangle2 = { x: rocketX, y: rocketY, width: 100, height: 100 };
        if( isRectangleInRectangle(rectangle1, rectangle2) == true ) {
            console.log(index + "부딪힘!");
        } 

        // if (rocketX >= marioX && rocketX < (marioX + marioWidth)) {
        //     console.log("다가옴");
        //     var tab_td = $("#board td");

        //     if (marioY >= 310) {
        //         console.log(index + "부딪힘!");
        //         $("#mario").animate({
        //             rotate: "360deg",
        //             left: '-120px'
        //         },400);
        //         $("#mario").animate({
        //             rotate: "0deg",
        //             left: '50px'
        //         },200);

        //         life--;
        //         tab_td.eq(3).text(life);
        //         console.log("목숨 : " + life);
        //     }
        //     else {
        //         score++;
        //         tab_td.eq(1).text(score);
        //         console.log("점수 : " + score);
        //     }
        // }

        if (rocketX < -20) {
            console.log("rocket" + index + " removed");
            $("#rocket" + index).remove();
            rocketRemoveCnt++;
        }
    }

    if (life == 0) {
        var gameoverBox = $("#outterBox");

        gameoverBox.html("<div id='gameoverBox" + "' class='gameoverStyle'>" +
                        "<img src='gameover.jpg' width='100%' height='100%'></div>");
        clearInterval(interval);
        clearInterval(interval2);
        $("#mario").remove();
        $("#backgroud").remove();
    }  

}

function isRectangleInRectangle(rect1, rect2) {
    const x1 = rect1.x;
    const y1 = rect1.y;
    const width1 = rect1.width;
    const height1 = rect1.height;

    const x2 = rect2.x;
    const y2 = rect2.y;
    const width2 = rect2.width;
    const height2 = rect2.height;

    // 사각형이 서로 겹치는지 확인합니다.
    const isOverlap = x1 < (x2 + width2) && x2 < (x1 + width1) &&
                      y1 < (y2 + height2) && y2 < (y1 + height1);

    return isOverlap;
}