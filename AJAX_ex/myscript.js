kakao.maps.load(function() {
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(37.528398, 126.933092),
        level: 3
    };
    var map = new kakao.maps.Map(container, options);


    var positions = [
        {
            title: '카카오', 
            latlng: new kakao.maps.LatLng(33.450705, 126.570677)
        },
        {
            title: '생태연못', 
            latlng: new kakao.maps.LatLng(33.450936, 126.569477)
        },
        {
            title: 'bbq치킨 맛있겠다....',
            latlng: new kakao.maps.LatLng(37.5524, 126.9214)
        }
    ];
    
    // 마커 이미지의 이미지 주소입니다
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
    for (var i = 0; i < positions.length; i ++) {
        
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35); 
        
        // 마커 이미지를 생성합니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage // 마커 이미지 
        });
    }

    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
        // 클릭한 위도, 경도 정보를 가져옵니다 
        var latlng = mouseEvent.latLng;
        
        var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';
        
        var resultDiv = document.getElementById('result'); 
        resultDiv.innerHTML = message;

        // position.push({title:'마커', latlng: new kakao.maps.LatLng(latlng.getLat(), latlng.getLng())});
        
    });

    var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
    var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
    var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

    var position = new kakao.maps.LatLng(37.528398, 126.933092);

    // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
    roadviewClient.getNearestPanoId(position, 50, function(panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
    });

});



$(function() {
    $("#buttonClick").on("click", function() {
        fetch('https://api.weatherapi.com/v1/current.json?key=ed4664a06ce54cabbb064628230410&q=bulk')
        .then(response => response.json())
        .then(json => showData(json))
        // .then(json => console.log(json.current.cloud))
        // 이런 식으로 접근 가능
    });

    
    $("#buttonRate").on("click", function() {
        fetch('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD')
        .then(response => response.json())
        .then(json => console.log(json[0].basePrice))
        .then(json => showData(json))
    });

});

function showData(data) {
    console.log(data);
    $("#dataShow").html(data.current.temp_f);
    // $("#dataShow").html(data.code);
}



