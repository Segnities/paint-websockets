import {makeAutoObservable} from "mobx";

class CanvasState {
    canvas = null;
    undoList = [];
    redoList = [];
    username= "";
    webs = null;
    sessionId = null;
    constructor() {
        makeAutoObservable(this);
    }

    setWebs(webs) {
        this.webs = webs;
    }

    setSessionId(userId) {
        this.sessionId = userId;
    }

    setUsername(username) {
        this.username = username;
    }
    setCanvas(canvas) {
        this.canvas = canvas;
    }
    pushToUndo(data) {
        this.undoList.push(data);
    }

    pushToRedo(data) {
        this.redoList.push(data);
    }

    undo() {
        let ctx = this.canvas.getContext('2d');
        if (this.undoList.length > 0) {
            let dataUrl = this.undoList.pop();
            this.pushToRedo(this.canvas.toDataURL());
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
                ctx.drawImage(img,0,0, this.canvas.width, this.canvas.height);
            }
        } else {
            ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        }
    }

    redo() {
        let ctx = this.canvas.getContext('2d');
        if (this.redoList.length > 0) {
            let dataUrl = this.redoList.pop();
            this.pushToUndo(this.canvas.toDataURL());
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
                ctx.drawImage(img,0,0, this.canvas.width, this.canvas.height);
            }
        }
    }
}

export default new CanvasState();
