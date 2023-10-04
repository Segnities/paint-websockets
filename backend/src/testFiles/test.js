const webs = new WebSocket("ws://localhost:7826");

const sendMsgBtn = document.getElementById("send-msg");

webs.onopen = () => {
    console.log("WebSocket work correctly!");
    webs.send(JSON.stringify({
        id: 88555,
        username: "Agilio",
        method: "connection"
    }));
}

webs.onmessage = (event) => {
    console.log("Msg from server: ", event.data);
}

sendMsgBtn.onclick = () => {
    webs.send(JSON.stringify({
        id: 88555,
        username: "Agilio",
        method: "message"

    }));
}