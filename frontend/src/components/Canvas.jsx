import {useEffect, useRef} from "react";
import {observer} from 'mobx-react-lite';
import {useParams} from "react-router-dom";

import canvasState from '../store/canvasState';
import toolState from "../store/toolState.js";
import usernameFormState from "../store/usernameFormState.js";

import Brush from "../tools/Brush.js";
import Eraser from "../tools/Eraser";
import Rectangle from "../tools/Rectangle.js";
import Circle from "../tools/Circle.js";
import Line from "../tools/Line.js";

import '../assets/styles/canvas.scss';

const Canvas = observer(() => {
    const canvasRef = useRef();
    const params = useParams();

    const tool = toolState.tool;
    const isBrush = tool instanceof Eraser;

    const username = usernameFormState.username;
    const formSubmitted = usernameFormState.formSubmitted;

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL());
    }

    const drawHandler = (msg) => {
        const figure = msg.figure;
        const ctx = canvasRef.current.getContext("2d");
        const figureType = figure.type;

        if (figureType === "brush") {
            Brush.draw(ctx, figure.x, figure.y, figure.color, figure.strokeColor, figure.lineWidth);
        } else if (figureType === "rect") {
            console.log("DRAWING RECT")
            Rectangle.drawByData(ctx, figure.x, figure.y, figure.width, figure.height, figure.color, figure.strokeColor, figure.lineWidth);
        } else if (figureType === "circle") {
            console.log("DRAWING CIRCLE");
            const radius = Math.sqrt(figure.width ** 2 + figure.height ** 2);
            Circle.drawByData(ctx, figure.x, figure.y, radius, figure.color, figure.strokeColor, figure.lineWidth);
        } else if (figureType === "eraser") {
            Eraser.erase(ctx, figure.x, figure.y, figure.lineWidth);
        } else if (figureType === "line") {
            console.log("DRAWING LINE")
            Line.drawByData(ctx, figure.x, figure.y, figure.currentX, figure.currentY, figure.color, figure.strokeColor, figure.lineWidth);
        } else if (figureType === "finish") {
            ctx.beginPath();
        }
    }

    const historyHandler = (msg) => {
        const actionType = msg.action;
        console.log("ACTION")
        canvasState.setUndoList(msg.undoList);
        canvasState.setRedoList(msg.redoList);

        if (actionType === "undo") {
            console.log("UNDO")
        } else if (actionType === "redo") {
            console.log("REDO!")
        }
    }

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
    }, []);

    useEffect(() => {
        if (username && formSubmitted) {
            const webs = new WebSocket("ws://localhost:7826");
            canvasState.setWebs(webs);
            canvasState.setSessionId(params.id);
            console.log("Connection created!");

            toolState.setTool(new Brush(canvasRef.current, webs, params.id));

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
                } else if(msg.method === "history") {
                    historyHandler(msg);
                    console.log(msg)
                } else if (msg.method === "draw") {
                    drawHandler(msg);
                }
            }
        }
    }, [username, formSubmitted]);

    return (
        <div className="canvas">
            <canvas
                className={`${isBrush ? 'brush-cursor' : ''}`}
                onMouseDown={() => mouseDownHandler()}
                ref={canvasRef} width={600} height={400}
            >
            </canvas>
        </div>
    );
});

export default Canvas;