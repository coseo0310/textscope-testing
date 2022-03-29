<script setup lang="ts">
import { ref, computed } from "vue";
import Pagination from "@/components/shared/Pagination.vue";
import SynonymCard from "@/components/inspection/SynonymCard.vue";
import { useInspectionStore } from "@/store";

const inspectionStore = useInspectionStore();

const current = ref<number>(1);

const onPage = (n: number) => {
  current.value = n;
};

const getItems = computed(() => {
  const items =
    inspectionStore.inspectionItem?.prediction.key_values.length || 0 > 0
      ? inspectionStore.inspectionItem?.prediction.key_values
      : inspectionStore.inspectionItem?.prediction.texts;
  return items;
});
</script>

<template>
  <div class="synonym-form">
    <div class="pagination-wrap">
      <Pagination
        class="inspection"
        :limit="4"
        :total="4"
        :current="current"
        @change="onPage"
      />
    </div>
    <div class="label">인식결과</div>
    <div class="card-list">
      <SynonymCard :idx="1" key="test" :text="``" :confirm="false" />
      <SynonymCard
        v-for="(item, idx) in getItems"
        :idx="idx + 2"
        :key="item.id"
        :text="item.text"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.synonym-form {
  width: 100%;
  height: 100%;
  border: 1px solid $d4;

  .pagination-wrap {
    height: 53px;
  }
  .label {
    display: flex;
    align-items: center;
    width: 100%;
    height: 33px;
    font-size: 14px;
    font-weight: 800;
    color: $d5;
    padding: 0 15px;
    border-top: 1px solid $d4;
    border-bottom: 1px solid $d4;
  }

  .card-list {
    width: 100%;
    height: calc(100% - 86px);
    overflow-y: scroll;
  }
}
</style>
