import { useInspectionStore } from "@/store";
import { storeToRefs } from "pinia";

export default function useEditScroll() {
  const inspectionStore = useInspectionStore();
  const { currentEditor, editorForm } = storeToRefs(inspectionStore);

  const setEditScroll = (type: "field" | "section", id?: string) => {
    if (!currentEditor.value) {
      return;
    }

    if (!editorForm.value) {
      return;
    }

    let field;

    switch (type) {
      case "field":
        if (!id) {
          field = null;
          break;
        }
        currentEditor.value.setEditField(id);
        field = currentEditor.value.getEditField();
        break;
      case "section":
        field = currentEditor.value.getSectionField();
        break;
      default:
        field = null;
        break;
    }

    if (!field) {
      return;
    }

    const c = currentEditor.value.getCanvas();

    if (!c) {
      return;
    }

    c.scrollIntoView();

    const margin = currentEditor.value.getMargin() || 0;
    const scale = currentEditor.value.getScale() || 1;

    const eWidth = editorForm.value.clientWidth || 0;
    const eHeight = editorForm.value.clientHeight || 0;

    const x = (field.dx + margin) * scale;
    const y = (field.dy + margin) * scale;
    const w = field.dWidth * scale;
    const h = field.dHeight * scale;
    const scrollTop = editorForm.value.scrollTop || 0;

    const left = x - eWidth / 2 + w / 2;
    const top = y + scrollTop - eHeight / 2 + h / 2;

    editorForm.value.scrollTo({
      left,
      top,
    });
  };

  return { setEditScroll };
}
