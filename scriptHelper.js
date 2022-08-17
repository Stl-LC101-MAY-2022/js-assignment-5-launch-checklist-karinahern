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
    let planets = document.getElementById('missionTarget');
    planets.innerHTML = 
    `<h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name} </li>
        <li>Diameter: ${diameter} </li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance} </li>
        <li>Number of Moons: ${moons} </li>
    </ol>
    <img src="${imageUrl}">`
}


function validateInput(testInput) {
    if(isNaN(testInput) === false){
        return "Is a number";
    }
    else if(isNaN(testInput) === true){
        return "Not a Number";
    } else if(testInput === ''){
        return "Empty";
    }
 }
    


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
            
            let launchStatus = document.getElementById('launchStatus');
            let fuelStatus = document.getElementById('fuelStatus');
            let cargoStatus = document.getElementById('cargoStatus');
            let ready = true;

            if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty'){
                alert('All fields are required!');
                preventDefault(); }
            if(validateInput(pilot) === 'Is a number' || validateInput(copilot) === 'Is a number' || validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number'){
                alert('Make sure to enter valid information for each field!');
                preventDefault();
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
            
                } else {
                    items.style.visibility = 'visible';
                    launchStatus.style.color = 'red';
                    launchStatus.innerHTML = 'Shuttle not ready for launch';
                }
            }
        };


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
    let randomPlanet = planets[Math.floor(Math.random() * planets.length)];
    return randomPlanet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
