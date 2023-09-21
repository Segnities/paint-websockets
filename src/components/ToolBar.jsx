import '../assets/styles/toolbar.scss';

function ToolBar() {
   return (
      <div className="toolbar">
         <div className='left-menu'>
            <button className='toolbar-btn brush' />
            <button className='toolbar-btn rect' />
            <button className='toolbar-btn circle' />
            <button className='toolbar-btn eraser' />
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