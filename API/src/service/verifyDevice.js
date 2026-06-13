
import {sessionManager} from "../models/deviceManagerModel.js";

async function verifyDevice(id, deviceId, tokenVersion){
	const device = await sessionManager.findOne({UniqueId: id, DeviceId: deviceId});
	if(!device) return {succes: false};
	if(device.TokenVersion !== tokenVersion) return {success: false};
	return {sucess: true};
}
export  default verifyDevice;