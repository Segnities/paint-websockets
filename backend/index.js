const express = require('express');
const app = express();
const webs = require('express-ws');
const cors = require("cors")

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
        
    } catch (error) {
        console.log(error);
        return res.statusCode(500).json({message: error.message});
    }
});

app.get("/image", ()=> {
    try {
        
    } catch (error) {
        console.log(error);
        return res.statusCode(500).json({message: error.message});
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


