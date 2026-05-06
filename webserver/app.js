import "dotenv/config";
import express from "express";
import router from "./src/routes/noteRoute.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());


app.use("/noteRoute", router);




app.use( (req, res) =>{
res.status(404).json({
error: "Not Found",
code: "NOT_FOUND"
});
});

const startServer = app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
});

startServer.setTimeout(10 * 1000);
startServer.on('timeout', (socket) => {
console.log("Connection timed out");
socket.end();
});
