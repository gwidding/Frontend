// jQuery는 $표시 넣음
// $(function() {
//     console.log('load!!');
//     alert2();
// });

function alert2() {
    alert('hi');
}

// 메인
$(function() {
    $("#clickButton").on("click", function() {
        console.log('click');
        alert2();
        $("#clickButton").val("눌렸음");
        $("#moveLink").attr("href","https://daum.net");
    });

    $("#rightClick").on("contextmenu", function() {
        yell("#rightClick");
    });

    $("#doubleClick").on("dblclick", function() {
        console.log("더블클릭 됨");
        $(this).toggleClass("doubleClick");
    });

    $( "li" ).hover( function() {
        $( this ).append( $( "<span> ***</span>" ) );
        }, function() {
        $( this ).find( "span" ).last().remove();
        }
    );

    $("li.fade").hover(function() {
        $(this).fadeOut(100);
        $(this).fadeIn(500);
    });

    // 실습 예제
    $("#clickB").on("click", function() {
        if ( $("#inputText").val() == "") {
            alert("값을 입력하시오.");
        }
        else {
            $("#inputText").css("font-size", "30px");

            $("#redButton").remove();
            $("#blueButton").remove();
            $("#greenButton").remove();

            $("#box").append("<input type='button' id='redButton' value='빨강'>");
            $("#box").append("<input type='button' id='blueButton' value='파랑'>");
            $("#box").append("<input type='button' id='greenButton' value='초록'>");
            // 여기에 rgb버튼 동작 적어도 됨            
        }
        $("#redButton").on('click', function() {
            $("#inputText").css("color", "red");
        });
        $("#blueButton").on('click', function() {
            $("#inputText").css("color", "blue");
        });
        $("#greenButton").on('click', function() {
            $("#inputText").css("color", "green");
        });


    });

});

function yell(div) {
    $(div).toggleClass("contextmenu");
};