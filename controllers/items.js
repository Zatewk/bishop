const { Router } = require('express');
const request = require("request-promise");
const clashAPI = require("./clients/clash");
const pkmnAPI = require("./clients/pokemon");
const driversAPI = require ("./clients/drivers"); 


const apis = new Map([
	["Clash","http://www.clashapi.xyz/api/cards/"],
	["Pokemon","https://pokeapi.co/api/v2/pokemon/"],
	["Drivers","http://ergast.com/api/f1/drivers"],
	["Clash_Img","http://www.clashapi.xyz/images/cards/"]
]);

const lookupItems = async (req, res) => {
	let cards = clashAPI.getCardList();
	let pkmns = pkmnAPI.getPkmnList();
	let drivers = driversAPI.getDriverList();

	let values = await Promise.all([cards, pkmns, drivers]);

	//console.log(values);

	let result = values[0].concat(values[1].concat(values[2]));

	res.send(JSON.stringify(result));
}

const lookupItemByID = async (req, res) => {
	let raw;
	let result;

	// test ID: 5b099537ab411c001423ec3b
	try{
		raw = JSON.parse(await request (apis.get("Clash")+req.params.id));
		result = {id:raw._id, image:apis.get("Clash_Img")+raw.idName+".png", name:raw.name};
	}catch (err){}

	// test ID: 151/mew
	try{
		raw = JSON.parse(await request (apis.get("Pokemon")+req.params.id));
		result = {id:raw.id, image:raw.sprites.front_default, name:raw.name};
	}catch (err){}
	
	// test ID: abate
	try{
		raw = JSON.parse(await request (apis.get("Drivers")+"/"+req.params.id+".json"));
		if (raw.MRData.total == 1){
			result = raw.MRData.DriverTable.Drivers.map(driver => {
				return {id:driver.driverId, image:driver.url, name:driver.givenName+' '+driver.familyName}
			});
		}
	}catch (err){}
	
	res.send(JSON.stringify(result));
}

module.exports = new Router()

  .get('/', (req, res) => {
	lookupItems(req, res);
  })
	
  .get('/:id', (req, res) => {
    lookupItemByID(req, res);
  });
