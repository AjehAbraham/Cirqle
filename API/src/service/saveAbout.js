import {aboutModel} from "../models/AboutModel.js";
import {InternalServerError, UnauthorizedError} from "../utils/AppError.js";
import {registerModel} from "../models/registerModel.js";
;


async function saveInfo(id, name, bio, imageUrl, publicID, IP, UserAgent){
  const findUser = await registerModel.findById(id);
  if(!findUser) throw new UnauthorizedError("TOKEN_EXPIRED");

  const updated = await aboutModel.findOneAndUpdate(
    { UniqueID: id },
    {
      ...(name !== undefined && { Name: name }),
      ...(bio !== undefined && { About: bio }),
      ...(imageUrl && { ImageUrl: imageUrl, PublicID: publicID }),
      IP,
      UserAgent
    },
    { upsert: true, new: true }
  );

  return { success: true, data: updated };
}
export default saveInfo;