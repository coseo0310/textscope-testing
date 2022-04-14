import { defineStore } from "pinia";
import { HTTP, Grid } from "@/types";

interface Team {
  id: string;
  name: string;
  selected?: boolean;
}

type States = {
  user: HTTP.User | null;
  users: HTTP.User[];
  team: Team | null;
  teams: Team[];
  userTerm: string;
  userColumns: Grid.Columns;
  userList: Grid.GridList;
  isTeamModal: boolean;
  isMemberModal: boolean;
  isTeamSelectModal: boolean;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useUserStore = defineStore("userStore", {
  // arrow function recommended for full type inference
  state: (): States => {
    return {
      // all these properties will have their type inferred automatically
      users: getUsers(),
      teams: [
        { id: "0", name: "검수 1팀" },
        { id: "1", name: "검수 2팀" },
        { id: "2", name: "검수 3팀" },
        { id: "3", name: "검수 4팀" },
      ],
      user: null,
      team: null,
      userTerm: "",
      userList: [],
      userColumns: getUserColumns(),
      isTeamModal: false,
      isMemberModal: false,
      isTeamSelectModal: false,
    };
  },
  actions: {
    async onUserSearch(n: number = 1) {
      try {
        this.userList = getUserList(n);
      } catch (error) {
        console.error(error);
      }
    },
  },
});

function getUserColumns(): Grid.Columns {
  return [
    {
      width: 100,
      text: "No.",
      align: "center",
      sortable: false,
      value: "no",
    },
    {
      width: 100,
      text: "이미지",
      align: "center",
      sortable: false,
      value: "image",
    },
    {
      width: 210,
      text: "이름",
      align: "center",
      sortable: false,
      value: "name",
    },
    {
      width: 210,
      text: "부서",
      align: "center",
      sortable: false,
      value: "team",
    },
    {
      width: 210,
      text: "직위",
      align: "center",
      sortable: false,
      value: "position",
    },
    {
      text: "이메일",
      align: "center",
      sortable: false,
      value: "email",
    },
    {
      text: "휴대폰",
      align: "center",
      sortable: false,
      value: "cellphone",
    },
    {
      text: "내선번호",
      align: "center",
      sortable: false,
      value: "phone",
    },
    {
      text: "등록일",
      align: "center",
      sortable: false,
      value: "date",
    },
  ];
}

function getUserList(c: number = 1): Grid.GridList {
  let tmp = [];

  let cnt = 0;

  const users = getUsers();
  //TODO: Get Grid list
  for (const u of users) {
    const obj = {
      no: `${users.length - cnt}`,
      image: u.profile_img,
      name: u.name,
      team: u.division,
      position: u.job_position,
      email: u.id,
      cellphone: u.extension_number,
      phone: u.phone_number,
      date: `2022.03.${String(cnt + 2).padStart(2, "0")}`,
    };
    tmp.push(obj);
    cnt++;
    if (cnt === 9) {
      break;
    }
  }
  return tmp;
}

function getUsers(): HTTP.User[] {
  return [
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
      division: `검수 2팀`,
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
      profile_img: ``,
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
      division: `검수 2팀`,
      job_position: `사원`,
      phone_number: `000-0000-000`,
      authority: `super`,
      extension_number: `000`,
      profile_img: `https://images.unsplash.com/photo-1618835962148-cf177563c6c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGh1bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
    },
    {
      id: "ch@test.ai",
      name: `성춘향`,
      division: `검수 2팀`,
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
      division: `검수 3팀`,
      job_position: `사원`,
      phone_number: `000-0000-000`,
      authority: `super`,
      extension_number: `000`,
      profile_img: `https://images.unsplash.com/photo-1485043433441-db091a258e5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`,
    },
    {
      id: "hl@test.ai",
      name: `혜리`,
      division: `검수 3팀`,
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
  ];
}
