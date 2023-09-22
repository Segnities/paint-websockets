import {useEffect, useRef} from "react";
import { observer } from 'mobx-react-lite';
import '../assets/styles/canvas.scss';

import canvasState from '../store/canvasState';
import toolState from "../store/toolState.js";
import Brush from "../tools/Brush.js";

const Canvas = observer(() => {
   const canvasRef = useRef();
   useEffect(()=> {
      canvasState.setCanvas(canvasRef.current);
      toolState.setTool(new Brush(canvasRef.current));
   }, [])

   return (
      <div className="canvas">
         <canvas ref={canvasRef}  width={600} height={400}></canvas>
      </div>
   );
});

export default Canvas;