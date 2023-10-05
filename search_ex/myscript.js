$(function() {
    $("#buttonClick").on("click", function() {
        var searchText = $("#searchBox").val();
        var searchType = $("#searchTypeBox").val();
        if (searchType == 'web') {
            queryURL = "https://dapi.kakao.com/v2/search/web";
        } else if (searchType == 'image') {
            queryURL = "https://dapi.kakao.com/v2/search/image";
        } else if (searchType == 'video') {
            queryURL = "https://dapi.kakao.com/v2/search/vclip";
        }
        console.log(searchText);
        fetch(queryURL + "?query=" + searchText, {
            method: "GET",
            headers: {
                "Authorization": "KakaoAK 23e2440cbd2043f7f7057f53e62d4555",
                },
            bodys: JSON.stringify({

            }),
        })
        .then(response => response.json())
        .then(json => showData(json))
    });
});

function showData(data) {
    console.log(data);
    var totalCount = data.documents.length;
    $("#dataShow").empty();
    for(index = 0; index < totalCount; index++) {
        $("#dataShow").append(drawContents(data));
    }
}

function drawContents(data) {
    var searchType = $("#searchTypeBox").val();
    if (searchType == 'web') {
        returnText = "<p><a target=_blank href=" + data.documents[index].url + ">" + 
        "제목 : " + data.documents[index].title + "<br>" + 
        data.documents[index].contents + "</a></p>";
    } else if (searchType == 'image') {
        returnText = "<p><img style='width:100px; height:100px;' src=" + data.documents[index].image_url + "></p>";
    } else if (searchType == 'video') {
        returnText = "<p><a target=_blank href=" + data.documents[index].url + ">" + 
        data.documents[index].title + 
        "<br><img style='width:100px; height:100px;' src=" + 
        data.documents[index].thumbnail + "></a></p>";
    }
    return returnText;
}
