import Tool from "./Tool";

export default class Eraser extends Tool {
   constructor(canvas) {
      super(canvas);
      this.listen();
      this.ctx.strokeStyle="white";
   }

   listen() {
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
      this.canvas.onmouseup = this.mouseUpHandler.bind(this);
      this.canvas.onmousedown = this.mouseDownHandler.bind(this);
   }
   mouseUpHandler() {
      this.mouseDown = false;
   }  
   mouseDownHandler(e) {
      this.mouseDown = true;
      this.ctx.beginPath();
      this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
   }
   mouseMoveHandler(e) {
      if (this.mouseDown) {
         this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
      }
   }
   draw(x, y) {
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      console.log('DRAWING!');
   }
} 