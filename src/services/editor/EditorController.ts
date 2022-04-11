import EditorConfig, { IEditorConfig } from "./EditorConfig";
import { EditorTypes } from "./types";

type ZoomCommand = EditorTypes.ZoomCommand;
type Field = EditorTypes.Field;

export interface IEditorContorller extends IEditorConfig {
  getViewer: () => void;
  setImgUrl: (url: string) => Promise<void>;
  setZoomInOut: (command: ZoomCommand) => Promise<void>;
  setRotate: (deg: number) => Promise<void>;
  setField: (field: Field) => Promise<void>;
  getFields: () => Field[];
  removeField: (id: string) => void;
  removeFields: () => void;
  setDraw: (field: Field) => Promise<void>;
  draw: () => Promise<void>;
}

export default class EditorContorller
  extends EditorConfig
  implements IEditorContorller
{
  constructor() {
    super();
  }

  getViewer() {
    return this.editorEl;
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

    this.editorEl.scrollTo(0, 0);
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

  getFields() {
    return this.fields;
  }

  removeField(id: string) {
    this.fields = this.fields.filter((f) => f.id !== id);
  }

  removeFields() {
    this.fields = [];
  }

  async setDraw(field: Field) {
    this.drawField = field;
    this.fields.push(this.drawField);
    this.canvasEl.style.cursor = "crosshair";
  }

  async draw() {
    if (!this.imgEl || !this.imageCache) {
      return;
    }

    if (this.imageCache.width === 0 || this.imageCache.height === 0) {
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
