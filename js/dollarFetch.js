const dollarNow = document.querySelector("#dollarNow"),
dollarBlueNow = document.querySelector("#dollarBlueNow"),
formDollar = document.querySelector("#formDollar"),
inputPrice = document.querySelector("#inputPrice"),
currency = document.querySelector('#currency'),
writingInput = document.querySelector("#writingInput"),
iva8Span = document.querySelector("#iva8Span"),
iva30Span = document.querySelector("#iva30Span"),
iva35Span = document.querySelector("#iva35Span"),
arsValue = document.querySelector("#arsValue"),
totalIva = document.querySelector("#totalIva"),
total = document.querySelector("#total"),
printButton = document.querySelector('#printButton');

let dollarPrice, dollarBluePrice, euroPrice, btcPrice, ethPrice, bnbPrice, btcData, ethData, bnbData, newPrice, typeCurrency, iva8Value, iva30Value, iva35Value, totalIvaValue, totalValue;

let variableDollar;

async function dollarFetch() {
    let response = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
    let data = await response.json();
    dollarData =  data[0].casa.venta;
    dollarBlueData = data[1].casa.venta;
    dollarNow.innerHTML = `${dollarData}`
    dollarBlueNow.innerHTML = `${dollarBlueData}`
    dollarPrice = dollarData
    dollarBluePrice = dollarBlueData;
  }
dollarFetch()

async function eurFetch(){
  let response = await fetch('https://api.binance.com/api/v1/ticker/price?symbol=EURUSDT');
  let data = await response.json();
  euroData = data.price;
  euroPrice = euroData;
}
eurFetch()

async function btcFetch(){
  let response = await fetch('https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT');
  let data = await response.json();
  btcData = data.price;
  btcPrice = btcData;
}
btcFetch()

async function ethFetch(){
  let response = await fetch('https://api.binance.com/api/v1/ticker/price?symbol=ETHUSDT');
  let data = await response.json();
  ethData = data.price;
  ethPrice = ethData;
}
ethFetch()

async function bnbFetch(){
  let response = await fetch('https://api.binance.com/api/v1/ticker/price?symbol=BNBUSDT');
  let data = await response.json();
  bnbData = data.price;
  bnbPrice = bnbData;
}
bnbFetch()

// async function euroFetch(){
    // let response = await fetch('https://api-dolar-argentina.herokuapp.com/api/euro/nacion')
    // let data = await response.json();
    // let euroData =  data.venta;
    // console.log(euroData)
   // return 127.02;
// }


setInterval(() => {
  dollarFetch()
}, 100000);

formDollar.addEventListener("submit", async (e) => {  	
	e.preventDefault()

  switch(currency.value){
    case 'USD':
      newPrice = inputPrice.value * parseFloat(dollarPrice);
      typeCurrency = 'fiat';
      break;
    case 'USD Blue':
      newPrice = inputPrice.value * parseFloat(dollarBluePrice);
      typeCurrency = 'blue';
      break;
    case 'EUR':
      newPrice = inputPrice.value * parseFloat(euroPrice) * parseFloat(dollarPrice);      
      typeCurrency = 'fiat';
      break; 
    case 'ARS':
      newPrice = inputPrice.value * 1;      
      typeCurrency = 'fiat';
      break;
    case 'BTC':
      newPrice = inputPrice.value * parseFloat(btcPrice) * parseFloat(dollarBluePrice);
      typeCurrency = 'crypto';
      break;
    case 'ETH':
      newPrice = inputPrice.value * parseFloat(ethPrice) * parseFloat(dollarBluePrice);
      typeCurrency = 'crypto';
      break;
    case 'BNB':
      newPrice = inputPrice.value * parseFloat(bnbPrice) * parseFloat(dollarBluePrice);
      typeCurrency = 'crypto';
  }

	arsValue.innerHTML = `ARS ${newPrice.toLocaleString('es-AR')}`;

  iva8Value = Number((newPrice * 0.08))
	iva30Value = Number((newPrice * 0.3));
	iva35Value = Number((newPrice * 0.35));
	
  if(typeCurrency === 'fiat'){
    iva8Span.innerHTML = `ARS ${iva8Value.toLocaleString('es-AR')}`;
    iva30Span.innerHTML = `ARS ${iva30Value.toLocaleString('es-AR')}`;
    iva35Span.innerHTML = `ARS ${iva35Value.toLocaleString('es-AR')}`;
    totalIvaValue = Number((iva8Value + iva30Value + iva35Value).toFixed(2)); 
  }
  else if(typeCurrency === 'crypto' || typeCurrency === 'blue'){
    iva8Span.innerHTML = 'ARS 0';
    iva30Span.innerHTML = 'ARS 0';
    iva35Span.innerHTML = 'ARS 0'; 
    totalIvaValue = 0;
  }
  totalIva.innerHTML = `ARS ${totalIvaValue.toLocaleString('es-AR')}`;  
	totalValue = (newPrice + totalIvaValue);  
  total.innerHTML = `ARS ${totalValue.toLocaleString('es-AR')}`;
})

inputPrice.addEventListener('input', () => {
  if(inputPrice.value === ''){
    arsValue.innerHTML = '';
    iva8Span.innerHTML = ''
    iva30Span.innerHTML = ''
    iva35Span.innerHTML = ''
    totalIva.innerHTML = '';
    total.innerHTML = `ARS 0`;
  }
})

printButton.addEventListener('click', () => {
  print()
})
