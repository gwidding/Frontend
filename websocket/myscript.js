let num = 0;

url = "ws://192.168.22.51:55000";
w = new WebSocket(url);

w.onopen = function() {
    console.log("open");
    // w.send("thank you for accepting web socket");
}
w.onmessage = function(e) {
    console.log("메시지왔어요 " + e.data);
    addText(e.data);
}
w.onclose = function(e) {
    console.log("closed");
}


$(function() {  
    textBox = $("#inputText");
    // 클릭이나 엔터 이벤트
    $("#enterButton").on('click', function() {
        addText(textBox.val())
    });
    $("#inputText").on("keypress", function(key) {
        if (key.which == 13) {
            addText(textBox.val());
        }
    });

    // 버튼 색상 활성화
    $("#inputText").on("input", function() {
        $("#enterButton").attr("class","turnOn"); 
    });
});



function addText(msg) {
    if (!msg == "") {
        $("#enterButton").attr("class", "button"); // 보냈으니 버튼 꺼짐

        var currNum = num;
        $("#content").append("<div class='text' id='text_" + currNum + "'><span>" + msg + "</span>" 
                            +"<img src='x.png' class='delete' onclick='delText(" + currNum +")'>" + "</div>");
        w.send($("#inputText").val());           

        $("#del_" + currNum).on('click', function() {
            const delIdx = $(this).data("index");
            delText(delIdx);
        });

        $("#inputText").val('');
        num++; 
    } else {
        // console.log("입력 값 없음");
    }

    // $("#content").stop().animate({ scrollTop: "+=1000px" }, "fast");
}


function delText(idx) {
    $("#text_" + idx).remove();
}