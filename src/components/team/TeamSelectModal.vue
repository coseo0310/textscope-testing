<script setup lang="ts">
import { ref, computed } from "vue";
import Radio from "@/components/shared/Radio.vue";
import Button from "@/components/shared/Button.vue";
import { useUserStore } from "@/store";

const userStore = useUserStore();

const select = ref<string>("");
const total = computed(() => `${userStore.teams.length * 90}px`);
const radioList = computed(() => {
  const list = userStore.teams.map((t) => {
    t.selected = userStore.user?.division === t.name;
    return t;
  });
  return list;
});
const onSubmit = () => {
  if (!userStore.user || !select.value) {
    return;
  }

  userStore.users = userStore.users.map((user) => {
    if (user.id === userStore.user?.id) {
      user.division = select.value;
    }
    return user;
  });

  userStore.isTeamSelectModal = false;
};

const onSelection = (name: string) => {
  userStore.teams.forEach((t) => {
    t.selected = t.name === name;
  });
  select.value = name;
};

const onCancel = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }

  if (
    el.className !== "team-select-modal" &&
    !el.classList.contains("outline")
  ) {
    return;
  }

  userStore.isTeamSelectModal = false;
};
</script>

<template>
  <div class="team-select-modal" @click="onCancel">
    <div class="modal">
      <div class="title">부서 선택</div>
      <div class="radio-wrap">
        <Radio
          v-for="team in radioList"
          :label="team.name"
          :default="!!team.selected"
          @change="(v) => (v ? onSelection(team.name) : null)"
        />
      </div>
      <div class="btn-group">
        <div class="btn-wrap">
          <Button class="outline" @click="onCancel">취소</Button>
        </div>
        <div class="btn-wrap">
          <Button class="primary extra-bold" @click="onSubmit"> 확인 </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.team-select-modal {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .modal {
    position: relative;
    width: 400px;
    height: v-bind("total");
    background-color: $d1;
    border-radius: 10px;
    box-shadow: $shadow-alpha-1;
    color: $d5;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding: 30px 40px;
    overflow: scroll;

    .title {
      font-size: 18px;
      font-weight: 600;
      padding-bottom: 30px;
    }
    .radio-wrap {
      .radio {
        padding: 10px 0;
      }
    }

    .btn-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-top: 30px;

      .btn-wrap {
        width: 150px;
        height: 46px;
      }
    }
  }
}
</style>
