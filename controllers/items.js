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
			const cardIDs = info.map(card => {return {id:card._id, name:card.name}});
			//console.log(cardIDs);
		}
	);
	
    res.sendStatus(200);
  })

  .get('/:id', (req, res) => {
    // Code here
    res.sendStatus(200);
  });
