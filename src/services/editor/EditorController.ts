import EventHandler, { IEventHandler } from "./EventHandler";
import { EditorTypes } from "./types";

type ZoomCommand = EditorTypes.ZoomCommand;
type Field = EditorTypes.Field;
type DrawType = EditorTypes.DrawType;

export interface IEditorContorller extends IEventHandler {
  setImgUrl: (url: string) => Promise<void>;
  setZoomInOut: (command: ZoomCommand) => Promise<void>;
  setRotate: (deg: number) => Promise<void>;
  setDraw: (drawType: DrawType, field?: Field) => Promise<void>;
  getCanvas: () => HTMLCanvasElement | OffscreenCanvas | null;
  getMargin: () => number;
  setIsText: (isText: boolean) => Promise<void>;
  setIsIdx: (isIdx: boolean) => Promise<void>;
  setField: (field: Field) => Promise<void>;
  modifyField: (field: Field) => Promise<void>;
  setSection: (field: Field) => Promise<void>;
  setSections: (fields: Field[]) => Promise<void>;
  setSectionField: (n: number) => Promise<void>;
  setSectionDraw: (b: boolean) => Promise<void>;
  setEditField: (n: number) => Promise<void>;
  getFields: () => Field[];
  getSections: () => Field[];
  getSectionIdx: () => number;
  getSectionLength: () => number;
  getEditField: () => Field | null;
  clearEditField: () => Promise<void>;
  clearSectionField: () => Promise<void>;
  removeField: (id: string) => void;
  removeFields: () => void;
  removeSection: (id: string) => void;
  removeSections: () => void;
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
      this.setDrawEvent();
      this.setEditEvent();
    }
  }

  getCanvas() {
    return this.canvasEl;
  }

  async setImgUrl(url: string) {
    const image = new Image();
    image.src = url;
    this.imgEl = image;

    this.imgEl.onload = async () => {
      await this.setCalculatedDepth();
      await this.setImageCache();
      await this.draw();
    };
  }

  async setIsText(isText: boolean) {
    this.isText = isText;
  }

  async setIsIdx(isIdx: boolean) {
    this.isIdx = isIdx;
  }

  async setSections(fields: Field[]) {
    this.sections = fields;
    if (this.isSection) {
      this.sectionField = this.sections[0];
    }
  }

  async setSection(field: Field) {
    this.sections.push(field);
  }

  async setSectionField(n: number) {
    if (this.sections.length === 0) {
      return;
    }
    this.sectionField = this.sections[n];
    this.draw();
  }

  async setSectionDraw(b: boolean) {
    this.isSection = b;
  }

  async setField(field: Field) {
    this.fields.push(field);
  }

  async setFields(fields: Field[]) {
    this.fields = fields;
  }

  async setEditField(n: number) {
    if (this.fields.length === 0) {
      return;
    }
    this.editField = this.fields[n];
    this.draw();
  }

  async clearEditField() {
    this.editField = null;
  }

  async clearSectionField() {
    this.sectionField = null;
  }

  async modifyField(field: Field) {
    const f = this.fields.find((f) => f.id === field.id);
    if (!f) {
      return;
    }
    f.text = field.text;
  }

  async removeSection(id: string) {
    this.sections = this.sections.filter((s) => s.id !== id);
  }

  async removeSections() {
    this.sections = [];
  }

  async removeField(id: string) {
    this.fields = this.fields.filter((f) => f.id !== id);
  }

  async removeFields() {
    this.fields = [];
  }

  getMargin() {
    return this.dMargin;
  }

  getSections() {
    return this.sections;
  }

  getSectionIdx() {
    return this.sectionField ? this.sections.indexOf(this.sectionField) : 0;
  }

  getSectionLength() {
    return this.sectionField ? this.sections.length : 1;
  }

  getEditField() {
    return this.editField;
  }

  getFields() {
    if (this.sectionField) {
      return this.fields.filter((f) =>
        this.sectionValid(f.dx, f.dy, f.dWidth, f.dHeight)
      );
    }
    return this.fields;
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
  }

  async setRotate(deg: number) {
    this.deg = deg;
    await this.setImageCache();
    await this.draw();
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

  async setDraw(drawType: DrawType, field?: Field) {
    if (!this.canvasEl || !this.ctx) {
      return;
    }

    const color = drawType === "new" ? `rgba(220, 118, 118, 1)` : "#FFD59E";

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
          color,
          lineWidth: 5,
          draw: true,
        };
    this.canvasEl.style.cursor = "crosshair";
    this.drawType = drawType;
    this.crosshair.color = color;
  }
}
