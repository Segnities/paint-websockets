import {makeAutoObservable} from "mobx";

class ToolState {
    tool = null;

    constructor() {
        makeAutoObservable(this);
    }

    setFillColor(color) {
        this.tool.fillStyle = color;
    }

    setFillStroke(color) {
        this.tool.strokeStyle = color;
    }

    setLineWidth(width) {
      this.tool.lineWidth = width;
    }

    setTool(tool) {
        this.tool = tool;
    }
}

export default new ToolState();