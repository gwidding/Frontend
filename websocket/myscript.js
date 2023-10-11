let num = 0;
var myID ="";

url = "ws://192.168.22.51:55000";
socket = new WebSocket(url);

socket.onopen = function() {
    console.log("open");
}
socket.onmessage = function(e) {
    var msgData = e.data.split(":");
    console.log("보낸사람 : ", msgData[0], ", 메세지 : ", msgData[1]);
    sendText(msgData[0], msgData[1]);
    fetch("http://localhost:8080/websocket/dataadd.jsp?userid=" + myID +
        "&message=" + msgData[1]);
}
socket.onclose = function(e) {
    console.log("closed");
}
function inputChatData(data) {
    console.log(data);
    for (var index=0; index < data.length; index++) {
        var userid = data.data[index].userid;  // 저장된 메시지의 보낸 사람 ID
        var message = data.data[index].message;  // 저장된 메시지 내용
        console.log(userid, message);
        sendText(userid, message); // 저장된 메시지 출력
    }
    console.log("이전 대화 불러오기 완료");
}

$(function() {
    fetch("http://localhost:8080/websocket/dataread.jsp")
    .then(response => response.json())
    .then(json => inputChatData(json))

    // userid 입력
    $("#idButton").on("click", function() {
        myID = $("#name").val();
    });

    // 클릭이나 엔터 이벤트
    textBox = $("#inputText");
    $("#enterButton").on('click', function() {
        // sendText(myID, textBox.val());
        socket.send(myID + ":" + $("#inputText").val());
        $("#inputText").val('');
        
    });
    $("#inputText").on("keypress", function(key) {
        if (key.which == 13) {
            socket.send(myID + ":" + $("#inputText").val());
            // sendText(myID, textBox.val());
            $("#inputText").val('');
        }
    });

    // 버튼 색상 활성화
    $("#inputText").on("input", function() {
        $("#enterButton").attr("class","turnOn"); 
    });
});

function sendText(currentID, message) {
    if (!message == "") {
        $("#enterButton").attr("class", "button"); // 버튼 꺼짐
        

        var myMsg = currentID + ": " + message;
        var messageClass = currentID === myID ? "text1" : "text2"; // 보낸 메시지와 받은 메시지를 구분
        $("#content").append("<div class='" + messageClass + "' id='text_" + num + "'>"
            + "<span>" + myMsg + "</span>"
            + "<img src='x.png' class='delete' onclick='delText(" + num + ")'>"
            + "</div>");
        
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
