var rocketID = 0;
var rand = Math.random();
$(function() {
    backStart();
    var time = (Math.floor(rand*3) + 1)*1000;
    console.log(time);
    var interval = setInterval(createRocket, time);

    $(document).on("keypress", function(key) {
        if(key.which == 32) { jump(); }         
    });
    $("#stopButton").on("click", function() { clearInterval(interval);  });
});

function createRocket() {
    $("#outterBox").append("<div id='rocket" + rocketID + "' class='rocketStyle'>" +
                            "<img src='mushroom.png' width='100%' height='100%'></div>");
    $("#rocket" + rocketID).animate({  
        left: '-100px'
    }, 3000);
    rocketID++;
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
        }, 300, function() {
            $(this).animate( {
                top: '400px'
            }, 500)
    });

}