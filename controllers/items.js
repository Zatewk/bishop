const { Router } = require('express');
const request = require("request-promise");
const app = require('../app');


const apis = new Map([
	["Clash","http://www.clashapi.xyz/api/cards"],
	["Pokemon","https://pokeapi.co/api/v2/pokemon/"],
	["Drivers","http://ergast.com/api/f1/drivers.json"]
]);

const lookupItems = async (req, res) => {
	let rawCards = JSON.parse(await request (apis.get("Clash")));
	let rawPkmns = JSON.parse(await request (apis.get("Pokemon")));
	let rawDrivers = JSON.parse(await request (apis.get("Drivers")));

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
	//console.log(rawCards);
	res.send(JSON.stringify(result));
}

module.exports = new Router()

  .get('/', (req, res) => {
	lookupItem(req, res);
    //res.sendStatus(200);
  })
	
  .get('/:id', (req, res) => {
    // Code here
    res.sendStatus(200);
  });
