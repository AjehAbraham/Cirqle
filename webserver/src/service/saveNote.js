import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";

export async function saveNote(Title, content){
 const __dirname = path.dirname(fileURLToPath(import.meta.url));
 const fileName = Title + ".txt";
 const file = path.join(__dirname, "data", fileName);
 const allContent = Title + "\br" + content;

 await fs.writeFile(file, allContent);
 const readData = await fs.readFile(file, "utf-8");
 console.log(readData);
}