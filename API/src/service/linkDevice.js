import { sessionManager } from "../models/deviceManagerModel.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

async function LinkDevice(userID, cCode, Phone, Tel, deviceName, IP, userAgentArray) {
  
   const countDevices = await sessionManager.countDocuments({UniqueID: userID});
   if(countDevices >= 5) return {success: false, message: "Max 5 device"};

   await sessionManager.updateMany({UniqueID: userID}, {isCurrentDevice: false});

    const UUID = crypto.randomUUID();
    const deviceCode = crypto.randomUUID();
    const deviceHash = await bcrypt.hash(deviceCode, 12);

   const link =  await sessionManager.create({
          UniqueID: userID,
          CountryCode: cCode,
          Phone: Tel,
          DeviceID: UUID,
          Token: deviceHash,
          TokenVersion: 0,
          DeviceName: deviceName,
          DeviceType: 'linked',
          isMain: false,
          isCurrentDevice: true,
          IP: IP,
          UserAgent: userAgentArray,
          LastActive: new Date()
        });
    
}