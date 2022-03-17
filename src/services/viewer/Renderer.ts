type ZoomCommand = "in" | "out" | "init";

interface IRenderer {}

export default class Renderer implements IRenderer {
  private canvasEl: HTMLCanvasElement;
  private canvasWrap: HTMLDivElement;
  private ctx: CanvasRenderingContext2D;
  private nWidth: number;
  private nHeight: number;
  private sx: number;
  private sy: number;
  private dx: number;
  private dy: number;
  private imgEl: HTMLImageElement | null;
  private depth: number;
  private deg: number;

  constructor() {
    this.canvasEl = document.createElement("canvas");
    this.canvasWrap = document.createElement("div");
    this.canvasWrap.appendChild(this.canvasEl);
    this.ctx = this.canvasEl.getContext("2d")!;
    this.nWidth = 0;
    this.nHeight = 0;
    this.sx = 0;
    this.sy = 0;
    this.dx = 0;
    this.dy = 0;
    this.imgEl = null;
    this.depth = 0;
    this.deg = 0;
  }

  getViewer() {
    const viewerEl = document.createElement("div");
    viewerEl.appendChild(this.canvasWrap);
    viewerEl.classList.add("viewer");
    viewerEl.style.width = `100%`;
    viewerEl.style.height = `100%`;
    viewerEl.style.overflow = "scroll";
    viewerEl.style.display = "flex";
    viewerEl.style.justifyContent = "center";
    viewerEl.style.alignItems = "flex-start";
    this.canvasEl.style.margin = `${this.nWidth * 0.2}px 0`;
    return viewerEl;
  }

  setImgURL(url: string) {
    const image = new Image();
    image.src = url;
    this.imgEl = image;

    this.nWidth = this.imgEl.naturalWidth;
    this.nHeight = this.imgEl.naturalHeight;
  }

  setZoomInOut(command: ZoomCommand) {
    if (command === "out" && this.depth > -11) {
      // OUT
      this.depth -= 1;
    } else if (command === "in" && this.depth < 11) {
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

  draw() {
    if (!this.imgEl) {
      return;
    }
    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    const scale = this.depth * 0.1 + 1;

    // this.canvasEl.width = scale > 1 ? this.nWidth * scale : this.nWidth;
    // this.canvasEl.height = scale > 1 ? this.nHeight * scale : this.nHeight;
    this.canvasEl.width = this.nWidth * scale;
    this.canvasEl.height = this.nHeight * scale;

    this.ctx.scale(scale, scale);

    this.ctx.drawImage(
      this.imgEl,
      this.sx,
      this.sy,
      scale > 1 ? this.canvasEl.width : this.nWidth,
      scale > 1 ? this.canvasEl.height : this.nHeight,
      this.dx,
      this.dy,
      scale > 1 ? this.canvasEl.width : this.nWidth,
      scale > 1 ? this.canvasEl.height : this.nHeight
    );
  }

  rectangle() {}
}
