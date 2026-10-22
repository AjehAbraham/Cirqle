
import {sessionManager} from "../models/deviceManagerModel.js";

async function verifyDevice(id, deviceId, tokenVersion){
	const device = await sessionManager.findOne({UniqueID: id, DeviceID: deviceId});
	if(!device) return {success: false};
	if(device.TokenVersion !== tokenVersion) return {success: false};
	return {success: true};
}
export  default verifyDevice;