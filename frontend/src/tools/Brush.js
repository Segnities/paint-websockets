import Tool from "./Tool";

export default class Brush extends Tool {
   constructor(canvas, webs, sessionId) {
      super(canvas, webs, sessionId);
      this.listen();
   }
   listen() {
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
      this.canvas.onmouseup = this.mouseUpHandler.bind(this);
      this.canvas.onmousedown = this.mouseDownHandler.bind(this);
   }
   mouseUpHandler() {
      this.mouseDown = false;
      this.webs.send(JSON.stringify({
         method: "draw",
         id: this.sessionId,
         figure: {
            type: "finish",
         }
      }));
   }  
   mouseDownHandler(e) {
      this.mouseDown = true;
      this.ctx.beginPath();
      this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
   }
   mouseMoveHandler(e) {
      if (this.mouseDown) {
         console.log(this.sessionId);
         this.webs.send(JSON.stringify({
            method: "draw",
            id: this.sessionId,
            figure: {
               type: "brush",
               x: e.pageX - e.target.offsetLeft,
               y: e.pageY - e.target.offsetTop,
               color: this.ctx.fillStyle,
               strokeColor: this.ctx.strokeStyle,
               lineWidth: this.ctx.lineWidth,
            }
         }));
      }
   }
   static draw(ctx, x, y, color, strokeColor,lineWidth) {
      ctx.fillStyle = color;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      ctx.lineTo(x, y);
      ctx.stroke();
      console.log('DRAWING!');
   }
}