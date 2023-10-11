import Tool from "./Tool"

export default class Line extends Tool {
   constructor(canvas, webs, sessionId) {
      super(canvas, webs, sessionId);
      this.listen()
   }

   listen() {
      this.canvas.onmousedown = this.mouseDownHandler.bind(this)
      this.canvas.onmouseup = this.mouseUpHandler.bind(this)
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
   }

   mouseDownHandler(e) {
      this.mouseDown = true
      this.currentX = e.pageX - e.target.offsetLeft
      this.currentY = e.pageY - e.target.offsetTop
      this.ctx.beginPath()
      this.ctx.moveTo(this.currentX, this.currentY)
      this.saved = this.canvas.toDataURL()
   }

   mouseUpHandler() {
      this.mouseDown = false;
      this.webs.send(JSON.stringify({
         id: this.sessionId,
         method: "draw",
         figure: {
            type: "line",
            x: this.x,
            y: this.y,
            currentX: this.currentX,
            currentY: this.currentY,
            color: this.ctx.fillStyle,
            strokeColor: this.ctx.strokeStyle,
            lineWidth: this.ctx.lineWidth,
         }
      }));
   }

   mouseMoveHandler(e) {
      if (this.mouseDown) {
         this.x = e.pageX - e.target.offsetLeft;
         this.y = e.pageY - e.target.offsetTop;
         this.draw(this.x, this.y);
      }
   }

   draw(x, y) {
      const img = new Image()
      img.src = this.saved
      img.onload = () => {
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
         this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
         this.ctx.beginPath()
         this.ctx.moveTo(this.currentX, this.currentY);
         this.ctx.lineTo(x, y);
         this.ctx.stroke();
      }
   }

   static drawByData(ctx, x, y,currentX, currentY, color, strokeColor, lineWidth) {
      ctx.fillStyle = color;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(currentX, currentY);
      ctx.lineTo(x, y);
      ctx.stroke();
   }
}