// Write your JavaScript code here!

const { pickPlanet, myFetch, addDestinationInfo, formSubmission } = require("./scriptHelper");

window.addEventListener("load", function() {
    

   let listedPlanets;

   
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let randomPlanet = pickPlanet(listedPlanets);
       addDestinationInfo(document, randomPlanet.name, randomPlanet.diameter, randomPlanet.star, randomPlanet.distance, randomPlanet.moon, randomPlanet.imageUrl)
   })

   let form = document.querySelector('testForm');
        form.addEventListener('sumbit', function(event) {
   let pilot = document.querySelector("input[name=pilotName").value;
   let copilot = document.querySelector("input[name=copilotName").value;
   let fuelLevel = document.querySelector("input[name=fuelLevel").value;
   let cargoLevel = document.querySelector("input[name=cargoMass").value;
   let list = document.getElementById('faultyItems');
   formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel );
        })
});