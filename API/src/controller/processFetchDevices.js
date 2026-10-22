import { asyncHandler } from "../utils/asyncHandler.js";
import { getDevicesService } from "../service/fetchDevices.js";

export const fetchDevicesController = asyncHandler (async (req, res, next) => {
  const userID = req.user.id;
  const device =  await getDevicesService(userID);
  if(!device.success) return {success: false, data: []};
  res.status(200).json({success: true, data: device.fetch});
  console.log(device);
});