const { Router } = require('express');
const clashAPI = require("./clients/clash");
const pkmnAPI = require("./clients/pokemon");
const driversAPI = require ("./clients/drivers"); 



const lookupItems = async (req, res) => {
	let cardPromise;
	let pkmnPromise;
	let driverPromise;
	let values;
	let result;

	cardPromise = clashAPI.getCardList();
	pkmnPromise = pkmnAPI.getPkmnList();
	driverPromise = driversAPI.getDriverList();

	values = await Promise.all([cardPromise, pkmnPromise, driverPromise]);

	result = values[0].concat(values[1].concat(values[2]));

	res.send(JSON.stringify(result));
}

const lookupItemByID = async (req, res) => {
	let cardPromise;
	let pkmnPromise;
	let driverPromise;
	let values;
	let i;

	cardPromise = clashAPI.getCardByID(req, res);
	pkmnPromise = pkmnAPI.getPkmnByID(req, res);
	driverPromise = driversAPI.getDriverByID(req, res);

	values = await Promise.all([cardPromise, pkmnPromise, driverPromise]);
	
	i = 0;
	while (i < values.length && typeof values[i] === "undefined") {
		i++;
	}	

	res.send(JSON.stringify(values[i]));
}

module.exports = new Router()

  .get('/', (req, res) => {
	lookupItems(req, res);
  })
	
  .get('/:id', (req, res) => {
    lookupItemByID(req, res);
  });
