import EventHandler, { IEventHandler } from "./EventHandler";
import { EditorTypes } from "./types";

type Field = EditorTypes.Field;
type DrawType = EditorTypes.DrawType;

interface Options {
  canvas?: HTMLCanvasElement;
  isReadonly?: boolean;
}

export interface IEditorContorller extends IEventHandler {
  setImgUrl: (url: string) => Promise<void>;
  setZoomInOut: (depth: number) => Promise<void>;
  setRotate: (deg: number) => Promise<void>;
  setDraw: (drawType: DrawType, field?: Field) => Promise<void>;
  getCanvas: () => HTMLCanvasElement | null;
  getMargin: () => number;
  setIsText: (isText: boolean) => Promise<void>;
  setIsIdx: (isIdx: boolean) => Promise<void>;
  setField: (field: Field) => Promise<void>;
  modifyField: (field: Field) => Promise<void>;
  setSection: (field: Field) => Promise<void>;
  setSections: (fields: Field[]) => Promise<void>;
  setSectionField: (n: number) => Promise<void>;
  setSectionDraw: (b: boolean) => Promise<void>;
  setSectionControl: (b: boolean) => Promise<void>;
  setCalculatedScale: () => void;
  setEditField: (id: string) => Promise<void>;
  getFields: () => Field[];
  getSections: () => Field[];
  getSectionIdx: () => number;
  getSectionLength: () => number;
  getSectionField: () => Field | null;
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
  constructor(options?: Options) {
    super();

    if (options?.canvas) {
      this.canvasEl = options.canvas;
      this.ctx = options.canvas.getContext("2d")!;
      this.setDrawEvent();
      this.setEditEvent();
    }
    if (options?.isReadonly) {
      this.isReadonly = options.isReadonly;
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

  async setSectionControl(b: boolean) {
    this.isSectionControl = b;
  }

  async setField(field: Field) {
    this.fields.push(field);
  }

  async setFields(fields: Field[]) {
    this.fields = fields;
  }

  async setEditField(id: string) {
    if (this.fields.length === 0) {
      return;
    }
    this.editField = this.fields.find((f) => f.id === id) || null;
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

  getSectionField() {
    return this.sectionField;
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

  async setZoomInOut(depth: number) {
    if (this.depth <= this.minDepth && this.depth >= this.maxDepth) {
      return;
    }

    if (depth > this.maxDepth || depth < this.maxDepth) {
      return;
    }

    this.depth = depth;

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

  setCalculatedScale() {
    if (!this.canvasEl || !this.ctx) {
      return;
    }
    if (!this.imgEl) {
      return;
    }
    if (!this.canvasEl.parentElement) {
      return;
    }

    const cWidth = this.imgEl.naturalWidth;
    const cHeight = this.imgEl.naturalHeight;
    const pWidth = this.canvasEl.parentElement.clientWidth;
    const r = this.getRotate();

    const width = r === 1 || r === -1 ? cHeight : cWidth;

    const p = Math.abs(Math.floor((pWidth / width) * 100));

    this.depth = p;
    this.setImageCache();
    this.draw();
    this.setScroll();
  }

  protected async setScroll() {
    if (!this.canvasEl || !this.ctx) {
      return;
    }

    if (!this.canvasEl.parentElement?.scrollTo) {
      return;
    }
    const scale = this.getScale();
    const margin = this.dMargin * scale;
    const mWidth = this.imgEl.naturalWidth * scale;
    const mHeight = this.imgEl.naturalHeight * scale;

    const r = this.getRotate();

    const mTop =
      r === 1 || r === -1
        ? (mWidth - this.canvasEl.clientHeight) / 2
        : (mHeight - this.canvasEl.clientHeight) / 2;

    const mLeft =
      r === 1 || r === -1
        ? (mHeight - this.canvasEl.clientWidth) / 2
        : (mWidth - this.canvasEl.clientWidth) / 2;

    await this.canvasEl.scrollIntoView({
      behavior: "auto",
      block: "start",
      inline: "start",
    });

    await this.canvasEl.parentElement.scrollBy({
      top: Math.abs(Math.floor(mTop)),
      left: Math.abs(Math.floor(mLeft)),
      behavior: "auto",
    });
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
    this.drawField = field
      ? field
      : {
          id: `tmp-${Date.now()}`,
          text: "",
          dx: 0,
          dy: 0,
          dWidth: 0,
          dHeight: 0,
          type: "new",
          lineWidth: 5,
          draw: true,
        };
    this.canvasEl.style.cursor = "crosshair";
    this.drawType = drawType;
  }
}
