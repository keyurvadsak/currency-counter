async function getUsdInrRate() {
    let fromcurr = "usd";
    let toselect = 'aed';

    // This url will give you currencies USD/XXX
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromcurr}.min.json`
    
    // Fetch data and get INR rate
    const inrRate = await fetch(url)
        .then(response => response.json())
        .then(data => {
            let tocurr = data[fromcurr][toselect];
            return tocurr; // Return the rate for USD to INR
        })
        .catch(error => console.error('Error fetching the currency data:', error));
        
    console.log(inrRate);
}

getUsdInrRate();