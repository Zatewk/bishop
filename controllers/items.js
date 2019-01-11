const { Router } = require('express');
const request = require('request');
const app = require('../app');

/*
const lookupItem = (req, res) => {
	//We'll move things outside once the basic functionality works
}
*/

module.exports = new Router()

  .get('/', (req, res) => {
    request (
		'http://www.clashapi.xyz/api/cards', 
		(error, response, body) => {
			let info = JSON.parse(body);
			const cardIDs = info.map(card => {
				return {id:card._id, name:card.name}
			});
			//console.log(cardIDs);

			request (
				'https://pokeapi.co/api/v2/pokemon/',
				(error, response, body) => {
					let obj = JSON.parse(body);
					const pkmnIDs = obj.results.map(pkmn => {
						return {id:pkmn.url.slice(0, -1).split("/").pop(), name:pkmn.name}
					});
					//console.log(pkmnIDs);

					request (
						'http://ergast.com/api/f1/drivers.json',
						(error, response, body) => {
							let obj = JSON.parse(body);
							const driversIDs = obj.MRData.DriverTable.Drivers.map(driver => {
								return {id:driver.driverId, name:driver.givenName+' '+driver.familyName}
							});
							//console.log(driversIDs);

							const result = cardIDs.concat(pkmnIDs.concat(driversIDs));
						}
					);
				}
			);
		}
	);
	
    res.sendStatus(200);
  })

  .get('/:id', (req, res) => {
    // Code here
    res.sendStatus(200);
  });
