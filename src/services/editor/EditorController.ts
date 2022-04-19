import EventHandler, { IEventHandler } from "./EventHandler";
import { EditorTypes } from "./types";

type ZoomCommand = EditorTypes.ZoomCommand;
type Field = EditorTypes.Field;

export interface IEditorContorller extends IEventHandler {
  setImgUrl: (url: string) => Promise<void>;
  setZoomInOut: (command: ZoomCommand) => Promise<void>;
  setRotate: (deg: number) => Promise<void>;
  setField: (field: Field) => Promise<void>;
  getFields: () => Field[];
  removeField: (id: string) => void;
  removeFields: () => void;
  setDraw: (field?: Field) => Promise<void>;
  setCanvas: (canvas: HTMLCanvasElement) => void;
  setCacheCanvas: (canvas: HTMLCanvasElement) => void;
  setOffsetCanvas: (canvas: OffscreenCanvas) => void;
  getCanvas: () => HTMLCanvasElement | OffscreenCanvas | null;
}

export default class EditorContorller
  extends EventHandler
  implements IEditorContorller
{
  constructor(canvas?: HTMLCanvasElement) {
    super();

    if (canvas) {
      this.canvasEl = canvas;
      this.ctx = canvas.getContext("2d")!;
    }
  }

  getCanvas() {
    return this.canvasEl;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvasEl = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.setDrawEvent();
    this.setEditEvent();
  }

  setCacheCanvas(canvas: HTMLCanvasElement | OffscreenCanvas) {
    this.imageCache = canvas;
    this.ctx = canvas.getContext("2d")!;
  }

  setOffsetCanvas(offCanvas: OffscreenCanvas) {
    this.offCanvasEl = offCanvas;
    if (!this.offCanvasEl) {
      return;
    }
    this.ctx = this.offCanvasEl.getContext("2d")!;
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

    if (!this.canvasEl?.parentElement) {
      return;
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
  async setFields(fields: Field[]) {
    this.fields = fields;
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

  private setImageCache() {
    if (!this.imageCache || !this.imageCacheCtx) {
      return;
    }
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

  async setDraw(field?: Field) {
    if (!this.canvasEl || !this.ctx) {
      return;
    }
    this.drawField = field
      ? field
      : {
          id: `tmp-${Date.now()}`,
          text: "",
          dx: 0,
          dy: 0,
          dWidth: 0,
          dHeight: 0,
          type: "stroke",
          color: `rgba(220, 118, 118, 1)`,
          lineWidth: 5,
          draw: true,
        };
    this.canvasEl.style.cursor = "crosshair";
  }
}
