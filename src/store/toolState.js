import { makeAutoObservable } from "mobx";

class ToolState {
   toll = null;
   constructor() {
      makeAutoObservable(this);
   }

   setTool(tool) {
      this.toll = tool;
   }
}

export default new ToolState();