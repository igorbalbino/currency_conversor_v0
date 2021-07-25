// const openExchangeRatesKey                = 'app_id=4e4d6fb2c3414ff3bed2e3b5a5d87c97';
// const openExchangeRatesKeyV2              = 'app_id=d239241aecd54f6c9e9008225a2d9bf6';
// const data_fixerKey                       = 'access_key=0be03d3c98fb23fd753ad6dcedea4067';

function loadFiatCurrencies (){
	let url = 'http://openexchangerates.org/api/';
	let endpoint = 'currencies.json';
	let uri = url + endpoint;
	//let method = 'GET';
	let select_element_left = document.querySelector('#select_fiat_currency_left');
	let select_element_right = document.querySelector('#select_fiat_currency_right');
	let currencies = null;
	
	currencies = fetch(uri, { headers: { "Content-Type": "application/json; charset=utf-8" }})
    .then(res => res.json())
	.then(response => {
		createOptionToElement(select_element_left, response);
		createOptionToElement(select_element_right, response);
	})
    .catch(err => {
        console.log(err);
        alert("sorry, we couldn't find the currencies")
    });
}

function switchFromAndTo() {
	/*pega elementos da tela*/
	let selectFrom = document.getElementById("select_fiat_currency_left");
	let selectTo = document.getElementById("select_fiat_currency_right");
	
	let auxValueFrom = selectFrom.value;
	let auxValueTo = selectTo.value;
	
	selectFrom.value = auxValueTo;
	selectTo.value = auxValueFrom;
}

function createOptionToElement(element, datas) {
	for (data in datas) {
		let opt_element = document.createElement('option');
		opt_element.value = data;
		opt_element.innerHTML = data;
		element.append(opt_element);
	}
}

function replaceVirgulaToDot(n) {
	if (toString(n).includes(',')) {
		let str = toString(n);
		str = str.replace(',','.');
		return parseFloat(str);
	} else {
		return n;
	}
}

function convertValue() {
	/*pega elementos da tela*/
	let selectFrom = document.getElementById("select_fiat_currency_left");
	let selectTo = document.getElementById("select_fiat_currency_right");
	let inputValue = document.getElementById("valueToConvert");
	let resultValue = document.getElementById("conversionResult");
	
	/*formata valor para conversão*/
	inputValue.value = replaceVirgulaToDot(inputValue.value);
	
	/*seta valores para fetch*/
	let url = "https://api.exchangerate.host/";
	let endpoint = 'convert?from=' + selectFrom.value + '&to=' + selectTo.value + '&amount=' + inputValue.value; /**exchangerate.host */
	let uri = url + endpoint;
	
	result = fetch(uri, { headers: { "Content-Type": "application/json; charset=utf-8" }})
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
	.then(response => {
		resultValue.innerHTML = null;
		resultValue.innerHTML = response.result;
	})
    .catch(err => {
        console.log(err);
        alert("sorry, there was a problem with the result.")
    });
	
}

window.onload = loadFiatCurrencies();
