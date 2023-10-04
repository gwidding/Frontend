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
