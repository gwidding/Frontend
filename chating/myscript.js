let num = 0;
$(function() {  

    text = $("#inputText");

    function addText() {
        if (!text.val() == "") {
            $("#enterButton").attr("class", "button");

            let currNum = num;
            $("#content").append("<img src='x.png' class='delete' data-index='" + currNum + "' id='del_" + currNum + "'>")
            $("#content").append("<div class='text' id='text_" + currNum + "'>" + text.val() + "</div>");
            
            text.val('');
            num++;

            $("#del_" + currNum).on('click', function() {
                const delIdx = $(this).data("index");
                delText(delIdx);
            });
        } else {
            console.log("입력 값 없음");
        }

        $("#content").stop().animate({ scrollTop: "+=1000px" }, "fast");
    }

    function delText(idx) {
        $("#text_" + idx).remove();
        $("#del_" + idx).remove();
    }

    $("#enterButton").on('click', addText);
    $("#inputText").on("keypress", function(key) {
        if (key.which == 13) {
            addText();
        }
    });

    // 버튼 색상 활성화
    $("#inputText").on("input", function() {
        $("#enterButton").attr("class","turnOn"); 
    });  
    
});