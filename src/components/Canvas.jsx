import {useEffect, useRef} from "react";
import { observer } from 'mobx-react-lite';
import '../assets/styles/canvas.scss';

import canvasState from '../store/canvasState';
import toolState from "../store/toolState.js";
import Brush from "../tools/Brush.js";
import Eraser from "../tools/Eraser";

const Canvas = observer(() => {
   const canvasRef = useRef();
   const tool = toolState.tool;
   const isBrush = tool instanceof Eraser;

   const mouseDownHandler = () => {
      canvasState.pushToUndo(canvasRef.current.toDataURL());
   }

   useEffect(()=> {
      canvasState.setCanvas(canvasRef.current);
      toolState.setTool(new Brush(canvasRef.current));
   }, []);

   return (
      <div className={`canvas ${isBrush ? 'brush-cursor' : ''}`}>
         <canvas onMouseDown={()=> mouseDownHandler()} ref={canvasRef}  width={600} height={400}></canvas>
      </div>
   );
});

export default Canvas;