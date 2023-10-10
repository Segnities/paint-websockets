import { observer } from 'mobx-react-lite';

import '../assets/styles/toolbar.scss';
import toolState from "../store/toolState.js";
import Brush from "../tools/Brush.js";
import canvasState from "../store/canvasState.js";
import Rectangle from "../tools/Rectangle.js";
import Circle from "../tools/Circle.js";
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';

const ToolBar = observer(() => {
   const changeColor = (e) => {
      toolState.setFillStroke(e.target.value);
      toolState.setFillColor(e.target.value);
   }
   return (
      <div className="toolbar">
         <div className='left-menu'>
            <button className='toolbar-btn brush' onClick={()=> toolState.setTool(new Brush(canvasState.canvas, canvasState.webs, canvasState.sessionId))}/>
            <button className='toolbar-btn rect' onClick={()=> toolState.setTool(new Rectangle(canvasState.canvas, canvasState.webs, canvasState.sessionId))}/>
            <button className='toolbar-btn circle' onClick={()=> toolState.setTool(new Circle(canvasState.canvas, canvasState.webs, canvasState.sessionId))}/>
            <button className='toolbar-btn eraser' onClick={()=> toolState.setTool(new Eraser(canvasState.canvas))}/>
            <button className='toolbar-btn line' onClick={()=> toolState.setTool(new Line(canvasState.canvas))}/>
            <input type='color' className='color-picker' onChange={e => changeColor(e)}/> 
         </div>
         <div className='right-menu'>
            <button className='toolbar-btn undo' onClick={() => canvasState.undo()} />
            <button className='toolbar-btn redo' onClick={()=> canvasState.redo()}/>
            <button className='toolbar-btn save' />
         </div>
      </div>
   )
});

export default ToolBar;