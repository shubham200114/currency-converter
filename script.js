const  Base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"; //coundrey api//api link=https://github.com/fawazahmed0/currency-api?tab=readme-ov-file#redme

const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");//axes from
const tocurr = document.querySelector(".to select");//axes to
const msg = document.querySelector(".msg");

//change coundrey name
const dropdowns = document.querySelectorAll(".dropdown select");
for(let select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currcode;
        newOption.value = currcode;
        //bydefualt name
        if(select.name ==="from" && currcode ==="USD"){
            newOption.selected ="selected";

        }else if(select.name ==="to"&& currcode ==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

//update the flage
const updateFlag =(element)=>{
let currcode = element.value;
let countrycode = countryList[currcode];
let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;// use flage api link to chnge flage//pass the selecting coundry code
let img= element.parentElement.querySelector("img");
img.src= newsrc;
};


//change amount
btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    

    //creat url using base url

    const URL=`${Base_url}/${ fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
     let response =await fetch(URL);
     let data= await response.json();
     let rate = data [tocurr.value.toLowerCase()];
     let finalamount = amtval * rate ;
     msg.innerText =`${amtval} ${fromcurr.value} =${finalamount}${tocurr.value}`;
});