let num = 0;
var myID ="";

url = "ws://192.168.22.51:55000";
socket = new WebSocket(url);

socket.onopen = function() {
    console.log("open");
}
socket.onmessage = function(e) {
    var msg = e.data.split(":");
    contextData(msg[0], msg[1]);
    fetch("http://localhost:8080/websocket/dataadd.jsp?userid=" + myID + 
       "&message=" + msg);
}
socket.onclose = function(e) {
    console.log("closed");
}
function inputChatData(data) {
    console.log(data);
    for (var index=0; index < data.length; index++) {
        contextData(data.data[index].userid, data.data[index].message);
    }
}

$(function() {
    fetch("http://localhost:8080/websocket/dataread.jsp")
    .then(response => response.json())
    .then(json => inputChatData(json))

    $("#idButton").on("click", function() {
        myID = $("#name").val();
    });

    // 클릭이나 엔터 이벤트
    textBox = $("#inputText");
    $("#enterButton").on('click', function() {
        contextData(myID, textBox.val());
        var myMsg = myID + ": " + $("#inputText").val();
        socket.send(myMsg);
    });
    $("#inputText").on("keypress", function(key) {
        if (key.which == 13) {
            contextData(myID, textBox.val());
            var myMsg = myID + ": " + $("#inputText").val();
            socket.send(myMsg);
        }
    });

    // 버튼 색상 활성화
    $("#inputText").on("input", function() {
        $("#enterButton").attr("class","turnOn"); 
    });
});


function contextData(currentID, msg) {
    if (currentID == myID) {
        textIdNum = "text_";
        textBoxClassName = "textBox";
    } else {
        textIdNum = "text2_"
        textBoxClassName = "textBox2"
    }
    if (!msg == "") {
        $("#enterButton").attr("class", "button"); // 보냈으니 버튼 꺼짐
        var currNum = num;
        $("#content").append("<div class='" + textBoxClassName + "'"
                                       + "id='" + textIdNum + currNum + "'>"
                            +"<span>" + msg + "</span>" 
                            +"<img src='x.png' class='delete' onclick='delText(" + currNum +")'>" 
                            +"</div>");
        $("#inputText").val('');
        num++; 
    }
}

function delText(idx) {
    $("#text_" + idx).remove();
}

// function receiveText(msg) {
//     if (!msg == "") {
//         $("#enterButton").attr("class", "button"); // 보냈으니 버튼 꺼짐

//         var currNum = num;
//         $("#content").append("<div class='text2' id='text2_" + currNum + "'>"
//                             +"<span>" + msg + "</span>" 
//                             +"<img src='x.png' class='delete' onclick='delText(" + currNum +")'>" 
//                             +"</div>");
//         $("#inputText").val('');
//         num++; 
//     } else {
//         // console.log("입력 값 없음");
//     }
// }

