
const request = require("request-promise");


const cards = "http://www.clashapi.xyz/api/cards/";
const cardImgs = "http://www.clashapi.xyz/images/cards/";

exports.getCardList = async () => {
	//let rawCards = JSON.parse(await request (cards));
	let rawCards = await request ({method: 'GET', uri: cards, json: true});
	const util = require('util');
	console.log(util.inspect(rawCards));
	let cardIDs = rawCards.map(card => {
		return {id:card._id, name:card.name}
	});

	return cardIDs;
}

exports.getCardByID = async (req, res) => {
	let raw;
	let result;	

	try{	
		//raw = JSON.parse(await request (apis.get("Clash")+req.params.id));
		raw = await request ({method: 'GET', uri: cards+req.params.id, json: true});
		result = {id:raw._id, image:cardImgs+raw.idName+".png", name:raw.name};
	}catch (err){
		result = null;
	}
	return result;
}
