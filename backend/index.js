const express = require('express');
const app = express();
const webs = require('express-ws');
const cors = require("cors")
const fs = require("fs");
const path = require("path");

require('dotenv').config();

const wsServ = webs(app);
const aWss = wsServ.getWss();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.ws('/', (ws, req)=> {
    console.log("CONNECTION CREATED");
    ws.send(JSON.stringify({msg: "SUCCESSFUL CONNECTION!"}));
    ws.on('message', (msg)=> {
        const jsonMsg = JSON.parse(msg);
        if (jsonMsg.method === "connection") {
            connectionHandler(ws, jsonMsg);
        } else if (jsonMsg.method === "draw") {
            broadcastConnectionHandler(ws, jsonMsg);
        } else if (jsonMsg.method === "history") {
            broadcastConnectionHandler(ws, jsonMsg); 
        }
    });
});

app.post("/image", (req, res)=> {
    try {
        const data = req.body.img.replace("data:image/png;base64,", "");
        fs.writeFileSync(path.resolve(__dirname, "files", `${req.query.id}.jpg`), data, "base64");
        return res.status(200).json({message: "Success!"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
});

app.get("/image", (req, res)=> {
    try {
        return res.status(200).json({message: "ok"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
});

app.listen(PORT, ()=> {
    console.log("Server started on PORT: " + PORT);
});

function connectionHandler(ws, msg) {
    try {
        ws.id = msg.id;
        broadcastConnectionHandler(ws, msg);
    } catch (e) {
        console.log(e)
    }

}

function broadcastConnectionHandler(ws, msg) {
    try {
        aWss.clients.forEach(client => {
            if (client.id === msg.id) {
                client.send(JSON.stringify(msg));
            }
        });
    } catch (e) {
        console.log(e)
    }
}


