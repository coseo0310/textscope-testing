<script setup lang="ts">
import Pagination from "@/components/shared/Pagination.vue";
import SynonymCard from "@/components/inspection/SynonymCard.vue";
import { useInspectionStore } from "@/store";
import { useEditScroll } from "@/hooks";

const inspectionStore = useInspectionStore();
const { setEditScroll } = useEditScroll();

const onPage = (n: number) => {
  inspectionStore.setPagination(n);
  setEditScroll("section");
};
</script>

<template>
  <div class="synonym-form">
    <div class="pagination-wrap">
      <div class="label">인식결과</div>
      <Pagination
        :inspection="true"
        :total="inspectionStore.total"
        :current="inspectionStore.currentPage"
        @change="onPage"
      />
    </div>
    <div class="card-list">
      <SynonymCard
        v-for="(item, idx) in inspectionStore.synonymList"
        :idx="idx + 1"
        :id="item.id"
        :key-text="item.id"
        :text="item.text"
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
  border-top: 0;

  .pagination-wrap {
    width: 100%;
    height: 53px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid $d4;

    .label {
      display: flex;
      align-items: center;
      width: 60px;
      height: 33px;
      font-size: 14px;
      font-weight: 800;
      margin-left: 10px;
      color: $d5;
    }
  }

  .card-list {
    width: 100%;
    height: calc(100% - 86px);
    overflow-y: auto;
  }
}
</style>
