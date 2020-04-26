import { baseURL,TRENDINGURL,input} from "./config.js";
/* project is unfinished I could not do removing elements from localStorage */ 
class giphy{
    constructor(url,text=""){
        this._url=url;
        this._keyword=text;
    };
/*fetch data*/
    async recieveData(){
         let u = new URLSearchParams();
         if(this._url===baseURL){
             u.append(`q`,`${this._keyword}`);
             localStorage.setItem(this._keyword,this._keyword);
         }
         u.append('format', 'json');
         u.append(`api_key`,"aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB");
         u.append('mode','Cross-Origin')
   const response =await fetch(this._url+u);
   const responses=await response.json();
    return responses.data;
};


 _clear(){
    document.getElementById("contents").innerHTML="";
    
}
/*draw function to draw content*/
    async _draw()
{
     this._clear();
    const response =await  this.recieveData();
    //console.log(response);
        response.map(gif=>{
            let div=  document.createElement("div");
            div.classList.add("gifs");
           div.innerHTML= `<img src=${gif.images.original.url} alt="Gif did not load" class="gif">
           <p> Rating : ${gif.rating}</p>`;
             document.getElementById("contents").append(div);   
        })
   }

}

/*local storage */

const topics = ["Internet Cats", "Meme's", "typing","Rick and Morty"];
 topics.map(e=>localStorage.setItem(e,e));


 /*update storage*/
Object.keys(localStorage).map(k=>{
    
    let btn =document.createElement("button");
   const icn = document.createElement("i");
   
    btn.setAttribute("class", "quick-search");
    btn.innerHTML=localStorage.getItem(k);
    icn.classList.add(`fas`);
   icn.classList.add(`fa-times`);
   icn.classList.add(`close-icon`);
   icn.classList.add(`close`);
   btn.appendChild(icn);
   /*es nawili ar mushaob da tu shegidzliat rom mitxrat mere ratom */
   icn.addEventListener('click',function(){
       removeLocalStorage(localStorage.getItem(k));
   },false);

   /* get elements by clicking on the buton*/
   btn.addEventListener('click',function() {
        searchButtonClick(localStorage.getItem(k));
    }, false);
    document.getElementById("buttons").append(btn);
})

function removeLocalStorage(e){
    localStorage.removeItem(e);
}

function drawTrending(){
    const tr = new giphy(TRENDINGURL);
    tr._draw();
}


function searchButtonClick(k){
    let search = new giphy(baseURL,k);
    search._draw();
}
/*clears button*/
function clearButtons(){
    document.getElementById("buttons").innerHTML="";
}
/*here I re-update localStorage so it will work dynamically*/
function drawSearchResult(){
    let search = new giphy(baseURL,document.getElementById("input").value);
    search._draw();
    // clearButtons();
    // Object.keys(localStorage).map(k=>{
    //     let btn =document.createElement("div");
    //     btn.classList.add("quick-search");
    //    btn.innerHTML=`<button  class="button" value="${localStorage.getItem(k)}" id="buttons"><span class="close" id="close" name="${localStorage.getItem(k)}">X</span></button>`;
    //    document.getElementById("buttons").append(btn);
    // })
}




document.getElementById("trending").addEventListener('click', drawTrending);
document.getElementById("submit").addEventListener('click',drawSearchResult);


