<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/shared/Button.vue";
import ProfileCard from "@/components/shared/ProfileCard.vue";
import MemberModal from "@/components/settings/MemberModal.vue";
import TeamSelectModal from "@/components/settings/TeamSelectModal.vue";
import { useSettingsStore } from "@/store";
import { path } from "@/router";
import { Routes } from "@/types";
import Membership from "@/assets/img/membership.png";

const img = `url('${Membership}')`;

const settingsStore = useSettingsStore();
const router = useRouter();

const onClick = () => {
  settingsStore.isMemberModal = true;
};

onMounted(() => {
  if (!settingsStore.team) {
    router.push(path.team.path);
  }
});
</script>

<template>
  <div class="users-page">
    <div class="title">
      {{ settingsStore.team?.name }} ({{ settingsStore.users?.length }})
    </div>
    <div class="top-menu">
      <div class="btn-wrap">
        <Button class="primary extra-bold" @click="onClick">구성원 등록</Button>
      </div>
    </div>
    <div
      class="card-wrap"
      :style="{
        alignItems:
          settingsStore.users.filter(
            (f) => f.division === settingsStore.team?.name
          ).length === 0
            ? 'center'
            : 'flex-start',
      }"
    >
      <div
        v-for="t in settingsStore.users.filter(
          (f) => f.division === settingsStore.team?.name
        )"
        class="card"
      >
        <ProfileCard :user="t" :focus="false" />
      </div>

      <div
        v-if="
          settingsStore.users.filter(
            (f) => f.division === settingsStore.team?.name
          ).length === 0
        "
        class="not-found"
      >
        <div class="img"></div>
        <div class="msg">
          <p>등록된 부서가 없습니다.</p>
          <p>'부서 생성' 버튼을 눌러 부서를 추가해주세요.</p>
        </div>
      </div>
    </div>
    <MemberModal v-if="settingsStore.isMemberModal" />
    <TeamSelectModal v-if="settingsStore.isTeamSelectModal" />
  </div>
</template>

<style lang="scss" scoped>
.users-page {
  width: 100%;
  height: 100vh;
  padding: 80px 100px;
  display: flex;
  flex-direction: column;

  .title {
    color: $d5;
    font-size: 24px;
    font-weight: 600;
  }

  .top-menu {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .btn-wrap {
      width: 180px;
      height: 46px;
    }
  }

  .card-wrap {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    padding: 40px 0;

    .card {
      margin: 0 10px 80px 10px;
    }

    .not-found {
      width: 100%;
      height: 75%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .img {
        width: 250px;
        height: 250px;
        background-image: v-bind("img");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        margin-bottom: 20px;
      }

      .msg {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: $d5;
        font-size: 24px;
        font-weight: 600;

        p {
          padding: 10px;
        }
      }
    }
  }
}
</style>
