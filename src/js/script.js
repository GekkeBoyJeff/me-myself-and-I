let pubKey = `1e19898c87464e239192c8bfe422f280`;
let privKey = `4289fec4e962a33118340c888699438d`;

const corsURL = `https://cors-anywhere.herokuapp.com/`;
const endpoint = `https://zoeken.oba.nl/api/v1/search/?q=`;
let query = `*`;

let url = `${corsURL}${endpoint}${query}&authorization=${pubKey}&output=json`;

const config = {
    Authorization: `Bearer ${privKey}`
  };

function makeConnection(){
    fetch(url, config)
    .then(response => {
            console.log('connectie klopt')
            return response.json()               
    })
    .then(data =>{
        loaddata(data)
    })
    .catch(error =>{
        if(error === '429'){
            // console.log(error)
            console.log(url)
            pubKey = `0076bc3bc11d080e07a303360178002a`
            privKey = `187b973dc49e054fa7635313a9c8540f`
            makeConnection();
            // getDataOffline(); 
        }
         
    })  
}

makeConnection()

function loaddata(){
    console.log(data)
}

    const getDataOffline = async () => {
        const res = await fetch("../src/json/data.json");
        const data = await res.json();
        console.log(data.results);
}