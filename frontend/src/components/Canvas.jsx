import {useEffect, useRef} from "react";
import {observer} from 'mobx-react-lite';

import canvasState from '../store/canvasState';
import toolState from "../store/toolState.js";
import usernameFormState from "../store/usernameFormState.js";

import Brush from "../tools/Brush.js";
import Eraser from "../tools/Eraser";

import '../assets/styles/canvas.scss';
import {useParams} from "react-router-dom";
import Rectangle from "../tools/Rectangle.js";


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
      const figure =  msg.figure;
      const ctx = canvasRef.current.getContext("2d");

      const figureType = figure.type;

      if (figureType === "brush"){
         Brush.draw(ctx, figure.x, figure.y);
      } else if (figureType === "rect") {
         console.log("DRAW RECT")
         Rectangle.drawByData(ctx, figure.x, figure.y, figure.width, figure.height);
      } else if (figureType === "finish") {
         ctx.beginPath();
      }
   }

   useEffect(()=> {
      canvasState.setCanvas(canvasRef.current);
   }, []);

   useEffect(()=> {
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
            } else if (msg.method === "draw") {
               drawHandler(msg);
            }
         }
      }
   }, [username, formSubmitted]);

   return (
      <div className={`canvas ${isBrush ? 'brush-cursor' : ''}`}>
         <canvas onMouseDown={()=> mouseDownHandler()} ref={canvasRef}  width={600} height={400}></canvas>
      </div>
   );
});

export default Canvas;