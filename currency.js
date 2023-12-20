const URL =   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const btn = document.querySelector("button");
const dropdown = document.querySelectorAll("select");
const fromCurr = document.querySelector("#fromSelect");
const toCurr = document.querySelector("#toSelect");
const msg = document.querySelector("#msg");

for(let select of dropdown){
     for(code in countryList){
          let option = document.createElement("option");
          option.innerText = code;
          option.value = code;
          if(select.name==="from" && code==="INR"){
               option.selected = "selected";
          }
          else if(select.name==="to" && code==="USD"){
               option.selected = "selected";
          }
          select.append(option);
     }

     select.addEventListener("change" , (evt)=>{
          changeFlag(evt.target);
     })
}

const changeFlag = (ele)=>{
     let code = ele.value;
     let country = countryList[code];
     let countryURL = `https://flagsapi.com/${country}/flat/64.png`;
     let img = ele.parentElement.querySelector("img");
     img.src = countryURL;
}

btn.addEventListener("click" , ()=>{
     currencyRATE();
})

const currencyRATE = async ()=>{
     let amount = document.querySelector(".amount input");
     let value = amount.value;
     if(value === "" || value < 1){
          value = 1;
          amount.value = 1;
     }

     let secondURL = `${URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
     let returnAmount = await fetch(secondURL);
     let transfer = await returnAmount.json();
     let rate = transfer[toCurr.value.toLowerCase()];

     let finalAmount = rate * value;    
     msg.innerText = `${value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

window.addEventListener("load" , ()=>{
     currencyRATE();
})

let icon = document.querySelector("#change");
let click = false;
icon.addEventListener("click" , ()=>{
     if(click === false){
          changeIcon();
          click = true;
     }
     else{
          click = false;
          changeIcon();
     }
})

let img1 = document.querySelector("#img1");
let img2 = document.querySelector("#img2");

const changeIcon = ()=> {
     let temp = fromCurr.value;
     fromCurr.value = toCurr.value;
     toCurr.value = temp;
     let tempImg = img1.src;
     img1.src = img2.src;
     img2.src = tempImg;
     currencyRATE();
}
