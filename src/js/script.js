let pubKey = `1e19898c87464e239192c8bfe422f280`;
let privKey = `4289fec4e962a33118340c888699438d`;

const corsURL = `https://cors-anywhere.herokuapp.com/`;
const endpoint = `https://zoeken.oba.nl/api/v1/search/?q=`;
let query = `ondernemen`;

let book = `&dim=Type(book)`
let topic = `&dim=Topic(Ondernemerschap)`

let url = `${corsURL}${endpoint}${query}&authorization=${pubKey}&output=json`;

const config = {
    Authorization: `Bearer ${privKey}`
  };

// function makeConnection(){
//     fetch(url, config)
//     .then(response => {
//             console.log('connectie klopt')
//             console.log(url)
//             return response.json();           
//     })
//     .then(data =>{
//         loaddata(data)
//     })
//     .catch(error =>{
//         if(error === '429'){
//             console.log(error)
//             console.log(url)
//             pubKey = `0076bc3bc11d080e07a303360178002a`
//             privKey = `187b973dc49e054fa7635313a9c8540f`
//             makeConnection();
//             // getDataOffline(); 
//         }
//     })  
// }

// makeConnection()

function loaddata(data){
    console.dir(data.results)
}

const getDataOffline = async () => {
    const res = await fetch("../src/json/data.json");
    const data = await res.json();
    console.log(data.results);
}

// **** Intro **** //

let introIndex = 1; // start positie

const introPrevious = document.querySelector(`section div button:first-child`)
const introNext = document.querySelector(`section div button:last-child`)
introPrevious.style.color = `rgba(205 205 205 / 90%)`
document.querySelector(`section div ul li:first-child span`).style.backgroundColor = `red`

introNext.addEventListener("click", function(){
    if(introIndex == 5){
        // verderbutton disabled maken
      }else{
        document.querySelector(`section>ul li:nth-child(${introIndex})`).style.display = `none`
        introIndex++
        document.querySelector(`section>ul li:nth-child(${introIndex})`).style.display = `flex`
        introPrevious.style.color = `black`

        document.querySelector(`section div ul li:nth-child(${introIndex}) span`).style.backgroundColor = `red`
      }
      checkNeedLoad();
})

introPrevious.addEventListener("click", function(){
    if(introIndex == 1){
        // terugknop disabled maken
        introPrevious.style.color = `rgba(205 205 205 / 90%)`
        document.querySelector(`section div ul li:first-child span`).style.backgroundColor = `red`
      }else{
        document.querySelector(`section div ul li:nth-child(${introIndex}) span`).style.backgroundColor = `white`
        document.querySelector(`section>ul li:nth-child(${introIndex})`).style.display = `none`
        introIndex--
        document.querySelector(`section>ul li:nth-child(${introIndex})`).style.display = `flex`

        if(introIndex == 1){
            introPrevious.style.color = `rgba(205 205 205 / 90%)`
            document.querySelector(`section div ul li:first-child span`).style.backgroundColor = `red`
        }
    }
    checkNeedLoad();
})

// boeken inladen

function checkNeedLoad(){
    switch(introIndex){
        case 2:
            console.log('case 2')
            renderBooks()
        break;
        case 3:
            console.log('case 3')
        break;
        case 4:
            console.log('case 4')
        break;
        case 5:
            console.log('case 5')
        break;
    }
}

async function getBooks(){
    url = `${corsURL}${endpoint}${query}&authorization=${pubKey}&output=json`;
    // makeConnection()
    try{
        response = await fetch(url);
        return await response.json();
    }
    catch(error){
        getError()
    }
}

async function renderBooks(){
    let books = await getBooks();
            console.log(books)

    let i
        for(i = 0; i < 7; i++){
            document.querySelector(`.book-${i}`).innerHTML = ''
            document.querySelector(`.book-${i}`).insertAdjacentHTML('beforeend',`<img src="${books.results[i].coverimages[1]}" alt="">`)
        }
}
// **** Eind intro **** //

async function getError(){
    if(response.status === 429){
        console.log(`%c Alweer... | ${response.statusText}`, `color:red;font-weight:bold;`)
    }else if(response.status === 403){
        console.log(`%c Geen toegang`, `color:red;font-weight:bold;`)
        console.log(`%c Vraag opnieuw toegang aan: https://cors-anywhere.herokuapp.com/corsdemo`, `color:red;font-weight:bold;`)
    }
}