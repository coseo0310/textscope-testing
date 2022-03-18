import { defineStore } from "pinia";
import { getCookie, setCookie, eraseCookie } from "@/utils";
import { postAuthToken, deleteAuthToken } from "@/api/http/auth";
import { TOKEN } from "@/constants";
import { HTTP } from "@/types";

type States = {
  accessToken: string;
  user: HTTP.User | null;
  isPasswordModal: boolean;
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
      isPasswordModal: false,
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
          id: "yh@test.ai",
          name: `영희`,
          division: `검수 1팀`,
          job_position: `부장`,
          phone_number: `000-0000-000`,
          authority: `super`,
          extension_number: `000`,
          profile_img: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80`,
          team: [
            {
              id: "yh@test.ai",
              name: `영희`,
              division: `검수 1팀`,
              job_position: `부장`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80`,
            },
            {
              id: "jh@test.ai",
              name: `장화`,
              division: `검수 1팀`,
              job_position: `차장`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8d29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: "lynn@test.ai",
              name: `린`,
              division: `검수 1팀`,
              job_position: `과장`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1614786269829-d24616faf56d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: "hr@test.ai",
              name: `홍련`,
              division: `검수 1팀`,
              job_position: `대리`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGh1bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: "mr@test.ai",
              name: `이몽룡`,
              division: `검수 1팀`,
              job_position: `대리`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1501869150797-9bbb64f782fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGh1bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: "em@test.ai",
              name: `에밀리아`,
              division: `검수 1팀`,
              job_position: `대리`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1508474722893-c3ccb8918d39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: "sc@test.ai",
              name: `심청`,
              division: `검수 1팀`,
              job_position: `사원`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1618835962148-cf177563c6c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGh1bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: "ch@test.ai",
              name: `성춘향`,
              division: `검수 1팀`,
              job_position: `사원`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: "grace@test.ai",
              name: `그레이스`,
              division: `검수 1팀`,
              job_position: `사원`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: "inn@test.ai",
              name: `이난나`,
              division: `검수 1팀`,
              job_position: `사원`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1597586124394-fbd6ef244026?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: "yyy@test.ai",
              name: `에일리`,
              division: `검수 1팀`,
              job_position: `사원`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1485043433441-db091a258e5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: "hl@test.ai",
              name: `혜리`,
              division: `검수 1팀`,
              job_position: `사원`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: "dwn@test.ai",
              name: `다우니`,
              division: `검수 1팀`,
              job_position: `사원`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: "hna@test.ai",
              name: `혜나`,
              division: `검수 1팀`,
              job_position: `사원`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: "ali@test.ai",
              name: `Ali`,
              division: `검수 1팀`,
              job_position: `사원`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: "gloria@test.ai",
              name: `Gloria`,
              division: `검수 1팀`,
              job_position: `사원`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
            },
            {
              id: "yna@test.ai",
              name: `유나`,
              division: `검수 1팀`,
              job_position: `사원`,
              phone_number: `000-0000-000`,
              authority: `super`,
              extension_number: `000`,
              profile_img: `https://images.unsplash.com/photo-1557080326-2da057667a82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODJ8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
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

    async onChangePassword(nowPassword: string, confirmPassword: string) {
      try {
        //TODO: PASSWORD CHANGE
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});
