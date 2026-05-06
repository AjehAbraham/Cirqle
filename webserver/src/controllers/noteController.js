import { saveNote } from "../service/saveNote.js";

export const pushNote = async  (req, res) =>{
    const Title = req.body.title;
    const content = req.body.content;

    await saveNote(Title, content);
}