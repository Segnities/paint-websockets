import Tool from "./Tool.js";

export default class Circle extends Tool {
    constructor(canvas, webs, sessionId) {
        super(canvas, webs, sessionId);
        this.ctx = canvas.getContext("2d");
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
                type:"circle",
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
                radius: this.radius,
                color: this.ctx.fillStyle,
                strokeColor: this.ctx.strokeStyle,
                lineWidth: this.ctx.lineWidth,
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
            this.radius = Math.sqrt(this.width ** 2 + this.height ** 2);
            this.draw(this.startX, this.startY, this.radius);
        }
    }

    draw(sx, sy, r) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(sx, sy, r, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
        };
    }
    static drawByData(ctx, x, y, r, color, strokeColor, lineWidth) {
        ctx.fillStyle = color;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}
