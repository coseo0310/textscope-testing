import { defineStore } from "pinia";
import { getCookie, setCookie, eraseCookie } from "@/utils";
import { postAuthToken, deleteAuthToken } from "@/api/http/auth";
import { TOKEN } from "@/constants";
import { User } from "@/api/http/type";

type States = {
  accessToken: string;
  user: User | null;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useAuthStore = defineStore("authStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      accessToken: getCookie(TOKEN) || "",
      user: null,
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
        const id = `${Date.now()}`;
        this.user = {
          id,
          name: `영희`,
          division: `검수 1팀`,
          job_position: `부장`,
          phone_number: `000-0000-000`,
          authority: `super`,
          extension_number: `000`,
          profile_img: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80`,
          team: [
            {
              id,
              name: `영희`,
              division: `검수 1팀`,
              job_position: `부장`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80`,
            },
            {
              id: `${Date.now() + 2}`,
              name: `장화`,
              division: `검수 1팀`,
              job_position: `차장`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8d29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: `${Date.now() + 3}`,
              name: `홍련`,
              division: `검수 1팀`,
              job_position: `대리`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGh1bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: `${Date.now() + 4}`,
              name: `이몽룡`,
              division: `검수 1팀`,
              job_position: `대리`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1501869150797-9bbb64f782fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGh1bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: `${Date.now() + 4}`,
              name: `심청`,
              division: `검수 1팀`,
              job_position: `사원`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1618835962148-cf177563c6c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGh1bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
          ],
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
