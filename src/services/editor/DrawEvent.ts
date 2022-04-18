import EditorConfig, { IEditorConfig } from "./EditorConfig";

import { EditorTypes } from "./types";

type RectOption = EditorTypes.RectOption;
type ArcOption = EditorTypes.ArcOption;
type TextOption = EditorTypes.TextOption;
type ScaleOption = EditorTypes.ScaleOption;
type ImgOption = EditorTypes.ImgOption;
type RotateOption = EditorTypes.RotateOption;
type Field = EditorTypes.Field;

export interface IDrawEvent extends IEditorConfig {
  draw: () => Promise<void>;
}

export default class DrawEvent extends EditorConfig implements IDrawEvent {
  constructor() {
    super();
  }

  protected fillRect(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    option: RectOption
  ) {
    ctx.fillStyle = option.color;
    const box = new Path2D();
    box.rect(option.dx, option.dy, option.dWidth, option.dHeight);
    ctx.fill(box);
    return box;
  }

  protected strokeRect(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    option: RectOption
  ) {
    ctx.lineWidth = option.lineWidth ? option.lineWidth : 1;
    ctx.strokeStyle = option.color;
    const box = new Path2D();
    box.rect(option.dx, option.dy, option.dWidth, option.dHeight);
    ctx.stroke(box);
    return box;
  }

  protected fillArc(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    option: ArcOption
  ) {
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

  protected strokeArc(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    option: ArcOption
  ) {
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

  protected fillText(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    option: TextOption
  ) {
    ctx.font = option.font;
    ctx.fillStyle = option.color;
    ctx.fillText(option.text, option.dx, option.dy);
  }

  protected strokeText(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    option: TextOption
  ) {
    ctx.font = option.font;
    ctx.lineWidth = option.lineWidth ? option.lineWidth : 1;
    ctx.strokeStyle = option.color;
    ctx.strokeText(option.text, option.dx, option.dy);
  }

  protected setScale(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    option: ScaleOption
  ) {
    ctx.scale(option.x, option.y);
  }

  protected drawImage(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    option: ImgOption
  ) {
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

  protected drawRotate(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    option: RotateOption
  ) {
    const tx = option.dx + option.dWidth / 2;
    const ty = option.dy + option.dHeight / 2;
    ctx.translate(tx, ty);
    ctx.rotate((option.deg * Math.PI) / 180);
    ctx.translate(-tx, -ty);
  }

  protected drawEditCircles(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
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
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    fields: Field[],
    margin: number = 0
  ) {
    let cnt = 1;
    for (const f of fields) {
      const dx = Math.floor(f.draw ? f.dx : f.dx + margin);
      const dy = Math.floor(f.draw ? f.dy : f.dy + margin);

      const rectOption: RectOption = {
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
      if (this.isText) {
        const textOption: TextOption = {
          text: f.text,
          dx: dx,
          dy: dy - 10,
          font: `38px serif`,
          color: "blue",
        };
        this.fillText(this.ctx, textOption);
      }

      if (this.isIdx) {
        const arcOption: ArcOption = {
          dx: dx - 28,
          dy: dy - 28,
          startArc: 0,
          endArc: 2 * Math.PI,
          color: "blue",
          radius: 26,
        };

        const len = String(cnt).length;
        const sx = 36;
        const sy = 18;

        const indexOption: TextOption = {
          text: `${cnt++}`,
          dx: Math.floor(dx - ((sx * (len - 1)) / 4 + sx)),
          dy: dy - sy,
          font: `28px serif`,
          color: "white",
        };
        this.fillArc(this.ctx, arcOption);
        this.fillText(this.ctx, indexOption);
      }
    }
  }

  protected drawSelectPointer(field: Field, margin: number) {
    field.circle = this.drawEditCircles(this.ctx, field, this.dMargin);

    const dx = Math.floor(field.draw ? field.dx : field.dx + margin);
    const dy = Math.floor(field.draw ? field.dy : field.dy + margin);
    const rectOption: RectOption = {
      dx,
      dy,
      dWidth: Math.floor(field.dWidth),
      dHeight: Math.floor(field.dHeight),
      color: `rgba(255, 160, 140, 0.1)`,
      lineWidth: 5,
    };
    this.fillRect(this.ctx, rectOption);
  }

  protected drawNewRect(field: Field) {
    this.fillRect(this.ctx, {
      dx: 0,
      dy: this.crosshair.dy,
      dWidth: this.crosshair.dWidth,
      dHeight: 1,
      color: this.crosshair.color,
    });
    this.fillRect(this.ctx, {
      dx: this.crosshair.dx,
      dy: 0,
      dWidth: 1,
      dHeight: this.crosshair.dHeight,
      color: this.crosshair.color,
    });
    this.strokeRect(this.ctx, {
      dx: field.dx,
      dy: field.dy,
      dWidth: field.dWidth,
      dHeight: field.dHeight,
      color: field.color,
      lineWidth: field.lineWidth,
    });
  }

  async draw() {
    if (!this.imgEl || !this.imageCache) {
      return;
    }
    if (this.imageCache.width === 0 || this.imageCache.height === 0) {
      return;
    }
    if (!this.ctx) {
      return;
    }

    const scale = this.getScale();
    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);

    const cWidth = this.imgEl.naturalWidth * scale;
    const cHeight = this.imgEl.naturalHeight * scale;
    const margin = this.getMarginSize(cWidth, cHeight);

    this.canvasEl.width = cWidth + margin * scale;
    this.canvasEl.height = cHeight + margin * scale;

    this.drawImage(this.ctx, {
      img: this.imageCache,
      sx: 0,
      sy: 0,
      sWidth: Math.floor(this.imageCache.width),
      sHeight: Math.floor(this.imageCache.height),
      dx: 0,
      dy: 0,
      dWidth: Math.floor(this.imageCache.width),
      dHeight: Math.floor(this.imageCache.height),
    });

    this.setScale(this.ctx, { x: scale, y: scale });

    this.drawFields(this.ctx, this.fields, this.dMargin);

    if (this.editField) {
      this.drawSelectPointer(this.editField, this.dMargin);
    }
    if (this.drawField) {
      this.drawNewRect(this.drawField);
    }
  }
}
