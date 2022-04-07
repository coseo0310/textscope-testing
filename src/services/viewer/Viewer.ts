import DrawEvent, { IDrawEvent, Field } from "./DrawEvent";

type ZoomCommand = "in" | "out" | "init";

type DrawCallback = (field: Field) => void;

interface IViewer extends IDrawEvent {
  getViewer: () => void;
  getScale: () => number;
  getFields: () => Field[];
  setImgUrl: (url: string) => void;
  setZoomInOut: (command: ZoomCommand) => void;
  setRotate: (deg: number) => void;
  setField: (field: Field) => void;
  removeField: (id: string) => void;
  removeFields: () => void;
  draw: () => void;
}

export default class Viewer extends DrawEvent implements IViewer {
  private canvasEl: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private viewerEl: HTMLDivElement;
  private imgEl: HTMLImageElement | null;
  private depth: number;
  private maxDepth: number;
  private minDepth: number;
  private deg: number;
  private fields: Field[];
  private imageCache: HTMLCanvasElement;
  private imageCacheCtx: CanvasRenderingContext2D;

  // Events callback;
  private drawEndCallback: DrawCallback | null;
  private resizeEndCallback: DrawCallback | null;
  private boxSelectedCallback: DrawCallback | null;

  // Draw Events Valiables
  private drawField: Field | null;
  private editField: Field | null;
  private dMargin: number;
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
    this.canvasEl = document.createElement("canvas");
    this.ctx = this.canvasEl.getContext("2d")!;
    this.imageCache = document.createElement("canvas");
    this.imageCacheCtx = this.imageCache.getContext("2d")!;
    this.viewerEl = document.createElement("div");
    this.viewerEl.appendChild(this.canvasEl);
    this.imgEl = null;
    this.maxDepth = 7;
    this.minDepth = -7;
    this.depth = 0;
    this.deg = 0;
    this.fields = [];

    this.drawEndCallback = null;
    this.resizeEndCallback = null;
    this.boxSelectedCallback = null;

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
    this.drawField = null;
    this.editField = null;
    this.dMargin = 0;
    this.setDrawEvent();
    this.setEditEvent();
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

  setDrawEndCallback(c: DrawCallback) {
    this.drawEndCallback = c;
  }
  setResizeCallback(c: DrawCallback) {
    this.resizeEndCallback = c;
  }
  setBoxSelectCallback(c: DrawCallback) {
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

  private getMarginSize(w: number, h: number) {
    return w > h ? w : h;
  }

  private async setScroll() {
    const scale = this.getScale();
    const margin = this.getMarginSize(
      this.canvasEl.width,
      this.canvasEl.height
    );
    await this.viewerEl.scrollTo(0, 0);
    await this.viewerEl.scrollBy({
      top: (margin / 4) * scale,
      left: (margin / 4) * scale,
      behavior: "auto",
    });
  }

  private setCalculatedDepth() {
    const ratio = Math.ceil(
      (this.imgEl?.naturalWidth || 0) / this.viewerEl?.clientWidth
    );
    this.depth = ratio * 2 * -1;
  }

  async setImgUrl(url: string) {
    const image = new Image();
    image.src = url;
    this.imgEl = image;

    this.imgEl.onload = async () => {
      await this.setCalculatedDepth();
      await this.setImageCache();
      await this.draw();
      await this.setScroll();
    };
  }

  async setZoomInOut(command: ZoomCommand) {
    if (this.depth <= this.minDepth && this.depth >= this.maxDepth) {
      return;
    }

    this.viewerEl.scrollTo(0, 0);
    if (command === "out" && this.depth >= this.maxDepth * -1) {
      // OUT
      this.depth -= 1;
    } else if (command === "in" && this.depth <= this.maxDepth) {
      // IN
      this.depth += 1;
    } else if (command === "init") {
      // this.depth = 0;
      this.setCalculatedDepth();
    }

    await this.setImageCache();
    await this.draw();
    await this.setScroll();
  }

  async setRotate(deg: number) {
    this.deg = deg;
    await this.setImageCache();
    await this.draw();
  }

  async setField(field: Field) {
    this.fields.push(field);
  }

  getViewer() {
    this.viewerEl.classList.add("viewer");
    this.viewerEl.style.width = `100%`;
    this.viewerEl.style.height = `100%`;
    this.viewerEl.style.overflow = "scroll";
    this.viewerEl.style.display = "flex";
    this.viewerEl.style.justifyContent = "flex-start";
    this.viewerEl.style.alignItems = "flex-start";
    return this.viewerEl;
  }

  getFields() {
    return this.fields;
  }

  removeField(id: string) {
    this.fields = this.fields.filter((f) => f.id !== id);
  }

  removeFields() {
    this.fields = [];
  }

  getScale() {
    return Number((this.depth * 0.1 + 1).toFixed(1));
  }

  setDraw(field: Field) {
    this.drawField = field;
    this.fields.push(this.drawField);
    this.canvasEl.style.cursor = "crosshair";
  }

  private async getOffset() {
    const cOffset = this.canvasEl.getBoundingClientRect();
    return { offsetX: cOffset.left, offsetY: cOffset.top };
  }

  private setImageCache() {
    if (!this.imgEl) {
      return;
    }

    const scale = this.getScale();
    const cWidth = this.imgEl.naturalWidth * scale;
    const cHeight = this.imgEl.naturalHeight * scale;

    const margin = this.getMarginSize(cWidth, cHeight);
    this.imageCache.width = cWidth + margin * scale;
    this.imageCache.height = cHeight + margin * scale;

    if (this.imageCache.width === 0 || this.imageCache.height === 0) {
      return;
    }

    this.dMargin = margin / 2;

    const dWidth = this.imgEl.naturalWidth;
    const dHeight = this.imgEl.naturalHeight;

    this.setScale(this.imageCacheCtx, { x: scale, y: scale });

    this.drawRotate(this.imageCacheCtx, {
      dx: this.dMargin,
      dy: this.dMargin,
      dWidth,
      dHeight,
      deg: this.deg,
    });

    this.drawImage(this.imageCacheCtx, {
      img: this.imgEl,
      sx: 0,
      sy: 0,
      sWidth: Math.floor(dWidth),
      sHeight: Math.floor(dHeight),
      dx: Math.floor(this.dMargin),
      dy: Math.floor(this.dMargin),
      dWidth: Math.floor(dWidth),
      dHeight: Math.floor(dHeight),
    });
  }

  async draw() {
    if (!this.imgEl) {
      return;
    }
    if (!this.ctx) {
      return;
    }

    const scale = this.getScale();
    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);

    const cWidth = this.imgEl.naturalWidth * scale;
    const cHeight = this.imgEl.naturalHeight * scale;
    const margin = this.getMarginSize(cWidth, cHeight);

    this.canvasEl.width = cWidth + margin * scale;
    this.canvasEl.height = cHeight + margin * scale;

    this.drawImage(this.ctx, {
      img: this.imageCache,
      sx: 0,
      sy: 0,
      sWidth: Math.floor(this.imageCache.width),
      sHeight: Math.floor(this.imageCache.height),
      dx: 0,
      dy: 0,
      dWidth: Math.floor(this.imageCache.width),
      dHeight: Math.floor(this.imageCache.height),
    });

    this.setScale(this.ctx, { x: scale, y: scale });
    this.drawFields(this.ctx, this.fields, this.dMargin);

    if (this.editField) {
      this.editField.circle = this.drawEditCircles(
        this.ctx,
        this.editField,
        this.dMargin
      );
    }
  }
}
