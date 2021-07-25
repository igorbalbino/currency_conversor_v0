/*declara vars*/
const nomicsKey = '58af62e7eeea4f243b05123b7c1c1316e573fd02';

/*declara funcs*/
async function loadCryptoCurrencies (){
	// let url 					= 'https://api.nomics.com/v1/';
	// let endpoint 				= 'currencies?key=' + nomicsKey;
	let url 					= 'https://api.coingecko.com/api/v3/';
	let endpoint 				= 'coins/list';
	let uri 					= url + endpoint;
	// let method 					= 'GET';
	let select_element_left 	= document.querySelector('#select_cryptocurrency_left');
	let select_element_right 	= document.querySelector('#select_cryptocurrency_right');
	let cryptocurrencies 		= null;
	
	cryptocurrencies = await fetch(uri, { headers: { "Content-Type": "application/json; charset=utf-8" }})
    .then(res => res.json())
	.then(response => {
		console.log(response);
		for (let i = 0; i <= response.length; i++) {
			createOptionToElement(select_element_left, response[i]['id']);
			createOptionToElement(select_element_right, response[i]['id']);
		}
	})
    .catch(err => {
        console.log(err);
		console.log("sorry, we couldn't find the currencies");
        //alert("sorry, we couldn't find the currencies");
    });
}

function switchFromAndTo() {
	/*pega elementos da tela*/
	let selectFrom = document.getElementById("select_cryptocurrency_left");
	let selectTo = document.getElementById("select_cryptocurrency_right");
	
	let auxValueFrom = selectFrom.value;
	let auxValueTo = selectTo.value;
	
	selectFrom.value = auxValueTo;
	selectTo.value = auxValueFrom;
}

function createOptionToElement(element, data) {
	let opt_element = document.createElement('option');
	opt_element.value = data;
	opt_element.innerHTML = data;
	element.append(opt_element);
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
	let selectFrom = document.getElementById("select_cryptocurrency_left");
	let selectTo = document.getElementById("select_cryptocurrency_right");
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
        alert("sorry, there was a problem with the result.");
    });
	
}

/*declara ações*/
window.onload = loadCryptoCurrencies();
