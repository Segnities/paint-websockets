export default class Tool {
   constructor(canvas, webs, sessionId) {
      this.canvas = canvas;
      this.webs = webs;
      this.sessionId = sessionId;
      this.ctx = canvas.getContext('2d');
      this.destroyEvents();
   }

   set fillColor(color) {
      this.ctx.fillStyle = color;
   }

   set fillStrokeColor(color) {
      this.ctx.strokeStyle = color;
   }

   set lineWidth(width) {
      this.ctx.lineWidth = width;
   }
   destroyEvents() {
      this.canvas.onmousemove = null;
      this.canvas.onmouseup = null;
      this.canvas.onmousedown = null;
   }
}