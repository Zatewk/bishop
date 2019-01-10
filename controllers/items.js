const { Router } = require('express');
const request = require('request');
const app = require('../app');

const lookupItem = (req, res) => {
	request (
		'http://www.clashapi.xyz/api/cards/', 
		(error, response, body) => {
			let info = JSON.parse (body);
			res.send(info);
		});
}

module.exports = new Router()
  .get('/', lookupItem, (req, res) => {
    res.json(req.info);
    res.sendStatus(200);
  })
  .get('/:id', (req, res) => {
    // Code here
    res.sendStatus(200);
  });
