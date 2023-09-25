import '../assets/styles/toolbar.scss';
import toolState from "../store/toolState.js";
import Brush from "../tools/Brush.js";
import canvasState from "../store/canvasState.js";
import Rectangle from "../tools/Rectangle.js";
import Circle from "../tools/Circle.js";
import Eraser from '../tools/Eraser';
function ToolBar() {
   return (
      <div className="toolbar">
         <div className='left-menu'>
            <button className='toolbar-btn brush' onClick={()=> toolState.setTool(new Brush(canvasState.canvas))}/>
            <button className='toolbar-btn rect' onClick={()=> toolState.setTool(new Rectangle(canvasState.canvas))}/>
            <button className='toolbar-btn circle' onClick={()=> toolState.setTool(new Circle(canvasState.canvas))}/>
            <button className='toolbar-btn eraser' onClick={()=> toolState.setTool(new Eraser(canvasState.canvas))}/>
            <button className='toolbar-btn line' />
            <input type='color' className='color-picker'/> 
         </div>
         <div className='right-menu'>
            <button className='toolbar-btn undo' />
            <button className='toolbar-btn redo' />
            <button className='toolbar-btn save' />
         </div>
      </div>
   )
}

export default ToolBar;