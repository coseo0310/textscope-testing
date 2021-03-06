# API documentation

## π μΈμ€ν΄μ€ μμ± λ° Canvas Element λ°ν

---

```html
<body>
  <div class="editor-wrap"></div>
</body>
```

```ts
import Editor from "./editor.js";

const editorWrap = document.querySelector(".editor-wrap");

const editor: Editor = new Editor();

const canvasElement: HTMLCanvasElement = editor.getCanvas();

editorWrap.appendChild(canvasElement);
```

## π Methods

---

μΈμ€ν΄μ€ μ μ­ λ©μλ

### π¬ getCanvas

---

μμ±λ ELEMENTλ₯Ό λ°νν©λλ€.

```ts
const canvasElement: HTMLCanvasElement = editor.getCanvas();
```

### π¬ setImgUrl

---

λ¬Έμ μ΄λ―Έμ§λ₯Ό μ€μ ν©λλ€.

```ts
const url: string = `https://example.com/img.png`;

editor.setImgUrl(url);
```

### π¬ draw

---

μ€μ λ λ°μ΄ν°λ₯Ό κΈ°μ€μΌλ‘ νλ©΄μ κ·Έλ¦½λλ€.

```ts
editor.draw();
```

### π¬ setCalculatedScale

---

μμ Elementλ₯Ό κΈ°μ€μΌλ‘ μ’μ°ν­ λλ μν λ§μΆ€μ μ€νν©λλ€.

ex) μ΄λ―Έμ§κ° λͺ¨λ λ‘λλ ν μ€νν΄μΌ ν©λλ€.

```ts
type FitType = "width" | "height";
const fit = "width";

editor.setCalculatedScale(fit);
```

### π¬ setFields

---

μ μ²΄ νλ λ°μ΄ν°λ₯Ό μλ ₯ν©λλ€.

```ts
type Field = {
  id: string;
  text: string;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
  type: "confirm" | "miss" | "error" | "new";
};

const Fields: Field[] = [
  {
    id: "id",
    text: "text",
    dx: 0,
    dy: 0,
    dWidth: 1,
    dHeight: 1,
    type: "confirm",
  },
  ...n,
];
editor.setFields(Fields);
editor.draw();
```

### π¬ setField

---

νλμ νλ λ°μ΄ν°λ₯Ό μλ ₯ν©λλ€.

```ts
type Field = {
  id: string;
  text: string;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
  type: "confirm" | "miss" | "error" | "new";
};

const Field: Field = {
  id: "id",
  text: "text",
  dx: 0,
  dy: 0,
  dWidth: 1,
  dHeight: 1,
  type: "confirm",
};
editor.setField(field);
editor.draw();
```

### π¬ modifyField

---

νΉμ  νλ λ°μ΄ν°λ₯Ό μμ ν©λλ€.

```ts
type Field = {
  id: string;
  text: string;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
  type: "confirm" | "miss" | "error" | "new";
};

const Field: Field = {
  id: "id",
  text: "text",
  dx: 0,
  dy: 0,
  dWidth: 1,
  dHeight: 1,
  type: "confirm",
};
editor.modifyField(field);
editor.draw();
```

### π¬ setDraw

---

μλ‘μ΄ νλλ₯Ό λλ‘μ°ν©λλ€.

```ts
editor.setDraw();
```

### π¬ getFields

---

λͺ¨λ  νλμ λ³΄λ₯Ό μ»μ΅λλ€.

```ts
type Field = {
  id: string;
  text: string;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
  type: "confirm" | "miss" | "error" | "new";
};

const fields: Field[] = editor.getFields();
```

### π¬ setEditField

---

μμ ν  νλμ λ³΄λ₯Ό μ€μ  ν©λλ€.

```ts
const id: string = "id";
editor.setEditField(id);
editor.draw();
```

### π¬ getEditField

---

νμ¬ μμ  νλμ λ³΄λ₯Ό μ»μ΅λλ€.

```ts
type Field = {
  id: string;
  text: string;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
  type: "confirm" | "miss" | "error" | "new";
};

const field: Field = editor.getEditField();
```

### π¬ clearEditField

---

μμ ν  νλμ λ³΄λ₯Ό μ€μ μ μ­μ ν©λλ€.

```ts
editor.clearEditField();
```

### π¬ removeField

---

νΉμ  νλ λ°μ΄ν°λ₯Ό μ­μ ν©λλ€.

```ts
const id: string = "id";
editor.removeField(id);
```

### π¬ removeFields

---

μ μ²΄ νλ λ°μ΄ν°λ₯Ό μ­μ ν©λλ€.

```ts
editor.removeFields();
```

### π¬ setZoomInOut

---

Scaleμ μ‘°μ ν©λλ€.

```ts
const depth: number = 110; // λ°±λΆμ¨ default 100
editor.setZoomInOut(depth);
```

### π¬ setRotate

---

μ΄λ―Έμ§λ₯Ό νμ  μ‘°μ ν©λλ€.

```ts
const deg: number = 90;
editor.setRotate(deg);
```

### π¬ getMargin

---

μ΄λ―Έμ§ λ§μ§κ°μ μ»μ΅λλ€.

```ts
const margin = editor.getMargin();
```

### π¬ setIsReadonly

---

μ½κΈ° μ μ©μΌλ‘ λ³κ²½ν©λλ€.

```ts
const isReadonly: boolean = true;
editor.setIsReadonly(isIdx);
editor.draw();
```

### π¬ setIsText

---

Text κ°μ νμν©λλ€.

```ts
const isText: boolean = true;
editor.setIsText(isText);
editor.draw();
```

### π¬ setIsIdx

---

μΈλ±μ€ κ°μ νμν©λλ€.

```ts
const isIdx: boolean = true;
editor.setIsIdx(isIdx);
editor.draw();
```

### π¬ setMaxScale

---

μ΅λ Scale κ°μ μ€μ ν©λλ€.

ex) λ°±λΆμ¨

```ts
const s: number = 200;
editor.setMaxScale(s); // default 150
```

### π¬ setMinScale

---

μ΅μ Scale κ°μ μ€μ ν©λλ€.

ex) λ°±λΆμ¨

```ts
const s: number = -100;
editor.setMinScale(s); // default -50
```

### π¬ setScale

---

νμ¬ Scale κ°μ μ»μ΅λλ€..

```ts
const scale = editor.setScale() * 100;
```

### π¬ downloadImage

---

μ΄λ―Έμ§λ₯Ό λ€μ΄λ‘λν©λλ€.

```ts
editor.downloadImage();
```

### π¬ addEventListener

---

κ° μ΄λ²€νΈ μ½λ°±μ μ€μ ν©λλ€.

```ts
type Event = "imgLoaded" | "draw" | "resize" | "selected";
type DrawCallback = (field?: Field) => void;

const event: Event = "imgLoaded";
const callback: DrawCallback = () => {};

editor.addEventListener(event, callback);
```
