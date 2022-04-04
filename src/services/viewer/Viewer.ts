import DrawEvent, { IDrawEvent } from "./DrawEvent";
import { v4 as uuidv4 } from "uuid";

type ZoomCommand = "in" | "out" | "init";

export type Field = {
  id: string;
  text: string;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
  type: "fill" | "stroke";
  color: string;
  lineWidth?: number;
  draw?: boolean;
};

interface IViewer extends IDrawEvent {
  getViewer: () => void;
  getScale: () => number;
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

  private editField: Field | null;
  private dMargin: number;
  private isDown: boolean;
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

    this.isDown = false;
    this.startX = 0;
    this.startY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.editField = null;
    this.dMargin = 0;
    this.setMouseEvent();
  }

  private setMouseEvent() {
    this.canvasEl.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this)
    );
    this.canvasEl.addEventListener(
      "mousemove",
      this.handleMouseMove.bind(this)
    );
    this.canvasEl.addEventListener("mouseup", this.handleMouseLeave.bind(this));
    this.canvasEl.addEventListener(
      "mouseleave",
      this.handleMouseLeave.bind(this)
    );
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

  setField(field: Field) {
    this.fields.push(field);
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

  private async getOffset() {
    const cOffset = this.canvasEl.getBoundingClientRect();
    return { offsetX: cOffset.left, offsetY: cOffset.top };
  }

  private async handleMouseDown(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.editField = {
      id: uuidv4(),
      text: `tmp`,
      dx: 0,
      dy: 0,
      dWidth: 0,
      dHeight: 0,
      type: "stroke",
      color: `red`,
      lineWidth: 5,
      draw: true,
    };

    const { offsetX, offsetY } = await this.getOffset();
    this.startX = e.clientX - offsetX;
    this.startY = e.clientY - offsetY;

    const scale = this.getScale();

    this.editField.dx = this.startX / scale;
    this.editField.dy = this.startY / scale;
    this.fields.push(this.editField);
    this.isDown = true;
  }

  private async handleMouseLeave(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isDown || !this.editField) {
      return;
    }
    this.isDown = false;
    this.editField.draw = false;

    this.editField.dx = this.editField.dx - this.dMargin;
    this.editField.dy = this.editField.dy - this.dMargin;
  }

  private async handleMouseMove(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isDown || !this.editField) {
      return;
    }
    const scale = this.getScale();
    const { offsetX, offsetY } = await this.getOffset();
    const mouseX = e.clientX - offsetX;
    const mouseY = e.clientY - offsetY;
    this.editField.dWidth = (mouseX - this.startX) / scale;
    this.editField.dHeight = (mouseY - this.startY) / scale;

    this.draw();
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
    const imgCanvas = document.createElement("canvas");
    const imgCtx = imgCanvas.getContext("2d");
    if (!imgCtx || !this.ctx) {
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

    for (const f of this.fields) {
      const rectOption = {
        dx: Math.floor(f.draw ? f.dx : f.dx + this.dMargin),
        dy: Math.floor(f.draw ? f.dy : f.dy + this.dMargin),
        dWidth: Math.floor(f.dWidth),
        dHeight: Math.floor(f.dHeight),
        color: f.color,
        lineWidth: 5,
      };
      // const textOption = {
      //   dx: f.dx,
      //   dy: f.dy,
      //   text: `${f.id}: ${f.text}`,
      //   font: "48px serif",
      //   color: "blue",
      // };
      if (f.type === "fill") {
        this.fillRect(this.ctx, rectOption);
      } else if (f.type === "stroke") {
        this.strokeRect(this.ctx, rectOption);
      }
      // this.fillText(this.ctx, textOption);
    }
  }
}
