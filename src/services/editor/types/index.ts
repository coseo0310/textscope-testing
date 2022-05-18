export declare module EditorTypes {
  type Field = {
    id: string;
    text: string;
    dx: number;
    dy: number;
    dWidth: number;
    dHeight: number;
    type: "confirm" | "miss" | "error" | "section" | "new";
    lineWidth?: number;
    draw?: boolean;
    circle?: Path2D[];
    box?: Path2D;
  };

  type RectOption = {
    dx: number;
    dy: number;
    dWidth: number;
    dHeight: number;
    color: string;
    lineWidth?: number;
  };

  type ArcOption = {
    dx: number;
    dy: number;
    startArc: number;
    endArc: number;
    color: string;
    radius: number;
    lineWidth?: number;
  };

  type TextOption = {
    text: string;
    dx: number;
    dy: number;
    font: string;
    color: string;
    lineWidth?: number;
  };

  type ImgOption = {
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

  type RotateOption = {
    dx: number;
    dy: number;
    dWidth: number;
    dHeight: number;
    deg: number;
  };

  type ScaleOption = {
    x: number;
    y: number;
  };

  type ZoomCommand = "in" | "out" | "init";

  type DrawType = "new" | "section";

  type DrawCallback = (field?: Field) => void;
}
