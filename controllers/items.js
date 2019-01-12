const { Router } = require('express');
const request = require("request-promise");
const app = require('../app');


const apis = new Map([
	["Clash","http://www.clashapi.xyz/api/cards/"],
	["Pokemon","https://pokeapi.co/api/v2/pokemon/"],
	["Drivers","http://ergast.com/api/f1/drivers"],
	["Clash_Img","http://www.clashapi.xyz/images/cards/"]
]);

const lookupItems = async (req, res) => {
	let rawCards = JSON.parse(await request (apis.get("Clash")));
	let rawPkmns = JSON.parse(await request (apis.get("Pokemon")));
	let rawDrivers = JSON.parse(await request (apis.get("Drivers")+".json"));

	let cardIDs = rawCards.map(card => {
		return {id:card._id, name:card.name}
	});

	let pkmnIDs = rawPkmns.results.map(pkmn => {
		return {id:pkmn.url.slice(0, -1).split("/").pop(), name:pkmn.name}
	});

	let driversIDs = rawDrivers.MRData.DriverTable.Drivers.map(driver => {
		return {id:driver.driverId, name:driver.givenName+' '+driver.familyName}
	});

	let result = cardIDs.concat(pkmnIDs.concat(driversIDs));

	res.send(JSON.stringify(result));
}

const lookupItemByID = async (req, res) => {
	let raw;
	let result;

	// test ID: 5b099537ab411c001423ec3b
	try{
		raw = JSON.parse(await request (apis.get("Clash")+req.params.id));
		result = {id:raw._id, image:apis.get("Clash_Img")+raw.idName+".png", name:raw.name};
	}catch (err){
		console.log("Card not found");
	}

	// test ID: 1
	try{
		raw = JSON.parse(await request (apis.get("Pokemon")+req.params.id));
		result = {id:raw.id, image:raw.sprites.front_default, name:raw.name};
	}catch (err){
		console.log("Pokemon not found");
	}
	
	// test ID: abate
	try{
		raw = JSON.parse(await request (apis.get("Drivers")+"/"+req.params.id+".json"));
		if (raw.MRData.total == 1){
			result = raw.MRData.DriverTable.Drivers.map(driver => {
				return {id:driver.driverId, image:driver.url, name:driver.givenName+' '+driver.familyName}
			});
		}
	}catch (err){
		console.log("Driver not found");
	}
	
	res.send(JSON.stringify(result));
}

module.exports = new Router()

  .get('/', (req, res) => {
	lookupItems(req, res);
  })
	
  .get('/:id', (req, res) => {
    lookupItemByID(req, res);
  });
