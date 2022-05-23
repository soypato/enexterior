const dollarNow = document.querySelector("#dollarNow"),
dollarBlueNow = document.querySelector("#dollarBlueNow"),
formDollar = document.querySelector("#formDollar"),
inputPrice = document.querySelector("#inputPrice"),
writingInput = document.querySelector("#writingInput"),
iva8Span = document.querySelector("#iva8Span"),
iva30Span = document.querySelector("#iva30Span"),
iva35Span = document.querySelector("#iva35Span"),
dollarValue = document.querySelector("#dollarValue"),
totalIva = document.querySelector("#totalIva"),
total = document.querySelector("#total"),
printButton = document.querySelector('#printButton');

let dollarPrice, arsToDollar, iva8Value, iva30Value, iva35Value, totalIvaValue, totalValue;

let variableDollar;

async function dollarFetch() {
    const response = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
    const data = await response.json();
    let dollarData =  data[0].casa.venta;
    let dollarBlueData = data[3].casa.venta;
    dollarNow.innerHTML = `${dollarData}`
    dollarBlueNow.innerHTML = `${dollarBlueData}`
    return dollarData;
  }
dollarFetch()

setInterval(() => {
  dollarFetch()
}, 100000);

inputPrice.addEventListener("input", async (e) => {  
	writingInput.innerHTML = `USD ${inputPrice.value}` 

	
	dollarPrice = await dollarFetch();
	arsToDollar = inputPrice.value * Math.round(parseInt(dollarPrice));

	dollarValue.innerHTML = `= ARS ${arsToDollar}`;

  iva8Value = Number((arsToDollar * 0.08))
	iva30Value = Number((arsToDollar * 0.3));
	iva35Value = Number((arsToDollar * 0.35));

  iva8Span.innerHTML = `+ ARS ${iva8Value.toFixed(2)}`;
	iva30Span.innerHTML = `+ ARS ${iva30Value.toFixed(2)}`;
	iva35Span.innerHTML = `+ ARS ${iva35Value.toFixed(2)}`;
	
	totalIvaValue = Number((iva8Value + iva30Value + iva35Value).toFixed(2)); 
  totalIva.innerHTML = `= ARS ${totalIvaValue}`;

	totalValue = (arsToDollar + totalIvaValue);  
  total.innerHTML = `ARS ${totalValue.toFixed(2)}`;

  
  if(inputPrice.value === ''){
    writingInput.innerHTML = '...'
    dollarValue.innerHTML = '...';
    iva8Span.innerHTML = '...'
    iva30Span.innerHTML = '...'
    iva35Span.innerHTML = '...'
    totalIva.innerHTML = '...';
    total.innerHTML = `ARS 0`;

  }
})

printButton.addEventListener('click', () => {
  print()
})
