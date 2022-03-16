import { defineStore } from "pinia";

type States = {
  message: string;
  messageType: "info" | "warn";
  isConfirm: boolean;
  messages: string[];
  confirmType: "info" | "warn";
  confirmFunc: Function;
  cancelFunc: Function;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useCommonStore = defineStore("commonStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      message: "",
      messageType: "info",
      isConfirm: false,
      confirmType: "info",
      messages: [],
      confirmFunc: () => {},
      cancelFunc: () => {},
    };
  },
  actions: {
    setToast(message: string, type: "info" | "warn") {
      this.message = message;
      this.messageType = type;
    },
    setConfirm(
      messages: string[],
      type: "info" | "warn",
      confirmFunc: Function,
      cancelFunc: Function
    ) {
      this.messages = messages;
      this.confirmType = type;
      this.isConfirm = true;
      this.confirmFunc = () => {
        confirmFunc();
        this.isConfirm = false;
      };
      this.cancelFunc = () => {
        cancelFunc();
        this.isConfirm = false;
      };
    },
  },
});
