const { Router } = require('express');
const clashAPI = require("./clients/clash");
const pkmnAPI = require("./clients/pokemon");
const driversAPI = require ("./clients/drivers"); 



const lookupItems = async (req, res) => {
	let cardPromise = clashAPI.getCardList();
	let pkmnPromise = pkmnAPI.getPkmnList();
	let driverPromise = driversAPI.getDriverList();

	let values = await Promise.all([cardPromise, pkmnPromise, driverPromise]);

	let result = values[0].concat(values[1].concat(values[2]));

	res.send(JSON.stringify(result));
}

const lookupItemByID = async (req, res) => {
	let cardPromise = clashAPI.getCardByID(req, res);
	let pkmnPromise = pkmnAPI.getPkmnByID(req, res);
	let driverPromise = driversAPI.getDriverByID(req, res);

	let values = await Promise.all([cardPromise, pkmnPromise, driverPromise]);
	
	let iterator = 0;
	while (iterator < values.length && typeof values[iterator] === "undefined") {
		iterator++;
	}	

	res.send(JSON.stringify(values[iterator]));
}

module.exports = new Router()

  .get('/', (req, res) => {
	lookupItems(req, res);
  })
	
  .get('/:id', (req, res) => {
    lookupItemByID(req, res);
  });
