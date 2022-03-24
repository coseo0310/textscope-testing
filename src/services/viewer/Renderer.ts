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

interface IRenderer {}

export default class Renderer implements IRenderer {
  private canvasEl: HTMLCanvasElement;
  private canvasWrap: HTMLDivElement;
  private imgEl: HTMLImageElement | null;
  private depth: number;
  private maxDepth: number;
  private minDepth: number;
  private deg: number;
  private fields: Field[];

  constructor() {
    this.canvasEl = document.createElement("canvas");
    this.canvasWrap = document.createElement("div");
    this.canvasWrap.appendChild(this.canvasEl);
    this.imgEl = null;
    this.maxDepth = 7;
    this.minDepth = -7;
    this.depth = -7;
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
    } else if (command === "in" && this.depth < this.maxDepth) {
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

  setRactangle(ctx: CanvasRenderingContext2D, field: Field) {
    if (field.type === "fill") {
      ctx.fillStyle = field.color;
      ctx.fillRect(field.dx, field.dy, field.dWidth, field.dHeight);
    } else if (field.type === "stroke") {
      ctx.lineWidth = field.lineWidth ? field.lineWidth : 1;
      ctx.strokeStyle = field.color;
      ctx.strokeRect(field.dx, field.dy, field.dWidth, field.dHeight);
    }
  }

  setArc(ctx: CanvasRenderingContext2D, field: Field) {
    if (field.type === "fill") {
      const radius = 30;
      ctx.beginPath();
      ctx.fillStyle = field.color;
      ctx.arc(
        field.dx + radius,
        field.dy - radius - 10,
        radius,
        0,
        2 * Math.PI
      );
      ctx.fill();
    } else if (field.type === "stroke") {
      const radius = 30;
      ctx.beginPath();
      ctx.lineWidth = field.lineWidth ? field.lineWidth : 1;
      ctx.strokeStyle = field.color;
      ctx.arc(
        field.dx + radius,
        field.dy - radius - 10,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
    }
  }

  setText(ctx: CanvasRenderingContext2D, field: Field) {
    ctx.font = "48px serif";
    ctx.fillStyle = `blue`;
    ctx.fillText(`${field.id}: ${field.text}`, field.dx, field.dy - 10);
  }

  draw() {
    if (!this.imgEl) {
      return;
    }
    const scale = this.getScale();
    const ctx = this.canvasEl.getContext("2d")!;
    ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    this.canvasEl.width = this.imgEl.naturalWidth * scale;
    this.canvasEl.height = this.imgEl.naturalHeight * scale;
    this.canvasEl.style.margin = `${this.imgEl.naturalWidth * scale * 0.15}px`;

    ctx.scale(scale, scale);
    ctx.drawImage(
      this.imgEl,
      0,
      0,
      scale > 1 ? this.canvasEl.width : this.imgEl.naturalWidth,
      scale > 1 ? this.canvasEl.height : this.imgEl.naturalHeight,
      0,
      0,
      scale > 1 ? this.canvasEl.width : this.imgEl.naturalWidth,
      scale > 1 ? this.canvasEl.height : this.imgEl.naturalHeight
    );

    for (const f of this.fields) {
      this.setRactangle(ctx, f);
      this.setText(ctx, f);
      // this.setArc(this.ctx, f);
    }
  }
}
