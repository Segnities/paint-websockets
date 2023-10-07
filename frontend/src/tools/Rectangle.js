import Tool from "./Tool.js";

export default class Rectangle extends Tool {
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
                type: "rectangle",
                x: this.startX,
                y: this.startY,
                width: this.width,
                height:  this.height
            }
        }));
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL();
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            this.draw(this.startX, this.startY, width, height);
        }
    }

    draw(sx, sy, w, h) {
        const img = new Image();
        img.src = this.saved;
        img.onload =  () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.rect(sx, sy, w, h);
            this.ctx.fill();
            this.ctx.stroke();
        }
        this.ctx.rect(sx, sy, w, h);
        this.ctx.fill();
        this.ctx.stroke();
    }
}