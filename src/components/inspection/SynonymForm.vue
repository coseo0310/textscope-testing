<script setup lang="ts">
import { computed, watch } from "vue";
import Pagination from "@/components/shared/Pagination.vue";
import SynonymCard from "@/components/inspection/SynonymCard.vue";
import { useInspectionStore } from "@/store";

const inspectionStore = useInspectionStore();

const onPage = (n: number) => {
  inspectionStore.setInspectionItem(inspectionStore.inspectionItems[n - 1], n);
};

const getCurrent = computed(() => inspectionStore.currentPage);
</script>

<template>
  <div class="synonym-form">
    <div class="pagination-wrap">
      <Pagination
        class="inspection"
        :limit="inspectionStore.total"
        :total="inspectionStore.total"
        :current="getCurrent"
        @change="onPage"
      />
    </div>
    <div class="label">인식결과</div>
    <div class="card-list">
      <!-- <SynonymCard :idx="1" key-text="test" :text="``" :confirm="false" /> -->
      <SynonymCard
        v-for="(item, idx) in inspectionStore.synonymList"
        :idx="idx + 1"
        :key-text="item.id"
        :text="item.text"
        :confirm="!!item.text"
        :key="idx"
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
