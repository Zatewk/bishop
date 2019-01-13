const request = require("request-promise");


const drvrs = "http://ergast.com/api/f1/drivers";
const toJson = ".json";

exports.getDriverList = async () => {
	let rawDrivers = await request ({method: 'GET', uri: drvrs+toJson, json: true});

	let driversIDs = rawDrivers.MRData.DriverTable.Drivers.map(driver => {
		return {id:driver.driverId, name:driver.givenName+' '+driver.familyName}
	});

	return driversIDs;
}

exports.getDriverByID = async (req, res) => {
	let raw;
	let result;	

	try{	
		raw = await request ({method: 'GET', uri: drvrs+"/"+req.params.id+toJson, json: true});
		if (raw.MRData.total == 1){
			result = raw.MRData.DriverTable.Drivers.map(driver => {
				return {id:driver.driverId, image:driver.url, name:driver.givenName+' '+driver.familyName}
			});
		}
	}catch (err){
		result = null;
	}

	return result;
}