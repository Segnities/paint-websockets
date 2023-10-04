const express = require('express');
const app = express();
const webs = require('express-ws');
require('dotenv').config();

const wsServ = webs(app);
const aWss = wsServ.getWss();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.ws('/', (ws, req)=> {
    console.log("CONNECTION CREATED");
    ws.send("SUCCESSFUL CONNECTION!");
    ws.on('message', (msg)=> {
        const jsonMsg = JSON.parse(msg);
        if (jsonMsg.method === "connection") {
            connectionHandler(ws, jsonMsg);
        }
    });
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
                client.send("User " + msg.username + " connected!");
            }
        });
    } catch (e) {
        console.log(e)
    }
}


