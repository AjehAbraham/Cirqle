import { sessionManager } from "../models/deviceManagerModel.js";

export async function getDevicesService(userID) {
    const fetch = await sessionManager.find({UniqueID: userID}).sort({createdAt: -1}).limit(10);
    if(!fetch) return{ success: false, data: []};
    else return {success: true, fetch};
}