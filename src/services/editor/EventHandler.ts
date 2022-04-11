import EditorContorller, { IEditorContorller } from "./EditorController";
import { EditorTypes } from "./types";

interface IEventHandler extends IEditorContorller {
  init: () => void;
  setDrawEndCallback: (c: EditorTypes.DrawCallback) => Promise<void>;
  setResizeCallback: (c: EditorTypes.DrawCallback) => Promise<void>;
  setBoxSelectedCallback: (c: EditorTypes.DrawCallback) => Promise<void>;
}

export default class EventHandler
  extends EditorContorller
  implements IEventHandler
{
  // Events callback
  private drawEndCallback: EditorTypes.DrawCallback | null;
  private resizeEndCallback: EditorTypes.DrawCallback | null;
  private boxSelectedCallback: EditorTypes.DrawCallback | null;
  private isDraw: boolean;
  private isEdit: boolean;
  private isMove: boolean;
  private isResize: boolean;
  private resizePointer: string;
  private resizeDirection: number;
  private startX: number;
  private startY: number;
  private mouseX: number;
  private mouseY: number;

  constructor() {
    super();

    this.isDraw = false;
    this.isEdit = false;
    this.isMove = false;
    this.isResize = false;
    this.resizePointer = "default";
    this.resizeDirection = 0;
    this.startX = 0;
    this.startY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.drawEndCallback = null;
    this.resizeEndCallback = null;
    this.boxSelectedCallback = null;
    this.setEditEvent();
    this.setDrawEvent();
  }

  init() {
    this.editField = null;
    this.drawField = null;
    this.isDraw = false;
    this.isEdit = false;
    this.isMove = false;
    this.isResize = false;
    this.resizePointer = "default";
    this.resizeDirection = 0;
    this.startX = 0;
    this.startY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.fields = [];
    this.dMargin = 0;
    this.setCalculatedDepth();
  }

  async setDrawEndCallback(c: EditorTypes.DrawCallback) {
    this.drawEndCallback = c;
  }

  async setResizeCallback(c: EditorTypes.DrawCallback) {
    this.resizeEndCallback = c;
  }

  async setBoxSelectedCallback(c: EditorTypes.DrawCallback) {
    this.boxSelectedCallback = c;
  }

  private setEditEvent() {
    this.canvasEl.addEventListener("mousemove", this.handleBoxHover.bind(this));
    this.canvasEl.addEventListener(
      "mousemove",
      this.handleCircleHover.bind(this)
    );
    this.canvasEl.addEventListener("mousemove", this.handleResize.bind(this));
    this.canvasEl.addEventListener("mousemove", this.handleBoxMove.bind(this));
    this.canvasEl.addEventListener(
      "mousedown",
      this.handleBoxSelect.bind(this)
    );
    this.canvasEl.addEventListener(
      "mousedown",
      this.handleCircleSelect.bind(this)
    );
    this.canvasEl.addEventListener(
      "mouseup",
      this.handleBoxSelected.bind(this)
    );
    this.canvasEl.addEventListener("mouseup", this.handleResized.bind(this));
    this.canvasEl.addEventListener(
      "mouseleave",
      this.handleBoxSelected.bind(this)
    );
    this.canvasEl.addEventListener("mouseleave", this.handleResized.bind(this));
  }

  private setDrawEvent() {
    this.canvasEl.addEventListener(
      "mousedown",
      this.handleDrawStart.bind(this)
    );
    this.canvasEl.addEventListener("mousemove", this.handleDraw.bind(this));
    this.canvasEl.addEventListener("mouseup", this.handleDrawEnd.bind(this));
    this.canvasEl.addEventListener("mouseleave", this.handleDrawEnd.bind(this));
  }

  private async handleCircleHover(e: MouseEvent) {
    if (!this.editField?.circle || this.isResize || !this.isEdit) {
      return;
    }
    for (let i = 0; i < this.editField.circle.length; i++) {
      if (
        !this.ctx.isPointInPath(this.editField.circle[i], e.offsetX, e.offsetY)
      ) {
        continue;
      }
      if (i === 0 || i === 4) {
        this.resizePointer = "nwse-resize";
      } else if (i === 2 || i === 6) {
        this.resizePointer = "nesw-resize";
      } else if (i === 1 || i === 5) {
        this.resizePointer = "ns-resize";
      } else {
        this.resizePointer = "ew-resize";
      }
      this.canvasEl.style.cursor = this.resizePointer;
      this.resizeDirection = i;
      break;
    }
  }

  private async handleCircleSelect(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isEdit || this.isMove || this.isResize) {
      return;
    }
    this.isResize = true;
    const { offsetX, offsetY } = await this.getOffset();
    const mouseX = e.clientX - offsetX;
    const mouseY = e.clientY - offsetY;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
  }

  private async handleResize(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isResize) {
      return;
    }
    if (!this.editField) {
      return;
    }
    const { offsetX, offsetY } = await this.getOffset();
    const mouseX = e.clientX - offsetX;
    const mouseY = e.clientY - offsetY;

    const scale = this.getScale();
    if (this.mouseX !== mouseX) {
      const x = (this.mouseX - mouseX) / scale;
      this.mouseX = mouseX;
      if (
        this.resizeDirection === 0 ||
        this.resizeDirection === 6 ||
        this.resizeDirection === 7
      ) {
        this.editField.dx = this.editField.dx - x;
        this.editField.dWidth = this.editField.dWidth + x;
      } else if (
        this.resizeDirection === 2 ||
        this.resizeDirection === 3 ||
        this.resizeDirection === 4
      ) {
        this.editField.dWidth = this.editField.dWidth - x;
      }
    }
    if (this.mouseY !== mouseY) {
      const y = (this.mouseY - mouseY) / scale;
      this.mouseY = mouseY;
      if (
        this.resizeDirection === 0 ||
        this.resizeDirection === 1 ||
        this.resizeDirection === 2
      ) {
        this.editField.dy = this.editField.dy - y;
        this.editField.dHeight = this.editField.dHeight + y;
      } else if (
        this.resizeDirection === 4 ||
        this.resizeDirection === 5 ||
        this.resizeDirection === 6
      ) {
        this.editField.dHeight = this.editField.dHeight - y;
      }
    }

    this.canvasEl.style.cursor = this.resizePointer;
    this.draw();
  }

  private async handleResized(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isResize) {
      return;
    }
    if (!this.editField) {
      return;
    }
    if (this.resizeEndCallback && this.editField) {
      this.resizeEndCallback(this.editField);
    }
    this.isResize = false;
  }

  private async handleBoxHover(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    for (const f of this.fields) {
      if (!f.box || !this.ctx.isPointInPath(f.box, e.offsetX, e.offsetY)) {
        if (!this.drawField) {
          this.canvasEl.style.cursor = "default";
        }
        continue;
      }
      this.canvasEl.style.cursor = "pointer";
      break;
    }
  }

  private async handleBoxSelect(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (this.editField?.circle) {
      for (const c of this.editField.circle) {
        if (this.ctx.isPointInPath(c, e.offsetX, e.offsetY)) {
          return;
        }
      }
    }
    this.isEdit = false;
    this.editField = null;

    for (const f of this.fields) {
      if (!f.box || !this.ctx.isPointInPath(f.box, e.offsetX, e.offsetY)) {
        continue;
      } else {
        this.isEdit = true;
        this.isMove = true;
        this.editField = f;
        const { offsetX, offsetY } = await this.getOffset();
        const mouseX = e.clientX - offsetX;
        const mouseY = e.clientY - offsetY;
        this.mouseX = mouseX;
        this.mouseY = mouseY;
      }
    }
    this.draw();
  }

  private async handleBoxMove(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isMove) {
      return;
    }
    if (!this.editField) {
      return;
    }
    const { offsetX, offsetY } = await this.getOffset();
    const mouseX = e.clientX - offsetX;
    const mouseY = e.clientY - offsetY;

    const scale = this.getScale();
    if (this.mouseX !== mouseX) {
      const x = (this.mouseX - mouseX) / scale;
      this.mouseX = mouseX;
      this.editField.dx = this.editField.dx - x;
    }
    if (this.mouseY !== mouseY) {
      const y = (this.mouseY - mouseY) / scale;
      this.mouseY = mouseY;
      this.editField.dy = this.editField.dy - y;
    }

    this.canvasEl.style.cursor = "grabbing";
    this.draw();
  }

  private async handleBoxSelected(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.isMove = false;
    this.canvasEl.style.cursor = "default";
    this.draw();

    if (this.boxSelectedCallback && this.editField) {
      this.boxSelectedCallback(this.editField);
    }
  }

  private async handleDrawStart(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.drawField) {
      return;
    }

    const { offsetX, offsetY } = await this.getOffset();
    this.startX = e.clientX - offsetX;
    this.startY = e.clientY - offsetY;

    const scale = this.getScale();

    this.drawField.dx = this.startX / scale;
    this.drawField.dy = this.startY / scale;
    this.isDraw = true;
  }

  private async handleDrawEnd(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isDraw) {
      return;
    }
    if (!this.drawField) {
      return;
    }
    this.isDraw = false;
    this.drawField.draw = false;

    this.drawField.dx = this.drawField.dx - this.dMargin;
    this.drawField.dy = this.drawField.dy - this.dMargin;

    if (this.drawEndCallback && this.drawField) {
      this.drawEndCallback(this.drawField);
    }

    this.drawField = null;

    this.canvasEl.style.cursor = "default";

    this.draw();
  }

  private async handleDraw(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isDraw) {
      return;
    }
    if (!this.drawField) {
      return;
    }
    const scale = this.getScale();
    const { offsetX, offsetY } = await this.getOffset();
    const mouseX = e.clientX - offsetX;
    const mouseY = e.clientY - offsetY;
    this.drawField.dWidth = (mouseX - this.startX) / scale;
    this.drawField.dHeight = (mouseY - this.startY) / scale;

    this.draw();
  }
}