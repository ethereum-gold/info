function price() {
    $.getJSON("https://dividend-gold-api.herokuapp.com/price", function(e) {
        $(".eth_price").text(parseFloat(e.eth_price).toFixed(2)), $(".btc_price").text(parseFloat(e.btc_price).toFixed(2)), $(".bnb_price").text(parseFloat(e.bnb_price).toFixed(2))
    })
}
price();

//iframe change
var statsChainRecord = "ethereum";

function ethereum() {
    if (statsChainRecord == "ethereum") {
        //do nothing
    } else {
        statsChainRecord = "ethereum";
        document.getElementById("myframe").src = "./charts/bnb/ContractBalanceBNG.html";
        document.getElementById('ethereum').setAttribute('class', 'fPKMKF');
        document.getElementById('bitcoin').setAttribute('class', 'surrJ');
        document.getElementById('binance').setAttribute('class', 'surrJ');
       
    }
}

function bitcoin() {
    if (statsChainRecord == "bitcoin") {
        //do nothing
    } else {
        statsChainRecord = "bitcoin";
        document.getElementById("myframe").src = "./charts/bnb/TotalSupplyBNG.html";
        document.getElementById('ethereum').setAttribute('class', 'surrJ');
        document.getElementById('bitcoin').setAttribute('class', 'fPKMKF');
        document.getElementById('binance').setAttribute('class', 'surrJ');
      
    }
}

function binance() {
    if (statsChainRecord == "binance") {
        //do nothing
    } else {
        statsChainRecord = "binance";
        document.getElementById("myframe").src = "./charts/bnb/PriceBNBBNG.html";
        document.getElementById('ethereum').setAttribute('class', 'surrJ');
        document.getElementById('bitcoin').setAttribute('class', 'surrJ');
        document.getElementById('binance').setAttribute('class', 'fPKMKF');
    }
}