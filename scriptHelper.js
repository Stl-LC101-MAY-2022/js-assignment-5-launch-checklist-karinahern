// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
}


function validateInput(testInput) {
    if(testInput === Number){
        return "Is a number";
    }
    else if(isNaN(testInput) === true){
        return "Not a Number";
    } else if(testInput === ''){
        return "Empty";
    }
 }
    


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    window.addEventListener('load', function(){
        let form = document.querySelector('testForm');
        form.addEventListener('sumbit', function(event) {
            
            let pilot = document.querySelector("input[name=pilotName").value;
            let copilot = document.querySelector("input[name=copilotName").value;
            let fuelLevel = document.querySelector("input[name=fuelLevel").value;
            let cargoLevel = document.querySelector("input[name=cargoMass").value;

            let items = document.getElementById('faultyItems');
            let launchStatus = document.getElementById('launchStatus');
            let fuelStatus = document.getElementById('fuelStatus');
            let cargoStatus = document.getElementById('cargoStatus');
            let ready = true;

            if (pilot === '' || copilot === '' || fuelLevel === '' || cargoLevel === ''){
                alert('All fields are required!');
                event.preventDefault(); }
            if(validateInput(pilot) === 'Is a number' || validateInput(copilot) === 'Is a number' || validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number'){
                alert('Make sure to enter valid information for each field!');
                event.preventDefault();
            } else {
                items.style.visibility = 'visible';

                document.getElementById('pilotStatus').innerHTML = `Pilot ${pilot} is ready for launch`;
                document.getElementById('copilotStatus').innerHTML = `Co-pilot ${copilot} is ready for launch`;
                
                if(fuelLevel < 10000){
                    ready = false;
                    fuelStatus.innerHTML = 'Fuel level too low for launch';   
                } 

                if (cargoLevel > 10000){
                    ready = false;
                    cargoStatus.innerHTML = 'Cargo level is too high for launch'
                }
                if(ready){
                    launchStatus.style.color = 'green';
                    launchStatus.innerHTML = 'Shuttle is ready for launch'
                    myFetch();
                    pickPlanet();
                } else {
                    items.style.visibility = 'visible';
                    launchStatus.style.color = 'red';
                    launchStatus.innerHTML = 'Shuttle not ready for launch';
                }
            }
        });
    });
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        response.json().then(function(json){   
            console.log(json);          
        })
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let planets = addDestinationInfo(document);
    let randomPlanet = planets[Math.floor(Math.random() * planets.length)];

    planets.innerHTML = 
    `<h2>Mission Destination</h2>
    <ol>
        <li>Name: ${randomPlanet.name} </li>
        <li>Diameter: ${randomPlanet.diameter} </li>
        <li>Star: ${randomPlanet.star}</li>
        <li>Distance from Earth: ${randomPlanet.distance} </li>
        <li>Number of Moons: ${randomPlanet.moons} </li>
    </ol>
    <img src="${randomPlanet.image}">` 
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
