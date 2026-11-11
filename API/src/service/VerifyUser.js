import { registerModel } from "../models/registerModel.js";


export default async function Authenticate (cCode, phone){
    const verify = await registerModel.findOne({CountryCode: cCode, Phone: phone});
    if(!verify) return {success: false, data: {message: "User does not exist"}};
    return {success: true, data: {result: verify}};
}