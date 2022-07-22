<script setup lang="ts">
import { ref } from "vue";
import Grid from "@/components/shared/Grid.vue";
import Pagination from "@/components/shared/Pagination.vue";
import AuthModal, { Item } from "@/components/settings/AuthModal.vue";
import Toast from "@/components/shared/Toast.vue";
import { useSettingsStore } from "@/store";
import { storeToRefs } from "pinia";

const settingsStore = useSettingsStore();
const { authColumns, authList } = storeToRefs(settingsStore);

const currentPage = ref<number>(1);
const term = ref<string>("");
const modalItem = ref<Item | null>(null);
const isModal = ref<boolean>(false);
const isToast = ref<boolean>(false);

const onPage = (n: number) => {
  settingsStore.getAuthList(n);
};

const onModify = (item: Item) => {
  modalItem.value = item;
  isModal.value = true;
};

const onClose = () => {
  modalItem.value = null;
  isModal.value = false;
};

const onSearch = () => {
  alert(`${term.value} 준비중...`);
};

const onModifyConfirm = () => {
  isModal.value = false;
  isToast.value = true;
  setTimeout(() => {
    isToast.value = false;
  }, 1000);
};

const onToastCallback = () => {};
</script>

<template>
  <article :class="container.layout">
    <section :class="top.layout" aria-label="Total">
      <div :class="top.text">
        검수 1팀
        <p>총 20명</p>
      </div>
      <div :class="top.search">
        <input
          type="text"
          placeholder="이름 또는 이메일로 검색"
          v-model="term"
          @keyup.enter="onSearch"
        />
        <i @click="onSearch">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.5343 12.5336C12.8467 12.2212 13.3533 12.2212 13.6657 12.5336L16.5657 15.4336C16.8781 15.7461 16.8781 16.2526 16.5657 16.565C16.2533 16.8774 15.7467 16.8774 15.4343 16.565L12.5343 13.665C12.2219 13.3526 12.2219 12.8461 12.5343 12.5336Z"
              fill="#1B1B1B"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.33335 4.79922C6.82965 4.79922 4.80001 6.82886 4.80001 9.33255C4.80001 11.8362 6.82965 13.8659 9.33335 13.8659C11.837 13.8659 13.8667 11.8362 13.8667 9.33255C13.8667 6.82886 11.837 4.79922 9.33335 4.79922ZM3.20001 9.33255C3.20001 5.94521 5.946 3.19922 9.33335 3.19922C12.7207 3.19922 15.4667 5.94521 15.4667 9.33255C15.4667 12.7199 12.7207 15.4659 9.33335 15.4659C5.946 15.4659 3.20001 12.7199 3.20001 9.33255Z"
              fill="#1B1B1B"
            />
          </svg>
        </i>
      </div>
    </section>
    <section :class="middle.layout" aria-label="Grid section">
      <Grid :columns="authColumns" :grid-list="authList">
        <template v-slot:name="{ item }">
          <div :class="middle.text">{{ item.name }}</div>
        </template>
        <template v-slot:position="{ item }">
          <div :class="middle.text">{{ item.position }}</div>
        </template>
        <template v-slot:auth="{ item }">
          <div
            :class="{
              [badge.admin]: item.auth === 'admin',
              [badge.user]: item.auth === 'user',
              [badge.nil]: item.auth === 'nil',
            }"
          >
            {{
              item.auth === "admin"
                ? "권한"
                : item.auth === "user"
                ? "일반"
                : "없음"
            }}
          </div>
        </template>
        <template v-slot:email="{ item }">
          <div :class="middle.text">{{ item.email }}</div>
        </template>
        <template v-slot:phone="{ item }">
          <div :class="middle.text">{{ item.phone }}</div>
        </template>
        <template v-slot:modify="{ item }">
          <div :class="middle.modify" @click="onModify(item)">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.9306 5.99913C4.9306 5.40849 5.4094 4.92969 6.00004 4.92969C6.59068 4.92969 7.06949 5.40849 7.06949 5.99913C7.06949 6.58977 6.59068 7.06858 6.00004 7.06858C5.4094 7.06858 4.9306 6.58977 4.9306 5.99913Z"
                fill="#242424"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.52783 5.99913C1.52783 5.40849 2.00664 4.92969 2.59728 4.92969C3.18791 4.92969 3.66672 5.40849 3.66672 5.99913C3.66672 6.58977 3.18791 7.06858 2.59728 7.06858C2.00664 7.06858 1.52783 6.58977 1.52783 5.99913Z"
                fill="#242424"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.33338 5.99913C8.33338 5.40849 8.81219 4.92969 9.40282 4.92969C9.99346 4.92969 10.4723 5.40849 10.4723 5.99913C10.4723 6.58977 9.99346 7.06858 9.40282 7.06858C8.81219 7.06858 8.33338 6.58977 8.33338 5.99913Z"
                fill="#242424"
              />
            </svg>
          </div>
        </template>
      </Grid>
    </section>
    <section :class="bottom.layout" aria-label="Pagination section">
      <Pagination :current="currentPage" @change="onPage" />
    </section>
    <AuthModal
      v-if="isModal"
      :item="modalItem"
      @confirm="onModifyConfirm"
      @cancel="onClose"
    />
    <Toast
      v-if="isToast"
      text="권한이 성공적으로 변경되었습니다."
      types="confirm"
      :callback="onToastCallback"
    />
  </article>
</template>

<style lang="scss" module="container">
.layout {
  width: 100%;
  height: calc(100% - 95px);
  padding: 48px;
  background-color: #ffffff;
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 3px;
}
</style>

<style lang="scss" module="top">
.layout {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 50px;
}

.text {
  display: flex;
  align-items: center;
  color: $m-800;
  font-size: 20px;
  font-weight: 500;

  p {
    color: $m-400;
    font-size: 14px;
    font-weight: 600;
    padding: 0 10px;
  }
}

.search {
  display: flex;
  align-items: center;
  position: relative;

  input {
    width: 240px;
    height: 32px;
    border: 1px solid $n-50;
    border-radius: 4px;
    outline: none;
    padding: 0 15px;

    &::placeholder {
      color: $n-100;
      font-size: 14px;
      font-weight: 400;
    }
  }

  i {
    position: absolute;
    right: 10px;
    top: 5px;
  }
}
</style>

<style lang="scss" module="middle">
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  font-size: 14px;
  font-weight: 400;
  color: $m-800;
}

.modify {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 4px;
  border: 1px solid $n-50;
  cursor: pointer;
}
</style>

<style lang="scss" module="bottom">
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
}
</style>

<style lang="scss" module="badge">
.admin {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 18px;
  border-radius: 3px;
  color: $p-500;
  font-size: 11px;
  font-weight: 600;
  background-color: $p-50;
}

.user {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 18px;
  border-radius: 3px;
  color: $b-500;
  font-size: 11px;
  font-weight: 600;
  background-color: $b-50;
}

.nil {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 18px;
  border-radius: 3px;
  color: $n-500;
  font-size: 11px;
  font-weight: 600;
  background-color: $n-50;
}
</style>
