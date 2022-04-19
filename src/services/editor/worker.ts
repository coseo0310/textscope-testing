import Editor from "@/services/editor";

const worker = self;

worker.onmessage = (e) => {
  console.log("window", worker);
  console.log(">>", self.document);
  switch (e.data.type) {
    case "init":
      init(e.data.canvas);
      break;

    default:
      break;
  }
};

function init(canvas: any) {
  console.log("type", canvas);
}
