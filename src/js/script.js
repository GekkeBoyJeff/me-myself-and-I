let pubKey = `1e19898c87464e239192c8bfe422f280`;
let privKey = `4289fec4e962a33118340c888699438d`;

const corsURL = `https://cors-anywhere.herokuapp.com/`;
const endpoint = `https://zoeken.oba.nl/api/v1/search/?q=`;
const endpointDetail = `https://zoeken.oba.nl/api/v1/details/?frabl=`
const endpoint2 = `http://obaliquid.staging.aquabrowser.nl/onderwijs/api/v1/search/?q=`
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
        localStorage.setItem("intro", "done");
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

// onload kijken of de gebruiker al door de intro is gegaan

window.onload = function(){
    if(localStorage.getItem("intro") === null){
        introSection.style.setProperty('display', 'flex')
    }else{
        optionSection.style.setProperty('display', 'flex')
        introSection.style.setProperty('display', 'none')
    }
}
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

// fetch

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

// Fetch error handling

async function getError(){
    if(response.status === 429){
        console.log(`%c Alweer... | ${response.statusText}`, `color:red;font-weight:bold;`)
    }else if(response.status === 403){
        console.log(`%c Geen toegang`, `color:orange;font-weight:bold;`)
        console.log(`%c Vraag opnieuw toegang aan: https://cors-anywhere.herokuapp.com/corsdemo`, `color:red;font-weight:bold;`)
    }
}

// Intro secties renderen

async function renderBooks(){
    let data = await getData();
            console.log(data)


    let i
        for(i = 0; i < 7; i++){
            let boek = document.querySelector(`.book-${i}`)
            boek.innerHTML = ''
            boek.insertAdjacentHTML('beforeend',`<img src="${data.results[i].coverimages[1]}" alt="">`)
        }
}

async function renderAudioBooks(){    
    let data = await getData();
    console.log(data)

    let i
    for(i = 0; i < 7; i++){
        let luisterBoek = document.querySelector(`.container2>.book-${i}`)
        luisterBoek.innerHTML = ''
        luisterBoek.insertAdjacentHTML('beforeend',`<img src="${data.results[i].coverimages[1]}" alt="">`)
    }
}

async function renderMovies(){
    let data = await getData();
    console.log(data)

    let i
    for(i = 0; i < 7; i++){
        let movies = document.querySelector(`section[title="Introductie ondernemen"]>ul>li:nth-child(4) .container>.book-${i}`)
        movies.innerHTML = ''
        movies.insertAdjacentHTML('beforeend',`<img src="${data.results[i].coverimages[1]}" alt="">`)
    }
}

async function renderActivities(){
    let data = await getData()
    console.log(data)

    let i
    for(i = 1; i < 3; i++){ // als ik bij 0 begin, dan vraagt ie om nth-child(0)
        let listItem = document.querySelector(`section[title="Introductie ondernemen"]>ul>li:nth-child(5) ul li:nth-child(${i})`)
        listItem.innerHTML = ''
        listItem.insertAdjacentHTML('beforeend', `<img src="${data.results[i-1].coverimages[0]}" alt=""><h3>${data.results[i-1].titles[0]}</h3>`)
    }
}
// **** Eind intro **** //

// **** Begin opties **** // knoppen

const identityBtn = document.querySelector(`section[title="onderwerpen selecteren"] ul li:nth-child(1) button`)
const droomdoelBtn = document.querySelector(`section[title="onderwerpen selecteren"] ul li:nth-child(2) button`)
const marketingBtn = document.querySelector(`section[title="onderwerpen selecteren"] ul li:nth-child(3) button`)
const plannenBtn = document.querySelector(`section[title="onderwerpen selecteren"] ul li:nth-child(4) button`)
const zelfreflectieBtn = document.querySelector(`section[title="onderwerpen selecteren"] ul li:nth-child(5) button`)
const backButton = document.querySelector('section:nth-child(n+3) > header button')

// opties // > secties //

const identitySection = document.querySelector(`section[title="identiteit"]`)
const droomDoelSection = document.querySelector(`section[title="identiteit"]`)
const marketingPlanSection = document.querySelector(`section[title="identiteit"]`)
const lerenPlannenSection = document.querySelector(`section[title="identiteit"]`)
const zelfReflectieSection = document.querySelector(`section[title="identiteit"]`)

const showBooksOnly = document.querySelector(`section:nth-child(n+3) > ul:nth-of-type(1)>li:nth-child(1)`);
const showAudioOnly = document.querySelector(`section:nth-child(n+3) > ul:nth-of-type(1)>li:nth-child(2)`);
const showFilmOnly = document.querySelector(`section:nth-child(n+3) > ul:nth-of-type(1)>li:nth-child(3)`);
const showActivitiesOnly = document.querySelector(`section:nth-child(n+3) > ul:nth-of-type(1)>li:nth-child(4)`);

const result = document.querySelectorAll(`section:nth-child(n+3) > ul:nth-of-type(2)`);
const detailscreen = document.querySelector(`section[title="detailscherm"]`)

// eventlisteners knoppen

backButton.addEventListener("click", function(){
    document.querySelector(`
    section[title="identiteit"],
    section[title="droomdoel"],
    section[title="marketingplan"],
    section[title="leren plannen"],
    section[title="Zelfreflectie"]`).style.setProperty('display', 'none')
    optionSection.style.setProperty('display', 'flex')
})

identityBtn.addEventListener("click", function(){
    optionSection.style.setProperty('display', 'none')
    identitySection.style.setProperty('display', 'flex')
    introSection.style.setProperty('display', 'none')
    loadIdentity()
})

window.addEventListener('hashchange', async function(){
    let hash = window.location.hash.substring(1)
    console.log(hash)

    url = `${corsURL}${endpointDetail}${hash}&authorization=${pubKey}&output=json`

    let data = await getData();
    console.log(data)

    identitySection.style.setProperty('display', 'none')
    detailscreen.style.setProperty('display', 'flex')

    document.querySelector(`section[title="detailscherm"] header h2`).innerHTML = `${data.record.titles[0]}`
    document.querySelector(`section[title="detailscherm"] ul:first-of-type`).insertAdjacentHTML('beforeend', `<li><img src="${data.record.coverimages[1]}"></img></li><li><p>${data.record.summaries[0]}</p></li>`)
})

// section data inladen

async function loadIdentity(){
    query = 'jezelf+ontdekken'
    url = `${corsURL}${endpoint}${query}${refine}&authorization=${pubKey}&output=json`;

    // URL 2 Data ophalen
    // query = `jezelf+leren+kennen`
    // url = `${corsURL}${endpoint2}${query}${refine}&authorization=${pubKey}&output=json`

    let data = await getData();
    console.log(data)

    let list = document.querySelector('section[title="identiteit"] ul:nth-of-type(2)')
    console.log(list)
    for(i = 0; i < 20; i++){ // als ik bij 0 begin, dan vraagt ie om nth-child(0)
        try{
            list.insertAdjacentHTML('beforeend',`<li><a href="#${data.results[i].frabl.value}"><img src="${data.results[i].coverimages[1]}" alt=""><p>${data.results[i].titles[0]}</p>` +/* <p>${data.results[i].authors[0]}</p>*/ `</a></li>`)
        }catch(error){
            console.log(error)
        }
    }
}

andereApiTest()

async function andereApiTest(){
        // URL 2 Data ophalen
        // Oh dit werkt dus wel
    query = `jezelf+leren+kennen`
    url = `${corsURL}${endpoint2}${query}${refine}&authorization=${pubKey}&output=json`
    
    console.log(url)
    let data = await getData();
    console.log(data)
}