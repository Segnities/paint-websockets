import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import Modal from "./UI/Modal/index.jsx";

import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState.js";


import "../assets/styles/entermodal.scss";


const EnterModal = observer(() => {
    const [show, setShow] = useState(true);
    const [username, setUsername] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const params = useParams();
    const onHide = () => {
        if (username) {
            setShow(false);
        }
    }

    const connectHandler = () => {
        canvasState.setUsername(username);
        setShow(false);
        setFormSubmitted(true);
    }

    const drawHandler = (msg) => {

    }

    useEffect(()=> {
        if (username && formSubmitted) {
            const webs = new WebSocket("ws://localhost:7826");
            canvasState.setWebs(webs);
            canvasState.setSessionId(params.id);
            console.log("Connection created!");
            webs.onopen = () => {
                webs.send(JSON.stringify({
                    id: params.id,
                    username: username,
                    method: "connection"
                }));
            }
            webs.onmessage = (event) => {
                let msg = JSON.parse(event.data);
                console.log(msg);
                if (msg.method === "connection") {
                    console.info("User " + msg.username + " was connected!")
                } else if (msg.method === "draw") {
                    drawHandler(msg);
                }
            }
        }
    }, [username, formSubmitted]);

    return (
        <Modal show={show} onHide={onHide}>
            <div className="content">
                <TextField
                    variant="standard"
                    label="Enter your name"
                    autoComplete="off"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <Button variant="contained" onClick={connectHandler}>Enter</Button>
            </div>
        </Modal>
    );
});

export default EnterModal;