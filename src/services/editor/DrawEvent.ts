import { EditorTypes } from "./types";

type RectOption = EditorTypes.RectOption;
type ArcOption = EditorTypes.ArcOption;
type TextOption = EditorTypes.TextOption;
type ScaleOption = EditorTypes.ScaleOption;
type ImgOption = EditorTypes.ImgOption;
type RotateOption = EditorTypes.RotateOption;
type Field = EditorTypes.Field;

export interface IDrawEvent {}

export default class DrawEvent implements IDrawEvent {
  constructor() {}

  protected fillRect(ctx: CanvasRenderingContext2D, option: RectOption) {
    ctx.fillStyle = option.color;
    const box = new Path2D();
    box.rect(option.dx, option.dy, option.dWidth, option.dHeight);
    // ctx.fillRect(option.dx, option.dy, option.dWidth, option.dHeight);
    ctx.fill(box);
    return box;
  }

  protected strokeRect(ctx: CanvasRenderingContext2D, option: RectOption) {
    ctx.lineWidth = option.lineWidth ? option.lineWidth : 1;
    ctx.strokeStyle = option.color;
    const box = new Path2D();
    box.rect(option.dx, option.dy, option.dWidth, option.dHeight);
    // ctx.strokeRect(option.dx, option.dy, option.dWidth, option.dHeight);
    ctx.stroke(box);
    return box;
  }

  protected fillArc(ctx: CanvasRenderingContext2D, option: ArcOption) {
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

  protected strokeArc(ctx: CanvasRenderingContext2D, option: ArcOption) {
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

  protected fillText(ctx: CanvasRenderingContext2D, option: TextOption) {
    ctx.font = option.font;
    ctx.fillStyle = option.color;
    ctx.fillText(option.text, option.dx, option.dy);
  }

  protected strokeText(ctx: CanvasRenderingContext2D, option: TextOption) {
    ctx.font = option.font;
    ctx.lineWidth = option.lineWidth ? option.lineWidth : 1;
    ctx.strokeStyle = option.color;
    ctx.strokeText(option.text, option.dx, option.dy);
  }

  protected setScale(ctx: CanvasRenderingContext2D, option: ScaleOption) {
    ctx.scale(option.x, option.y);
  }

  protected drawImage(ctx: CanvasRenderingContext2D, option: ImgOption) {
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

  protected drawRotate(ctx: CanvasRenderingContext2D, option: RotateOption) {
    const tx = option.dx + option.dWidth / 2;
    const ty = option.dy + option.dHeight / 2;
    ctx.translate(tx, ty);
    ctx.rotate((option.deg * Math.PI) / 180);
    ctx.translate(-tx, -ty);
  }

  protected drawEditCircles(
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

  protected drawFields(
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
