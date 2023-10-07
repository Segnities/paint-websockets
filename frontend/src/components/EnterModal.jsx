import {useState} from "react";
import {Button, TextField} from "@mui/material";
import Modal from "./UI/Modal/index.jsx";

import {observer} from "mobx-react-lite";
import usernameFormState from "../store/usernameFormState.js";

import "../assets/styles/entermodal.scss";


const EnterModal = observer(() => {
    const [show, setShow] = useState(true);
    const [username, setUsername] = useState("");
    const onHide = () => {
        if (username) {
            setShow(false);
        }
    }

    const connectHandler = () => {
        setShow(false);
        usernameFormState.submitForm(username);
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