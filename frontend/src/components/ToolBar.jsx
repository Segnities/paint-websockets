import {useState, useEffect} from "react";
import { observer } from 'mobx-react-lite';

import toolState from "../store/toolState.js";
import canvasState from "../store/canvasState.js";

import Brush from "../tools/Brush.js";
import Rectangle from "../tools/Rectangle.js";
import Circle from "../tools/Circle.js";
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';

import '../assets/styles/toolbar.scss';


const ToolBar = observer(() => {
    const [historyActionType, setHistoryActionType] = useState("none");
   const changeColor = (e) => {
      toolState.setFillStroke(e.target.value);
      toolState.setFillColor(e.target.value);
   }

    useEffect(() => {
        if (canvasState.webs) {
            canvasState.webs.send(JSON.stringify({
                id: canvasState.sessionId,
                action: historyActionType,
                method: "history",
                undoList: canvasState.undoList,
                redoList: canvasState.redoList
            }));
            console.log("HISTORY WORKS!")
        }
    }, [historyActionType]);

   return (
      <div className="toolbar">
         <div className='left-menu'>
            <button className='toolbar-btn brush' onClick={()=> toolState.setTool(new Brush(canvasState.canvas, canvasState.webs, canvasState.sessionId))}/>
            <button className='toolbar-btn rect' onClick={()=> toolState.setTool(new Rectangle(canvasState.canvas, canvasState.webs, canvasState.sessionId))}/>
            <button className='toolbar-btn circle' onClick={()=> toolState.setTool(new Circle(canvasState.canvas, canvasState.webs, canvasState.sessionId))}/>
            <button className='toolbar-btn eraser' onClick={()=> toolState.setTool(new Eraser(canvasState.canvas, canvasState.webs, canvasState.sessionId))}/>
            <button className='toolbar-btn line' onClick={()=> toolState.setTool(new Line(canvasState.canvas, canvasState.webs, canvasState.sessionId))}/>
            <input type='color' className='color-picker' onChange={e => changeColor(e)}/> 
         </div>
         <div className='right-menu'>
            <button className='toolbar-btn undo' onClick={() => {
                canvasState.undo();
                setHistoryActionType('undo')
            }} />
            <button className='toolbar-btn redo' onClick={()=> {
                canvasState.redo();
                setHistoryActionType('redo');
            }} />
            <button className='toolbar-btn save' />
         </div>
      </div>
   )
});

export default ToolBar;