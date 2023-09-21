import {useEffect, useRef} from "react";
import { observer } from 'mobx-react-lite';
import '../assets/styles/canvas.scss';

import canvasState from '../store/canvasState';

const Canvas = observer(() => {
   const canvasRef = useRef();
   useEffect(()=> {
      canvasState.setCanvas(canvasRef.current);
   }, [])

   return (
      <div className="canvas">
         <canvas ref={canvasRef}  width={600} height={400}></canvas>
      </div>
   );
});

export default Canvas;