<script setup lang="ts">
import { ref, computed } from "vue";
import Pagination from "@/components/shared/Pagination.vue";
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button.vue";
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
      <div v-for="(item, idx) in getItems" class="card-wrap">
        <div class="type">
          <div class="index">{{ idx + 1 }}</div>
          <div class="badge-wrap">
            <span class="badge hangle">가</span>
            <span class="badge number">123</span>
          </div>
          <div class="badge-wrap">
            <span class="badge english">A</span>
            <span class="badge check">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 12.25L10.75 16L17 8.5"
                  stroke="#FAFCFF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
        <div class="form">
          <div class="menu">
            <div class="key">{{ item.id }}</div>
            <div class="btn">
              <Button class="primary semi-bold">유의어</Button>
            </div>
          </div>
          <div class="input">
            <Input :defaultValue="item.text" />
          </div>
        </div>
      </div>
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

    .card-wrap {
      width: 100%;
      min-height: 92px;
      border-bottom: 1px solid $d4;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 5px;
      color: $d5;
      font-weight: 600;

      .type {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        width: 62px;

        .index {
          font-weight: 400;
          font-size: 14px;
        }

        .badge-wrap {
          display: grid;
          justify-content: center;
          align-items: center;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          margin-top: 10px;

          .badge {
            width: 20px;
            height: 16px;
            border-radius: 5px;
            font-size: 10px;
            font-weight: 400;
            color: $d1;
            display: flex;
            justify-content: center;
            align-items: center;

            &.hangle {
              background-color: $point-peacook;
            }
            &.number {
              background-color: $point-yellow;
            }
            &.english {
              background-color: $point-red;
            }
            &.check {
              background-color: $point-purple;
            }
          }
        }
      }

      .form {
        width: 100%;
        height: 100%;

        .menu {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          height: 50%;

          .key {
            padding-top: 5px;
            font-size: 14px;
          }

          .btn {
            width: 97px;
            height: 30px;
            margin-bottom: 10px;
          }
        }

        .input {
          height: 50%;
          color: $d5;

          input {
            font-size: 14px;
            border-radius: 0;
            padding: 10px;
          }
        }
      }
    }
  }
}
</style>
