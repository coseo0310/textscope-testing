import { EditorTypes } from "./types";

export interface IEditorConfig {
  getScale: () => number;
  setIsText: (isText: boolean) => void;
  setIsIdx: (isIdx: boolean) => void;
}

interface Crosshair {
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
  color: string;
}
export default class EditorConfig implements IEditorConfig {
  // Editor Elements values
  protected canvasEl: HTMLCanvasElement | null;
  protected ctx: CanvasRenderingContext2D | null;
  protected imgEl: HTMLImageElement;
  protected imageCache: HTMLCanvasElement | null;
  protected imageCacheCtx: CanvasRenderingContext2D | null;

  // Editor setting values
  protected depth: number;
  protected maxDepth: number;
  protected minDepth: number;
  protected deg: number;
  protected fields: EditorTypes.Field[];
  protected dMargin: number;
  protected crosshair: Crosshair;

  // Is
  protected isText: boolean;
  protected isIdx: boolean;

  // Editor Event Handler Field values;
  protected drawField: EditorTypes.Field | null;
  protected editField: EditorTypes.Field | null;

  constructor() {
    if (document) {
      this.canvasEl = document.createElement("canvas");
      this.ctx = this.canvasEl.getContext("2d")!;
      this.imageCache = document.createElement("canvas");
      this.imageCacheCtx = this.imageCache.getContext("2d")!;
    } else {
      this.canvasEl = null;
      this.ctx = null;
      this.imageCache = null;
      this.imageCacheCtx = null;
    }

    this.imgEl = new Image();

    this.maxDepth = 7;
    this.minDepth = -7;
    this.depth = 0;
    this.deg = 0;
    this.dMargin = 0;
    this.fields = [];
    this.crosshair = {
      dx: 0,
      dy: 0,
      dWidth: 0,
      dHeight: 0,
      color: "red",
    };

    this.isText = false;
    this.isIdx = false;

    this.drawField = null;
    this.editField = null;
  }

  setIsText(isText: boolean) {
    this.isText = isText;
  }

  setIsIdx(isIdx: boolean) {
    this.isIdx = isIdx;
  }

  protected getMarginSize(w: number, h: number) {
    return w > h ? w : h;
  }

  protected async setScroll() {
    if (!this.canvasEl || !this.ctx) {
      return;
    }
    const scale = this.getScale();
    const margin = this.getMarginSize(
      this.canvasEl.width,
      this.canvasEl.height
    );

    if (!this.canvasEl.parentElement?.scrollTo) {
      return;
    }

    await this.canvasEl.parentElement.scrollTo(0, 0);
    await this.canvasEl.parentElement.scrollBy({
      top: (margin / 3) * scale,
      left: (margin / 3) * scale,
      behavior: "auto",
    });
  }

  protected async getOffset() {
    if (!this.canvasEl || !this.ctx) {
      return {
        offsetX: 0,
        offsetY: 0,
        offsetWidth: 0,
        offsetHeight: 0,
      };
    }
    const cOffset = this.canvasEl.getBoundingClientRect();
    return {
      offsetX: cOffset.left,
      offsetY: cOffset.top,
      offsetWidth: cOffset.width,
      offsetHeight: cOffset.height,
    };
  }

  getScale() {
    return Number((this.depth * 0.1 + 1).toFixed(1));
  }

  protected setCalculatedDepth() {
    if (!this.canvasEl || !this.ctx) {
      return;
    }
    if (!this.imgEl) {
      return;
    }
    if (!this.canvasEl.parentElement) {
      return;
    }
    const ratio = Math.ceil(
      this.imgEl.naturalWidth / this.canvasEl.parentElement.clientWidth
    );
    this.depth = ratio * 2 * -1;
  }
}
