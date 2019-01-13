const request = require("request-promise");


const pkmns = "https://pokeapi.co/api/v2/pokemon/";

exports.getPkmnList = async () => {
	let rawPkmns = await request ({method: 'GET', uri: pkmns, json: true});

	let pkmnIDs = rawPkmns.results.map(pkmn => {
		return {id:pkmn.url.slice(0, -1).split("/").pop(), name:pkmn.name}
	});

	return pkmnIDs;
}

exports.getPkmnByID = async (req, res) => {
	let raw;
	let result;	

	try{	
		raw = await request ({method: 'GET', uri: pkmns+req.params.id, json: true});
		result = {id:raw.id, image:raw.sprites.front_default, name:raw.name};
	}catch (err){
		result = null;
	}
	return result;
}
