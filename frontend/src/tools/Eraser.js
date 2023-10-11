import Tool from "./Tool";

export default class Eraser extends Tool {
   constructor(canvas, webs, sessionId) {
      super(canvas, webs, sessionId);
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
      this.socket.send(JSON.stringify({
         method: 'draw',
         id: this.id,
         figure: {
            type: 'finish',
         }
      }))
   }  
   mouseDownHandler(e) {
      this.mouseDown = true;
      this.ctx.beginPath();
      this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
   }
   mouseMoveHandler(e) {
      if (this.mouseDown) {
         this.webs.send(JSON.stringify({
            method: "draw",
            id: this.sessionId,
            figure: {
               type: "eraser",
               x: e.pageX - e.target.offsetLeft,
               y: e.pageY - e.target.offsetTop,
               lineWidth: this.ctx.lineWidth,
            }
         }));
      }
   }
   static erase(ctx, x, y, lineWidth) {
      ctx.lineWidth = lineWidth;
      ctx.lineTo(x, y);
      ctx.stroke();
      console.log('ERASING!');
   }
} 