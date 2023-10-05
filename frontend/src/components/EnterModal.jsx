import Modal from "./UI/Modal/index.jsx";
import {useState} from "react";
import {Button, TextField} from "@mui/material";

import "../assets/styles/entermodal.scss";
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState.js";

const EnterModal = observer(() => {
    const [show, setShow] = useState(true);
    const [username, setUsername] = useState("");
    const onHide = () => {
        if (username) {
            setShow(false);
        }
    }

    const connectHandler = () => {
        canvasState.setUsername(username);
        setShow(false);
    }

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