import DrawEvent from "./DrawEvent";

type ZoomCommand = "in" | "out" | "init";

type Field = {
  id: string;
  text: string;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
  type: "fill" | "stroke";
  color: string;
  lineWidth?: number;
};

interface IViewer {}

export default class Viewer extends DrawEvent implements IViewer {
  private canvasEl: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private canvasWrap: HTMLDivElement;
  private imgEl: HTMLImageElement | null;
  private depth: number;
  private maxDepth: number;
  private minDepth: number;
  private deg: number;
  private fields: Field[];

  constructor() {
    super();
    this.canvasEl = document.createElement("canvas");
    this.ctx = this.canvasEl.getContext("2d")!;
    this.canvasWrap = document.createElement("div");
    this.canvasWrap.appendChild(this.canvasEl);
    this.imgEl = null;
    this.maxDepth = 7;
    this.minDepth = -7;
    this.depth = 0;
    this.deg = 0;
    this.fields = [];
  }

  getViewer() {
    const scale = this.getScale();
    const viewerEl = document.createElement("div");
    viewerEl.appendChild(this.canvasWrap);
    viewerEl.classList.add("viewer");
    viewerEl.style.width = `100%`;
    viewerEl.style.height = `100%`;
    viewerEl.style.overflow = "scroll";
    viewerEl.style.display = "flex";
    viewerEl.style.justifyContent = "flex-start";
    viewerEl.style.alignItems = "flex-start";
    this.canvasEl.style.margin = `${
      this.imgEl?.naturalWidth || 0 * scale * 0.15
    }px`;
    return viewerEl;
  }

  setImgURL(url: string) {
    const image = new Image();
    image.src = url;
    this.imgEl = image;

    this.imgEl.onload = () => {
      this.draw();
    };
  }

  setZoomInOut(command: ZoomCommand) {
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
      this.depth = 0;
    }
    this.draw();
  }

  setRotate(deg: number) {
    this.deg = deg;
    const rotate = `rotate(${this.deg}deg)`;
    this.canvasEl.style.transform = rotate;
    this.draw();
  }

  setField(field: Field) {
    this.fields.push(field);
  }

  removeField(id: string) {
    this.fields = this.fields.filter((f) => f.id !== id);
  }

  removeFields() {
    this.fields = [];
    this.draw();
  }

  getScale() {
    return Number((this.depth * 0.1 + 1).toFixed(1));
  }

  draw() {
    if (!this.imgEl) {
      return;
    }
    const scale = this.getScale();
    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);

    this.canvasEl.width = this.imgEl.naturalWidth * scale;
    this.canvasEl.height = this.imgEl.naturalHeight * scale;
    this.canvasEl.style.margin =
      this.canvasEl.width > this.canvasEl.height
        ? `${this.canvasEl.width - this.canvasEl.height}px`
        : `${this.canvasEl.height - this.canvasEl.width}px`;

    const width =
      scale > 1 ? this.imgEl.naturalWidth * scale : this.imgEl.naturalWidth;
    const height =
      scale > 1 ? this.imgEl.naturalHeight * scale : this.imgEl.naturalHeight;

    this.setScale(this.ctx, { x: scale, y: scale });

    this.drawImage(this.ctx, {
      img: this.imgEl,
      sx: 0,
      sy: 0,
      sWidth: width,
      sHeight: height,
      dx: 0,
      dy: 0,
      dWidth: width,
      dHeight: height,
    });

    for (const f of this.fields) {
      const rectOption = {
        dx: f.dx,
        dy: f.dy,
        dWidth: f.dWidth,
        dHeight: f.dHeight,
        color: f.color,
        lineWidth: 5,
      };
      const textOption = {
        dx: f.dx,
        dy: f.dy,
        text: `${f.id}: ${f.text}`,
        font: "48px serif",
        color: "blue",
      };

      if (f.type === "fill") {
        this.fillRect(this.ctx, rectOption);
      } else if (f.type === "stroke") {
        this.strokeRect(this.ctx, rectOption);
      }
      this.fillText(this.ctx, textOption);
    }
  }
}
