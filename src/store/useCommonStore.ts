import { defineStore } from "pinia";

type States = {
  toast: {
    message: string;
    messageType: "info" | "warn";
  };
  isConfirm: boolean;
  confirm: {
    messages: string[];
    confirmType: "info" | "warn";
    confirmFunc: Function;
    cancelFunc: Function;
    label: string;
  };
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useCommonStore = defineStore("commonStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      toast: {
        message: "",
        messageType: "info",
      },
      isConfirm: false,
      confirm: {
        messages: [],
        confirmType: "info",
        confirmFunc: () => {},
        cancelFunc: () => {},
        label: "",
      },
    };
  },
  actions: {
    setToast(message: string, messageType: "info" | "warn") {
      this.toast = {
        message,
        messageType,
      };
    },
    setConfirm(
      messages: string[],
      confirmType: "info" | "warn",
      confirm: Function,
      cancel: Function,
      label?: string
    ) {
      this.confirm = {
        messages,
        confirmType,
        confirmFunc: () => {
          confirm();
          this.isConfirm = false;
        },
        cancelFunc: () => {
          cancel();
          this.isConfirm = false;
        },
        label: label || "",
      };
      this.isConfirm = true;
    },
  },
});
