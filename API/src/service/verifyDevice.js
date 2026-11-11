
import {sessionManager} from "../models/deviceManagerModel.js";
import bcrypt from "bcrypt";


async function verifyDevice(id, deviceId, token, tokenVersion){
	const device = await sessionManager.findOne({UniqueID: id, DeviceID: deviceId});
	if(!device) return {success: false};
	const isMatch = await bcrypt.compare(token, device.Token);
	if(device.TokenVersion !== tokenVersion && !isMatch) return {success: false};
	return {success: true};
}
export  default verifyDevice;