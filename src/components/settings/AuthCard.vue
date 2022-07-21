<script setup lang="ts">
import { ref } from "vue";
import Grid from "@/components/shared/Grid.vue";
import Pagination from "@/components/shared/Pagination.vue";
import { useSettingsStore } from "@/store";
import { storeToRefs } from "pinia";

const settingsStore = useSettingsStore();
const { authColumns, authList } = storeToRefs(settingsStore);

const currentPage = ref<number>(1);

const onPage = (n: number) => {
  settingsStore.getLogList(n);
};

const onModify = (id: string) => {
  alert("준비중...");
};
</script>

<template>
  <article :class="container.layout">
    <section :class="top.layout" aria-label="Total">
      <p :class="top.text">총 1,024건</p>
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
              [badge.auth]: item.auth === 'auth',
              [badge.normal]: item.auth === 'normal',
              [badge.nil]: item.auth === 'nil',
            }"
          >
            {{
              item.auth === "auth"
                ? "권한"
                : item.auth === "normal"
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
          <div :class="middle.modify" @click="onModify(item.id)">
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 50px;
}

.text {
  color: $m-400;
  font-size: 14px;
  font-weight: 600;
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
.auth {
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

.normal {
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
