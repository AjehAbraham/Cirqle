import {updateAbout} from "../models/AboutModel.js";
import {InternalServerError, UnauthorizedError} from "../utils/AppError.js";
import {registerModel} from "../models/registerModel.js";


 async function saveInfo(id, cCode, phone, name, about,imageUrl, publicID, IP, UserAgent){
	 let findUser = await registerModel.findOne({
		 _id: id, CountryCode: cCode, Phone: phone
	 });
	 
	 if(!findUser){
		 throw new UnauthorizedError("Session expired or invalid login", "UNAUTHORIZED_ERROR");
	 }
	 const addInfo = await updateAbout.create({
		UniqueID: findUser._id,
		CountryCode: findUser.CountryCode,
		Phone: findUser.Phone,
		Name: name,
		About: about,
		ImageUrl: imageUrl,
		PublicID: publicID,
		IP: IP,
		UserAgent: UserAgent
	 });
	 if(!addInfo){
		 throw new InternalServerError("Error occurred trying to complete this request, please try again", "INTERNAL_SERVER_ERROR");
	 }
	 return {success: true, imagePath: imageUrl};
 }

export default saveInfo;