let pubKey = `1e19898c87464e239192c8bfe422f280`;
let privKey = `4289fec4e962a33118340c888699438d`;

const corsURL = `https://cors-anywhere.herokuapp.com/`;
const endpoint = `https://zoeken.oba.nl/api/v1/search/?q=`;
let query = `ondernemen`;

const refine = `&refine=true`

const book = `&facet=Type(book)`
const audiobook = `&facet=Type(audiobook)`
const film = `&facet=Type(movie)`
const schooltv = `&facet=Type(schooltv)`
const uitreksel = `&facet=Type(excerpt)`
const activities = `&facet=activiteiten(g_thisyear)`


let topic = `&facet=Topic(Ondernemerschap)`

let url = `${corsURL}${endpoint}${query}${refine}&authorization=${pubKey}&output=json`;

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

// const getDataOffline = async () => {
//     const res = await fetch("../src/json/data.json");
//     const data = await res.json();
//     console.log(data.results);
// }

// **** Intro **** //

let introIndex = 1; // start positie

const introPrevious = document.querySelector(`section div button:first-child`)
const introNext = document.querySelector(`section div button:last-child`)
const introSection = document.querySelector(`section[title="Introductie ondernemen"]`)
const optionSection = document.querySelector(`  section[title="onderwerpen selecteren"]`)

introPrevious.style.color = `rgba(205 205 205 / 90%)`
document.querySelector(`section div ul li:first-child span`).style.backgroundColor = `red`

introNext.addEventListener("click", function(){
    if(introIndex == 5){
        // verderbutton disabled maken
        introSection.style.setProperty('display', 'none')
        optionSection.style.setProperty('display', 'flex')
      }else{
        // document.querySelector(`section>ul>li:nth-child(${introIndex})`).style.display = `none`
        document.querySelector(`section>ul>li:nth-child(${introIndex})`).style.setProperty('display', 'none') 
        introIndex++
        // document.querySelector(`section>ul>li:nth-child(${introIndex})`).style.display = `flex`
        document.querySelector(`section>ul>li:nth-child(${introIndex})`).style.setProperty('display','flex')
        introPrevious.style.setProperty('color','black')
        document.querySelector(`section div ul li:nth-child(${introIndex}) span`).style.setProperty('background-color' , 'red')
      }
      checkNeedLoad();
})

introPrevious.addEventListener("click", function(){
    if(introIndex == 1){
        // terugknop disabled maken
        introPrevious.style.setProperty('color','rgba(205 205 205 / 90%)')
        // document.querySelector(`section div ul li:first-child span`).style.backgroundColor = `red`
        document.querySelector(`section div ul li:first-child span`).style.setProperty('background-color' , 'red')
      }else{
        document.querySelector(`section div ul li:nth-child(${introIndex}) span`).style.setProperty('background-color' , 'white')
        document.querySelector(`section>ul>li:nth-child(${introIndex})`).style.setProperty('display', 'none') 
        introIndex--
        document.querySelector(`section>ul>li:nth-child(${introIndex})`).style.setProperty('display','flex')

        if(introIndex == 1){
            introPrevious.style.color = `rgba(205 205 205 / 90%)`
            document.querySelector(`section div ul li:first-child span`).style.setProperty('background-color' , 'red')
        }
    }
    checkNeedLoad();
})

// boeken inladen

function checkNeedLoad(){
    switch(introIndex){
        case 2:
            console.log('case 2')
            url = `${corsURL}${endpoint}${query}${book}${refine}&authorization=${pubKey}&output=json`;
            console.log(url)
            renderBooks()
        break;
        case 3:
            console.log('case 3')
            url = `${corsURL}${endpoint}${query}${audiobook}${refine}&authorization=${pubKey}&output=json`;
            renderAudioBooks()
        break;
        case 4:
            url = `${corsURL}${endpoint}${query}${film}${refine}&authorization=${pubKey}&output=json`;
            console.log('case 4')
            renderMovies()
        break;
        case 5:
            url = `${corsURL}${endpoint}${query}${activities}${refine}&authorization=${pubKey}&output=json`;
            console.log('case 5', url)
            renderActivities()
        break;
    }
}

async function getData(){
    // makeConnection()
    console.log(url)
    try{
        response = await fetch(url);
        return await response.json();
    }
    catch(error){
        getError()
    }
}

async function renderBooks(resultaten){
    let books = await getData();
            console.log(books)


    let i
        for(i = 0; i < 7; i++){
            let boek = document.querySelector(`.book-${i}`)
            boek.innerHTML = ''
            boek.insertAdjacentHTML('beforeend',`<img src="${books.results[i].coverimages[1]}" alt="">`)
        }
}

async function renderAudioBooks(){    
    let luisterBoeken = await getData();
    console.log(luisterBoeken)

    let i
    for(i = 0; i < 7; i++){
        let luisterBoek = document.querySelector(`.container2>.book-${i}`)
        luisterBoek.innerHTML = ''
        luisterBoek.insertAdjacentHTML('beforeend',`<img src="${luisterBoeken.results[i].coverimages[1]}" alt="">`)
    }
}

async function renderMovies(){
    let films = await getData();
    console.log(films)

    let i
    for(i = 0; i < 7; i++){
        let movies = document.querySelector(`section[title="Introductie ondernemen"]>ul>li:nth-child(4) .container>.book-${i}`)
        movies.innerHTML = ''
        movies.insertAdjacentHTML('beforeend',`<img src="${films.results[i].coverimages[1]}" alt="">`)
    }
}

async function renderActivities(){
    let activities = await getData()
    console.log(activities)

    let i
    for(i = 1; i < 3; i++){ // als ik bij 0 begin, dan vraagt ie om nth-child(0)
        let listItem = document.querySelector(`section[title="Introductie ondernemen"]>ul>li:nth-child(5) ul li:nth-child(${i})`)
        listItem.innerHTML = ''
        listItem.insertAdjacentHTML('beforeend', `<img src="${activities.results[i-1].coverimages[0]}" alt=""><h3>${activities.results[i-1].titles[0]}</h3>`)
    }
}
// **** Eind intro **** //

async function getError(){
    if(response.status === 429){
        console.log(`%c Alweer... | ${response.statusText}`, `color:red;font-weight:bold;`)
    }else if(response.status === 403){
        console.log(`%c Geen toegang`, `color:orange;font-weight:bold;`)
        console.log(`%c Vraag opnieuw toegang aan: https://cors-anywhere.herokuapp.com/corsdemo`, `color:red;font-weight:bold;`)
    }
}

// **** Begin opties **** // knoppen

const identityBtn = document.querySelector(`section[title="onderwerpen selecteren"] ul li:nth-child(1) button`)
const droomdoelBtn = document.querySelector(`section[title="onderwerpen selecteren"] ul li:nth-child(2) button`)
const marketingBtn = document.querySelector(`section[title="onderwerpen selecteren"] ul li:nth-child(3) button`)
const plannenBtn = document.querySelector(`section[title="onderwerpen selecteren"] ul li:nth-child(4) button`)
const zelfreflectieBtn = document.querySelector(`section[title="onderwerpen selecteren"] ul li:nth-child(5) button`)

// secties //

const identitySection = document.querySelector(`section[title="identiteit"]`)
const droomDoelSection = document.querySelector(`section[title="identiteit"]`)
const marketingPlanSection = document.querySelector(`section[title="identiteit"]`)
const lerenPlannenSection = document.querySelector(`section[title="identiteit"]`)
const zelfReflectieSection = document.querySelector(`section[title="identiteit"]`)

// eventlisteners knoppen

identityBtn.addEventListener("click", function(){
    optionSection.style.setProperty('display', 'none')
    identitySection.style.setProperty('display', 'flex')
    introSection.style.setProperty('display', 'none')
})

// section data inladen