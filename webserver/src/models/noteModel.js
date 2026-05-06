import mongoose, { Schema }  from "mongoose";

const NoteSchema = new mongoose.Schema({
 Title: {type: String, required: true},
 Content: {type: String, required: true},
 Date: {type: Date, required: true, default: Date.now}
});

 export const addNote = mongoose.Model("NoteDB", NoteSchema);