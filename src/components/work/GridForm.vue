<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Icons from "@/components/shared/Icons.vue";
import Grid, { GridList } from "@/components/shared/Grid.vue";
import Pagination from "@/components/shared/Pagination.vue";
import { useWorkStore } from "@/store";

const workStore = useWorkStore();
const columns = ref(workStore.workColumns);
const selected = ref(workStore.selected);

const onSelected = (list: GridList) => {
  workStore.selected = list
    .filter((item) => !!item.checked)
    .map((item) => ({ id: item.id as string }));
};

onMounted(() => {});
onUnmounted(() => {});
</script>

<template>
  <div class="grid-form">
    <div class="grid-form__grid">
      <Grid
        :columns="columns"
        :grid-list="workStore.workList"
        :selected="selected"
        @selected="onSelected"
      >
        <template v-slot:inspection="{ item }">
          <template v-if="item.inspection !== 'save'">
            {{ item.inspection }}
          </template>
          <template v-else>
            <div class="icon">
              <Icons icons="save" />
            </div>
          </template>
        </template>
      </Grid>
      <div v-if="workStore.workList.length === 0" class="not-found">
        <img src="@/assets/img/magnifier.png" alt="magnifier" />
        <div class="text">검색 필터가 선택되지 않았습니다</div>
      </div>
    </div>
    <div v-if="workStore.workList.length > 0" class="grid-form__pagination">
      <Pagination :current="13" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-form {
  width: 100%;
  height: 100%;
  .grid-form__grid {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      color: $d5;
      cursor: pointer;
    }

    .not-found {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 25vh;
      .text {
        color: $d5;
        font-size: 24px;
        font-weight: 600;
        padding: 30px 0;
      }
    }
  }
  .grid-form__pagination {
    padding-top: 40px;
  }
}
</style>
