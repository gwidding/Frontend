let indexBox = 1;

var myID = "";

url = "ws://192.168.22.67:8081";
socket = new WebSocket(url);

socket.onopen = function () {
  console.log("open");
};
socket.onmessage = function (e) {
  // console.log("이전 데이터 " + str);
  var msgData = e.data.split(":");
  console.log("보낸사람 ID: ", msgData[0]);
  if (msgData[0] !== myID) {
    console.log("메세지 왔어요!!!", msgData[1]);
    contextData_receive(msgData[1]);
  } else {
    console.log("내가 메세지 보냇어요!!!", e.data);
  }
};
socket.onclose = function (e) {
  console.log("closed");
};

$(function () {
  $("#IDclickButton").on("click", function () {
    myID = $("#IDinputText").val();
  });

  $("#boxTyping").on("keydown", function (event) {
    if ($(this).val() === " ") {
    }
    if (event.key == "Enter") {
      if ($(this).val() !== "" || $(this).val() !== " ") {
        var myMsg = myID + ":" + $(this).val();
        // console.log("내아이디: ", myMsg);
        contextData_send(myID, $(this).val());
        socket.send(myMsg);
      }
      $(this).val("");
    }
  });
  $("#boxAssign").on("click", function () {
    if ($("#boxTyping").val() !== "") {
      contextData_send($("#boxTyping").val());
    }
    $("#boxTyping").val("");
  });
});

function contextData_send(ID, msg) {
  // console.log("여기까지오나요?   ", msg, "\n박스 숫자: ", indexBox);

  $("#boxContents").append(
    "<div class='textContents' id='messageBox" +
      indexBox +
      "'>" +
      "<div class='textEditBox'>" +
      "<input type='button' onclick='removeContent(" +
      indexBox +
      ")' value='x'/>" +
      "</div>" +
      "<span class='textBox' id='textBox" +
      indexBox +
      "'>" +
      msg +
      "</span> </div>"
  );
  console.log("보낸거: " + msg);
  str = msg;
  // console.log(indexBox);
  indexBox++;
}

function contextData_receive(msg) {
  // console.log("여기까지오나요?   ", msg, "\n박스 숫자: ", indexBox);
  $("#boxContents").append(
    "<div class='textContents' id='messageBox" +
      indexBox +
      "'>" +
      "<span class='textBox2' id='textBox" +
      indexBox +
      "'>" +
      msg +
      "</span>" +
      "<div class='textEditBox'>" +
      "</div>" +
      " </div>"
  );
  // console.log(indexBox);
  indexBox++;
}
function removeContent(index) {
  console.log("메세지 삭제");
  $("#messageBox" + index).remove();
}
