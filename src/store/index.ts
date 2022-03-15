import { defineStore } from "pinia";
import { getCookie, setCookie, eraseCookie } from "@/utils";
import { postAuthToken, deleteAuthToken } from "@/api/http/auth";
import { TOKEN } from "@/constants";
import { User } from "@/api/http/type";

type States = {
  accessToken: string;
  user: User | null;
  message: string;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore("main", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      accessToken: getCookie(TOKEN) || "",
      user: null,
      message: "",
    };
  },
  actions: {
    async onSingleSignOne() {
      try {
        // TODO : SSO
        const tokenData = await postAuthToken("test", "test");
        this.accessToken = tokenData.token.token;
        setCookie(TOKEN, tokenData.token.token, 30);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async onLogin(email: string, password: string) {
      try {
        const tokenData = await postAuthToken(email, password);
        this.accessToken = tokenData.token.token;
        setCookie(TOKEN, tokenData.token.token, 30);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async getUser(token: string) {
      try {
        // TODO: GET USER
        // const userData = await getAuthToken(token);
        // this.user = userData.user;
        this.user = {
          id: `${Date.now()}`,
          name: `super`,
          division: `검수1팀`,
          job_position: `부장`,
          phone_number: `000-0000-000`,
          authority: `super`,
          extension_number: `000`,
        };
        return true;
      } catch (error) {
        console.error(error);
        this.accessToken = "";
        this.user = null;
        eraseCookie(TOKEN);
        return false;
      }
    },
    async onLogout() {
      try {
        await deleteAuthToken(this.accessToken);
      } catch (error) {
        console.error(error);
      } finally {
        this.accessToken = "";
        this.user = null;
        eraseCookie(TOKEN);
      }
    },
  },
});
