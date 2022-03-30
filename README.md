# Textscope Server Installed (Frontend)

- [API DOCUMENTS](https://www.notion.so/lomin/Textscope-API-Documentation-3c4b9e9068564e648107b307e1f3d68e)

## dependencies

- [vite v2.8.0](https://vitejs.dev/)
- [typescript v4.5.6](https://www.typescriptlang.org/)
- [vue v3.2.25](https://vuejs.org/)
- [vue-router v4.0.13](https://router.vuejs.org/)
- [axios v0.26.0](https://github.com/axios/axios/blob/master/README.md)
- [chart.js v3.7.1](https://www.chartjs.org/docs/latest/)
- [chart.js-plugin-datalabels v2.0.0](https://chartjs-plugin-datalabels.netlify.app/)
- [pinia v2.0.11](https://pinia.vuejs.org/)
- [uuid v8.3.2](https://www.npmjs.com/package/uuid)

## Commands

- Development serveer

```zsh
npm run dev
```

- Project build

```zsh
npm run build
```

- github-pages deploy (template)

```zsh
npm run deploy
```

---

## Hook (Composables)

...

### 🎖 useForm

Input Form Validate

`Example`

```html
<script setup lang="ts">
  import { useForm } from "@/hooks";

  const { handleSubmit, register, getValues, errors, formState } = useForm();

  const callback = () => {
    const { email } = getValues();
  };

  const onEnter = () => {
    handleSubmit(callback);
  };
</script>

<template>
  <div>
    <input
      type="text"
      name="email"
      :ref="
          register({
            required: true,
          })
        "
      @keyup.enter="onEnter"
    />
    <span v-if="errors.email?.type === 'required'">
      아이디를 입력해주세요
    </span>
    <button
      :disabled="!formState.isValid"
      :loader="loader"
      @click="handleSubmit(callback)"
    >
      전송
    </button>
  </div>
</template>

<style lang="scss" scoped>
  /* ... */
</style>
```

🍿 Methods

- register

  `Params`

  ```ts
  {
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: RegExp;
    match?: string;
    notMatch?: string;
  }
  ```

- handleSubmit

  `Params`

  ```ts
  {
    callback: Function;
  }
  ```

- getValues

  `Returns`

  ```ts
  {
    [k in string]: string;
  }
  ```

- errors

  `Returns`

  ```ts
  {
    [k in string]?: {
        type: string;
    };
  }
  ```

- formState

  `Returns` - Boolean

---

## Services

...

### 🏆 Viewer

Canvas Control Service

```ts
import Viewer from "@/services";

const viewer = new Viewer();
```

🍿 Methods

- getViewer

  Viewer DOM 객체를 얻을 수 있습니다.

  `Example`

  ```ts
  const viewer = new Viewer();

  const viewerElement: HTMLDivElement = viewer.getViewer();
  ```

- getImgSize

  실제 이미지 사이즈를 얻을 수 있습니다.

  `Example`

  ```ts
  const viewer = new Viewer();

  const size: { w: number; h: number } = viewer.getImgSize();
  ```

- getMarginSize

  Viewer Margin size를 얻을 수 있습니다.

  `Example`

  ```ts
  const viewer = new Viewer();

  const size: number = viewer.getMarginSize();
  ```

- setCalculatedDepth

  Viewer Scale Depth를 화면 사이즈 비율에 맞추어 계산합니다.

  `Example`

  ```ts
  const viewer = new Viewer();

  viewer.setCalculatedDepth();
  ```

- setImgUrl

  Viewer image를 설정 및 Draw 합니다.

  `Example`

  ```ts
  const viewer = new Viewer();

  viewer.setImgUrl("http://example.png");
  ```

- setZoomInOut

  Viewer scale을 변경합니다.

  `Example`

  ```ts
  const command: ZoomCommand = "in"; // "in" | "out" | "init"

  const viewer = new Viewer();

  viewer.setZoomInOut(command);
  ```

- setRotate

  Viewer transform을 rotate 합니다.

  `Example`

  ```ts
  const viewer = new Viewer();

  viewer.setRotate(1);
  ```

- setField

  Viewer Field 정보를 입력합니다.

  `Example`

  ```ts
  const field: Field = {
    id: "id",
    text: "text",
    dx: 0,
    dy: 0,
    dWidth: 0,
    dHeight: 0,
    type: "stroke", // "fill" | "stroke"
    color: "#ddddd",
    lineWidth: 5, // Optional
  };

  const viewer = new Viewer();

  viewer.setField(field);
  ```

- removeField

  Viewer Field 정보를 삭제 합니다.

  `Example`

  ```ts
  const viewer = new Viewer();

  viewer.removeField("id");
  ```

- removeFields

  Viewer 모든 Field 정보를 삭제 합니다.

  `Example`

  ```ts
  const viewer = new Viewer();

  viewer.removeFields();
  ```

- getScale

  Viewer Scale 정보를 얻습니다.

  `Example`

  ```ts
  const viewer = new Viewer();

  const scale: number = viewer.getScale();
  ```

- draw

  Viewer에 설정된 모든 내용을 Draw 합니다.

  `Example`

  ```ts
  const viewer = new Viewer();

  viewer.draw();
  ```

- fillRect

  Context2D와 Option 정보를 받아서 Context2D에 Fill Rectangle을 Draw 합니다.

  `Example`

  ```ts
  const canvas: HTMLCanvasElement = document.createdElement("canvas");

  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

  const options = {
    dx: 0,
    dy: 0,
    dWidth: 10,
    dHeight: 10,
    color: "#ffffff", // Hex, RGB, RGBA, NAME
    lineWidth: 5, // Optional
  };
  const viewer = new Viewer();

  viewer.fillRect(ctx, options);
  ```

- strokeRect

  Context2D와 Option 정보를 받아서 Context2D에 Stroke Rectangle을 Draw 합니다.

  `Example`

  ```ts
  const canvas: HTMLCanvasElement = document.createdElement("canvas");

  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

  const options = {
    dx: 0,
    dy: 0,
    dWidth: 10,
    dHeight: 10,
    color: "#ffffff", // Hex, RGB, RGBA, NAME
    lineWidth: 5, // Optional
  };
  const viewer = new Viewer();

  viewer.strokeRect(ctx, options);
  ```

- fillArc

  Context2D와 Option 정보를 받아서 Context2D에 Fill Arc를 Draw 합니다.

  `Example`

  ```ts
  const canvas: HTMLCanvasElement = document.createdElement("canvas");

  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

  const options = {
    dx: 0,
    dy: 0,
    startArc: 0,
    endArc: (180 * Math.PI) / 180, // RADIAN
    color: "#DDDDDD", // Hex, RGB, RGBA, NAME
    radius: 50,
    lineWidth: 5, // Optional
  };
  const viewer = new Viewer();

  viewer.fillArc(ctx, options);
  ```

- strokeArc

  Context2D와 Option 정보를 받아서 Context2D에 Stroke Arc를 Draw 합니다.

  `Example`

  ```ts
  const canvas: HTMLCanvasElement = document.createdElement("canvas");

  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

  const options = {
    dx: 0,
    dy: 0,
    startArc: 0,
    endArc: (180 * Math.PI) / 180, // RADIAN
    color: "#DDDDDD", // Hex, RGB, RGBA, NAME
    radius: 50,
    lineWidth: 5, // Optional
  };
  const viewer = new Viewer();

  viewer.strokeArc(ctx, options);
  ```

- fillText

  Context2D와 Option 정보를 받아서 Context2D에 Fill Text를 Draw 합니다.

  `Example`

  ```ts
  const canvas: HTMLCanvasElement = document.createdElement("canvas");

  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

  const options = {
    dx: 0,
    dy: 0,
    font: "sans-serif",
    color: "#DDDDDD", // Hex, RGB, RGBA, NAME
    lineWidth: 5, // Optional
  };
  const viewer = new Viewer();

  viewer.fillText(ctx, options);
  ```

- strokeText

  Context2D와 Option 정보를 받아서 Context2D에 Stroke Text를 Draw 합니다.

  `Example`

  ```ts
  const canvas: HTMLCanvasElement = document.createdElement("canvas");

  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

  const options = {
    dx: 0,
    dy: 0,
    font: "sans-serif",
    color: "#DDDDDD", // Hex, RGB, RGBA, NAME
    lineWidth: 5, // Optional
  };
  const viewer = new Viewer();

  viewer.strokeText(ctx, options);
  ```

- setScale

  Context2D와 Option 정보를 받아서 Context2D에 Scale 설정합니다.

  `Example`

  ```ts
  const canvas: HTMLCanvasElement = document.createdElement("canvas");

  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

  const options = {
    x: 0,
    y: 0,
  };
  const viewer = new Viewer();

  viewer.setScale(ctx, options);
  ```

- drawImage

  Context2D와 Option 정보를 받아서 Context2D에 Image를 Draw합니다.

  `Example`

  ```ts
  const canvas: HTMLCanvasElement = document.createdElement("canvas");

  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

  const options = {
    img: new Image("http://example.png"),
    sx: 0,
    sy: 0,
    sWidth: 10,
    sHeight: 10,
    dx: 0,
    dy: 0,
    dWidth: 10,
    dHeight: 10,
  };
  const viewer = new Viewer();

  viewer.drawImage(ctx, options);
  ```
