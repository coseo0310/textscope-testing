<script setup lang="ts">
import { ref, onMounted } from "vue";
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button.vue";
import Icons from "@/components/shared/Icons.vue";
import Dropdown, { DropdownItem } from "@/components/shared/Dropdown.vue";
import { useUserStore } from "@/store";

const userStore = useUserStore();

const dropDownList = ref<DropdownItem[]>([]);

const onSelect = (i: DropdownItem) => {
  userStore.team = i.id === "all" ? null : { id: i.id, name: i.value };
};

const onKeyup = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  userStore.userTerm = el.value;
};

const onSearch = () => {
  userStore.onUserSearch();
};

onMounted(() => {
  userStore.onUserSearch();
  dropDownList.value = userStore.teams.map((t) => {
    return { id: t.id, text: t.name, value: t.name };
  });
  dropDownList.value.unshift({ id: "all", text: "전체 부서", value: "all" });
});
</script>

<template>
  <div class="search-bar">
    <div></div>
    <div class="input-wrap">
      <Input
        type="text"
        class="border-color-d4 focus-border-color-d5 placeholder-d4"
        placeholder="이름 또는 이메일로 검색하세요"
        @keyup="onKeyup"
      />
    </div>
    <div>
      <div class="button-wrap">
        <Button class="primary" @click="onSearch">
          <span>
            <Icons icons="search" />
            검색
          </span>
        </Button>
      </div>

      <div class="dropdown-wrap">
        <Dropdown
          class="border-color-d4"
          :list="dropDownList"
          @select="onSelect"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
  height: 46px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: $d2;

  .input-wrap {
    width: 500px;
    height: 46px;
  }
  div {
    display: flex;
    justify-content: space-between;

    align-items: center;

    .button-wrap {
      width: 138px;
      height: 46px;
      margin-left: 20px;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: 800;
        padding-right: 10px;
      }
    }

    .dropdown-wrap {
      width: 200px;
      height: 46px;
    }
  }
}
</style>
