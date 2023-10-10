let num = 0;
var myID ="";

url = "ws://192.168.22.51:55000";
socket = new WebSocket(url);

socket.onopen = function() {
    console.log("open");
}
socket.onmessage = function(e) {
    var msgData = e.data.split(":");
    console.log("보낸사람 ID: ", senderID);
    console.log("메세지 왔어요~", message);
    sendMessage(senderID, message);
}
socket.onclose = function(e) {
    console.log("closed");
}
function inputChatData(data) {
    console.log(data);
    for (var index=0; index < data.length; index++) {
        var senderID = data.data[index].userid; // 저장된 메시지의 보낸 사람 ID
        var message = data.data[index].message;  // 저장된 메시지 내용
        console.log(senderID, message);
        sendMessage(senderID, message);
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
        sendText(textBox.val())
    });
    $("#inputText").on("keypress", function(key) {
        if (key.which == 13) {
            sendText(textBox.val());
        }
    });

    // 버튼 색상 활성화
    $("#inputText").on("input", function() {
        $("#enterButton").attr("class","turnOn"); 
    });
});

function sendText(senderID, message) {
    if (!message == "") {
        fetch("http://localhost:8080/websocket/dataadd.jsp?userid=" + senderID +
            "&message=" + message);

        $("#enterButton").attr("class", "button"); // 버튼 꺼짐

        var myMsg = senderID + ": " + message;
        var currNum = num;
        var messageClass = senderID === myID ? "text1" : "text2"; // 보낸 메시지와 받은 메시지를 구분
        $("#content").append("<div class='" + messageClass + "' id='text_" + currNum + "'>"
            + "<span>" + myMsg + "</span>"
            + "<img src='x.png' class='delete' onclick='delText(" + currNum + ")'>"
            + "</div>");

        $("#inputText").val('');
        num++;
    } else {
        // console.log("입력 값 없음");
    }
}

// function sendText(msg) {
//     if (!msg == "") {
//         fetch("http://localhost:8080/websocket/dataadd.jsp?userid=" + myID +
//                 "&message=" + msg);

//         $("#enterButton").attr("class", "button"); // 보냈으니 버튼 꺼짐

//         var myMsg = myID + ": " + $("#inputText").val();
//         var currNum = num;
//         $("#content").append("<div class='text' id='text_" + currNum + "'>"
//                             +"<span>" + msg + "</span>" 
//                             +"<img src='x.png' class='delete' onclick='delText(" + currNum +")'>" 
//                             +"</div>");
    
//         socket.send(myMsg);
        
//         $("#inputText").val('');
//         num++; 
//     } else {
//         // console.log("입력 값 없음");
//     }
// }

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

function delText(idx) {
    $("#text_" + idx).remove();
}
