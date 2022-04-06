export type Field = {
  id: string;
  text: string;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
  type: "fill" | "stroke";
  color: string;
  lineWidth?: number;
  draw?: boolean;
  circle?: Path2D[];
  box?: Path2D;
};

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
  img: HTMLImageElement | HTMLCanvasElement;
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
  drawEditCircle: (
    ctx: CanvasRenderingContext2D,
    field: Field,
    margin: number
  ) => void;
  drawFields: (
    ctx: CanvasRenderingContext2D,
    fields: Field[],
    margin: number
  ) => void;
}

export default class DrawEvent implements IDrawEvent {
  constructor() {}

  fillRect(ctx: CanvasRenderingContext2D, option: RectOption) {
    ctx.fillStyle = option.color;
    const box = new Path2D();
    box.rect(option.dx, option.dy, option.dWidth, option.dHeight);
    // ctx.fillRect(option.dx, option.dy, option.dWidth, option.dHeight);
    ctx.fill(box);
    return box;
  }

  strokeRect(ctx: CanvasRenderingContext2D, option: RectOption) {
    ctx.lineWidth = option.lineWidth ? option.lineWidth : 1;
    ctx.strokeStyle = option.color;
    const box = new Path2D();
    box.rect(option.dx, option.dy, option.dWidth, option.dHeight);
    // ctx.strokeRect(option.dx, option.dy, option.dWidth, option.dHeight);
    ctx.stroke(box);
    return box;
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

  drawEditCircle(
    ctx: CanvasRenderingContext2D,
    field: Field,
    margin: number = 0
  ) {
    const dx = Math.floor(field.dx + margin);
    const dy = Math.floor(field.dy + margin);
    const circle1 = new Path2D();
    const circle2 = new Path2D();
    const circle3 = new Path2D();
    const circle4 = new Path2D();
    const circle5 = new Path2D();
    const circle6 = new Path2D();
    const circle7 = new Path2D();
    const circle8 = new Path2D();
    circle1.arc(dx, dy, 10, 0, 2 * Math.PI);
    circle2.arc(dx + Math.floor(field.dWidth) / 2, dy, 10, 0, 2 * Math.PI);
    circle3.arc(dx + Math.floor(field.dWidth), dy, 10, 0, 2 * Math.PI);
    circle4.arc(
      dx + Math.floor(field.dWidth),
      dy + Math.floor(field.dHeight) / 2,
      10,
      0,
      2 * Math.PI
    );
    circle5.arc(
      dx + Math.floor(field.dWidth),
      dy + Math.floor(field.dHeight),
      10,
      0,
      2 * Math.PI
    );
    circle6.arc(
      dx + Math.floor(field.dWidth) / 2,
      dy + Math.floor(field.dHeight),
      10,
      0,
      2 * Math.PI
    );
    circle7.arc(dx, dy + Math.floor(field.dHeight), 10, 0, 2 * Math.PI);
    circle8.arc(dx, dy + Math.floor(field.dHeight) / 2, 10, 0, 2 * Math.PI);

    ctx.fillStyle = "blue";
    ctx.fill(circle1);
    ctx.fill(circle2);
    ctx.fill(circle3);
    ctx.fill(circle4);
    ctx.fill(circle5);
    ctx.fill(circle6);
    ctx.fill(circle7);
    ctx.fill(circle8);

    return [
      circle1,
      circle2,
      circle3,
      circle4,
      circle5,
      circle6,
      circle7,
      circle8,
    ];
  }

  drawFields(
    ctx: CanvasRenderingContext2D,
    fields: Field[],
    margin: number = 0
  ) {
    for (const f of fields) {
      const dx = Math.floor(f.draw ? f.dx : f.dx + margin);
      const dy = Math.floor(f.draw ? f.dy : f.dy + margin);

      const rectOption = {
        dx,
        dy,
        dWidth: Math.floor(f.dWidth),
        dHeight: Math.floor(f.dHeight),
        color: f.color,
        lineWidth: 5,
      };

      if (f.type === "fill") {
        f.box = this.fillRect(ctx, rectOption);
      } else if (f.type === "stroke") {
        f.box = this.strokeRect(ctx, rectOption);
      }
    }
  }
}
