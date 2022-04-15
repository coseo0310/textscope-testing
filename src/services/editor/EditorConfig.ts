import { EditorTypes } from "./types";

export interface IEditorConfig {
  getScale: () => number;
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
  protected canvasEl: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  protected editorEl: HTMLDivElement;
  protected imgEl: HTMLImageElement;
  protected imageCache: HTMLCanvasElement;
  protected imageCacheCtx: CanvasRenderingContext2D;

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

  // Editor Event Handler Field values;
  protected drawField: EditorTypes.Field | null;
  protected editField: EditorTypes.Field | null;

  constructor() {
    this.canvasEl = document.createElement("canvas");
    this.ctx = this.canvasEl.getContext("2d")!;
    this.imageCache = document.createElement("canvas");
    this.imageCacheCtx = this.imageCache.getContext("2d")!;
    this.editorEl = document.createElement("div");
    this.editorEl.appendChild(this.canvasEl);
    this.editorEl.classList.add("viewer");
    this.editorEl.style.width = `100%`;
    this.editorEl.style.height = `100%`;
    this.editorEl.style.overflow = "scroll";
    this.editorEl.style.display = "flex";
    this.editorEl.style.justifyContent = "flex-start";
    this.editorEl.style.alignItems = "flex-start";
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

    this.drawField = null;
    this.editField = null;
  }

  protected getMarginSize(w: number, h: number) {
    return w > h ? w : h;
  }

  protected async setScroll() {
    const scale = this.getScale();
    const margin = this.getMarginSize(
      this.canvasEl.width,
      this.canvasEl.height
    );
    await this.editorEl.scrollTo(0, 0);
    await this.editorEl.scrollBy({
      top: (margin / 4) * scale,
      left: (margin / 4) * scale,
      behavior: "auto",
    });
  }

  protected async getOffset() {
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
    const ratio = Math.ceil(
      (this.imgEl?.naturalWidth || 0) / this.editorEl?.clientWidth
    );
    this.depth = ratio * 2 * -1;
  }
}
