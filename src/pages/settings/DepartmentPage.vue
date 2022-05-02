<script setup lang="ts">
import Button from "@/components/shared/Button.vue";
import TeamCard from "@/components/settings/TeamCard.vue";
import TeamModal from "@/components/settings/TeamModal.vue";
import Construction from "@/assets/img/construction.png";
import { useSettingsStore } from "@/store";

const img = `url('${Construction}')`;

const settingsStore = useSettingsStore();

const onTeamModal = () => {
  settingsStore.team = null;
  settingsStore.isTeamModal = true;
};
</script>

<template>
  <div class="department-page">
    <div class="title">부서 관리 ({{ settingsStore.teams?.length }})</div>
    <div class="top-menu">
      <div class="btn-wrap">
        <Button class="primary extra-bold" @click="onTeamModal"
          >부서 등록</Button
        >
      </div>
    </div>
    <div class="card-wrap">
      <div v-for="c in settingsStore.teams" class="card">
        <TeamCard :id="c.id" :name="c.name" />
      </div>
      <div v-if="settingsStore.teams?.length === 0" class="not-found">
        <div class="img"></div>
        <div class="msg">
          <p>등록된 부서가 없습니다.</p>
          <p>'부서 생성' 버튼을 눌러 부서를 추가해주세요.</p>
        </div>
      </div>
    </div>
    <TeamModal v-if="settingsStore.isTeamModal" />
  </div>
</template>

<style lang="scss" scoped>
.department-page {
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
    flex-wrap: wrap;
    height: 100%;
    padding: 20px 0;

    .card {
      margin: 0 20px 20px 0;
    }

    .not-found {
      width: 100%;
      height: 100%;
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
        margin-bottom: 10px;
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
