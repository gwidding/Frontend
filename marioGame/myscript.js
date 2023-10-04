var rocketID = 0;
var rocketRemoveCnt = 0;
var score = 0;
var life = 3;

var time;
var interval;
var interval2;

$(function() {
    backStart();
    timeChange();

    interval = setInterval(createRocket, time);
    interval2 = setInterval(checkGame, 500);

    $(document).on("keypress", function(key) {
        if(key.which == 32) { jump(); }         
    });
    $("#stopButton").on("click", function() { clearInterval(interval);  });
    // $("#playButton").on("click", function() {  interval = setInterval(createRocket, time); });

    
});

function timeChange() {
    var rand = Math.random();
    time = (Math.floor(rand*3) + 1) * 1000;
    console.log("초 : " + time);
}

function createRocket() {
    $("#outterBox").append("<div id='rocket" + rocketID + "' class='rocketStyle'>" +
                            "<img src='mushroom.png' width='100%' height='100%'></div>");
    $("#rocket" + rocketID).animate({  
        left: '-100px'
    }, 3000);
    rocketID++;
    timeChange();
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
        console.log("check");
        var x = parseInt($("#rocket" + index).css("left").replace("px", ""));
        var marioX = parseInt($("#mario").css("left").replace("px", ""));
 
        var marioY = parseInt($("#mario").css("top").replace("px", ""));
        var marioWidth = parseInt($("#mario").css("width").replace("px", ""));

        if (x < -20) {
            console.log("rocket" + index + " removed");
            $("#rocket"+index).remove();
            rocketRemoveCnt++;
        }

        if ( x >= 50 && x <= 50 + marioWidth) {
            var tab_td = $("#board td");

            if (marioY >= 310) {
                console.log(index + "부딪힘!");
                $("#mario").animate({
                    rotate: "360deg",
                    left: '-120px'
                },400);
                $("#mario").animate({
                    rotate: "0deg",
                    left: '50px'
                },200);

                life--;
                tab_td.eq(3).text(life);
                console.log("목숨 : " + life);
            }
            else {
                score++;
                tab_td.eq(1).text(score);
                console.log("점수 : " + score);
            }
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