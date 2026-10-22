import { ContactList } from "../models/contactListModel.js";
import { registerModel } from "../models/registerModel.js";

 export async function VerifyContact(userID, cCode, phone){
    const find = await ContactList.findOne({UniqueID: userID, CountryCode: cCode, Phone: phone});
    if(!find) return {success: false};
    return {success: true};
 }

export async function SaveContact(userID, fullName, firstName, lastName, cCode, phone ){
    try{
    const findUser = await registerModel.findOne({CountryCode: cCode, Phone: phone});
    let contactID = null;
    if(findUser) contactID = findUser._id;
    const save = await ContactList.create({
     UniqueID: userID,
     ContactUserID: contactID,
     CountryCode: cCode,
     Phone: phone,
     FirstName: firstName,
     LastName: lastName,
     Name: fullName   
    });
    return {success: true, save};
}catch(err){
 if(err.code === 11000) throw {statusCode: 409, code: "DUPLICATE_CONTACT_ERROR", message: "Contact already exist"};
 throw {statusCode: 500, code: "SAVE_CONTACT_FAILED_ERROR", message: "Failed to save contatc"};
}

}

export async function EditContact(userID,  fullName, firstName, lastName, cCode, phone ){
    try{
    const findUser = await registerModel.findOne({CountryCode: cCode, Phone: phone});
    let contactID = null;
    if(findUser) contactID = findUser._id;
    const edit = await ContactList.findOneAndUpdate({UniqueID: userID, CountryCode: cCode, Phone: phone}, 
        { $set: {ContactUserID: contactID, CountryCode: cCode, Phone: phone, FirstName: firstName, 
            LastName: lastName, Name: fullName}}, {new: true});
        return {success: true, edit};
    }catch(err){
        throw {statusCode: 500, code: "EDIT_CONTACT_FAILED_ERROR", message: "Failed to edit contact"};
    }
}