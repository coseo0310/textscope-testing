<script setup lang="ts">
import { ref } from "vue";
import Grid from "@/components/shared/Grid.vue";
import Pagination from "@/components/shared/Pagination.vue";
import { useSettingsStore } from "@/store";
import { storeToRefs } from "pinia";

const settingsStore = useSettingsStore();
const { logColumns, logList } = storeToRefs(settingsStore);

const currentPage = ref<number>(1);

const onPage = (n: number) => {
  settingsStore.getLogList(n);
};
</script>

<template>
  <article :class="container.layout">
    <section :class="top.layout" aria-label="Total">
      <p :class="top.text">총 1,024건</p>
    </section>
    <section :class="middle.layout" aria-label="Grid section">
      <Grid :columns="logColumns" :grid-list="logList">
        <template v-slot:type="{ item }">
          <div :class="middle.text">{{ item.type }}</div>
        </template>
        <template v-slot:name="{ item }">
          <div
            :class="{
              [badge.auth]: item.name === 'auth',
              [badge.data]: item.name === 'data',
            }"
          >
            {{ item.name === "auth" ? "권한" : "데이터" }}
          </div>
        </template>
        <template v-slot:message="{ item }">
          <div :class="middle.text">{{ item.message }}</div>
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

.data {
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
</style>
