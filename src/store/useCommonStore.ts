import { defineStore } from "pinia";

type States = {
  message: string;
  messageType: "info" | "warn";
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
    };
  },
  actions: {
    setMessage(message: string, type: "info" | "warn") {
      this.message = message;
      this.messageType = type;
    },
  },
});
