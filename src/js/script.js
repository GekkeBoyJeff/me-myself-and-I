const pubKey = `1e19898c87464e239192c8bfe422f280`
const privKey = `4289fec4e962a33118340c888699438d`

const corsURL = `https://cors-anywhere.herokuapp.com/`
const endpoint = `https://zoeken.oba.nl/api/v1/`
const query = `search/?q=*`

const url = `${corsURL}${endpoint}${query}&authorisation=${pubKey}&output=json`

const config = {
    Authorization: `Bearer ${privKey}`
  };

function makeConnection(){
    fetch(url, config)
    .then(response => {
        if(response.ok){
            console.log('connectie klopt')
            return response.json()
        }
               
    })
    .then(data =>{
        loaddata(data.results)
    })
    .catch(err =>{
        if(err = 429){
            console.log(err)
            console.log('hi')
            getDataOffline(); 
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