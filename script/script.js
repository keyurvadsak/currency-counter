const dropdowns = document.querySelectorAll(".dropdown select");
const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const button = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

console.log(tocurr.value);

let i = 0;
for (let select of dropdowns) {
    for (currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newOption.selected = "selected";
        }
        if (select.name === "to" && currcode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);

    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });

}


const updateFlag = (evt) => {
    // console.log(evt.value);
    selectcurrcode = evt.value;
    getcurrvalue = countryList[selectcurrcode];
    newSrc = `https://flagsapi.com/${getcurrvalue}/flat/64.png`;
    let img = evt.parentElement.querySelector("img");
    img.src = newSrc;

}

button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // console.log(amtVal);
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = '1';
    }

    const URLBASE = `${URL}/${fromcurr.value.toLowerCase()}.min.json`;
    let toCurrRate = await fetch(URLBASE)
    .then(response => response.json())
    .then(data => data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]);
    let totalAmount = amtVal * toCurrRate;
    msg.innerText = `${amtVal} ${fromcurr.value} = ${totalAmount.toFixed(2)} ${tocurr.value}`;
});



let showLatestCurrency = async () =>{
    const URLBASE = `${URL}/${fromcurr.value.toLowerCase()}.min.json`;
    let amtVal = "1";
    let toCurrRate = await fetch(URLBASE)
    .then(response => response.json())
    .then(data => data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]);

    let totalAmount = amtVal * toCurrRate;
    msg.innerText = `${amtVal} ${fromcurr.value} = ${totalAmount.toFixed(2)} ${tocurr.value}`;
}
window.addEventListener("load", () => {
    showLatestCurrency();
})