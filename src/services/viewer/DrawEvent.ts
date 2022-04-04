export type RectOption = {
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
  color: string;
  lineWidth?: number;
};

export type ArcOption = {
  dx: number;
  dy: number;
  startArc: number;
  endArc: number;
  color: string;
  radius: number;
  lineWidth?: number;
};

export type TextOption = {
  text: string;
  dx: number;
  dy: number;
  font: string;
  color: string;
  lineWidth?: number;
};

export type ImgOption = {
  img: HTMLImageElement;
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
};

export type RotateOption = {
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
  deg: number;
};

export type ScaleOption = {
  x: number;
  y: number;
};

export interface IDrawEvent {
  fillRect: (ctx: CanvasRenderingContext2D, option: RectOption) => void;
  strokeRect: (ctx: CanvasRenderingContext2D, option: RectOption) => void;
  fillArc: (ctx: CanvasRenderingContext2D, option: ArcOption) => void;
  strokeArc: (ctx: CanvasRenderingContext2D, option: ArcOption) => void;
  fillText: (ctx: CanvasRenderingContext2D, option: TextOption) => void;
  strokeText: (ctx: CanvasRenderingContext2D, option: TextOption) => void;
  setScale: (ctx: CanvasRenderingContext2D, option: ScaleOption) => void;
  drawImage: (ctx: CanvasRenderingContext2D, option: ImgOption) => void;
  drawRotate: (ctx: CanvasRenderingContext2D, option: RotateOption) => void;
}

export default class DrawEvent implements IDrawEvent {
  constructor() {}

  fillRect(ctx: CanvasRenderingContext2D, option: RectOption) {
    ctx.fillStyle = option.color;
    ctx.fillRect(option.dx, option.dy, option.dWidth, option.dHeight);
  }

  strokeRect(ctx: CanvasRenderingContext2D, option: RectOption) {
    ctx.lineWidth = option.lineWidth ? option.lineWidth : 1;
    ctx.strokeStyle = option.color;
    ctx.strokeRect(option.dx, option.dy, option.dWidth, option.dHeight);
  }

  fillArc(ctx: CanvasRenderingContext2D, option: ArcOption) {
    ctx.beginPath();
    ctx.fillStyle = option.color;
    ctx.arc(
      option.dx,
      option.dy,
      option.radius,
      option.startArc,
      option.endArc
    );
    ctx.fill();
  }

  strokeArc(ctx: CanvasRenderingContext2D, option: ArcOption) {
    ctx.beginPath();
    ctx.lineWidth = option.lineWidth ? option.lineWidth : 1;
    ctx.strokeStyle = option.color;
    ctx.arc(
      option.dx,
      option.dy,
      option.radius,
      option.startArc,
      option.endArc
    );
    ctx.stroke();
  }

  fillText(ctx: CanvasRenderingContext2D, option: TextOption) {
    ctx.font = option.font;
    ctx.fillStyle = option.color;
    ctx.fillText(option.text, option.dx, option.dy);
  }

  strokeText(ctx: CanvasRenderingContext2D, option: TextOption) {
    ctx.font = option.font;
    ctx.lineWidth = option.lineWidth ? option.lineWidth : 1;
    ctx.strokeStyle = option.color;
    ctx.strokeText(option.text, option.dx, option.dy);
  }

  setScale(ctx: CanvasRenderingContext2D, option: ScaleOption) {
    ctx.scale(option.x, option.y);
  }

  drawImage(ctx: CanvasRenderingContext2D, option: ImgOption) {
    ctx.drawImage(
      option.img,
      option.sx,
      option.sy,
      option.sWidth,
      option.sHeight,
      option.dx,
      option.dy,
      option.dWidth,
      option.dHeight
    );
  }

  drawRotate(ctx: CanvasRenderingContext2D, option: RotateOption) {
    const tx = option.dx + option.dWidth / 2;
    const ty = option.dy + option.dHeight / 2;
    ctx.translate(tx, ty);
    ctx.rotate((option.deg * Math.PI) / 180);
    ctx.translate(-tx, -ty);
  }
}
