import {settings} from "../src/models/settingsModel.js";


export async function reset(userId){
	const fetch = await settings.findOne({UniqueID: userId});
	if(!fetch) return {status: false};
	 await settings.deleteOne({UniqueID: userID});
	 const save = await settings.create({UniqueID: userId});
	return {success: true, data: save};
}