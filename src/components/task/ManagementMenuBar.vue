<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Button from "@/components/shared/Button.vue";
import Input from "@/components/shared/Input.vue";
import Icons from "@/components/shared/Icons.vue";
import ManagementFilter from "@/components/task/ManagementFilter.vue";
import { useTaskStore, useCommonStore } from "@/store";

const taskStore = useTaskStore();
const commonStore = useCommonStore();

const isFilter = ref<boolean>(false);

const onFilter = () => {
  isFilter.value = !isFilter.value;
};

const onDelete = () => {
  if (taskStore.selected.length > 0) {
    commonStore.setConfirm(
      ["삭제된 데이터는 복구할 수 없습니다.", "정말 삭제하시겠습니까?"],
      "warn",
      () => {
        // TODO: COnfirm Func
      },
      () => {
        // TODO: Cancel Func
      }
    );
  } else {
    commonStore.setToast("삭제 할 수 없습니다.", "warn");
  }
};

const onKeyup = (e: KeyboardEvent) => {
  const el = e.target as HTMLInputElement;
  if (!el) {
    return;
  }

  taskStore.searchTerm = el.value;
};

const onSearch = () => {
  taskStore.getGridList();
};

const onDownload = () => {
  alert("준비중");
};

const onClosest = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }

  const closest = el.closest(".filter-wrap");
  if (closest) {
    return;
  }
  isFilter.value = false;
};

onMounted(() => {
  window.addEventListener("click", onClosest);
});

onUnmounted(() => {
  window.removeEventListener("click", onClosest);
});
</script>

<template>
  <div class="management-menu-bar">
    <div class="title-wrap">
      <div class="title">업무 관리 ({{ `302,234` }})</div>
      <div class="filter-wrap">
        <div role="button" class="filter-btn" @click="onFilter">
          검색 필터 선택
        </div>
        <ManagementFilter v-show="isFilter" />
      </div>
    </div>
    <div class="search-bar">
      <div class="search-wrap">
        <div class="search-input">
          <Input @keyup="onKeyup" />
        </div>
        <div class="search-btn">
          <Button class="primary extra-bold" @click="onSearch">
            <Icons icons="search" />
            <div>검색</div>
          </Button>
        </div>
      </div>

      <div class="func-wrap">
        <div class="btn-wrap">
          <Button class="outline extra-bold color-red" @click="onDelete">
            삭제
          </Button>
        </div>
        <div class="btn-wrap" @click="onDownload">
          <Button class="outline extra-bold">엑셀 다운로드</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.management-menu-bar {
  width: 100%;

  .title-wrap {
    display: flex;
    align-items: flex-end;

    .title {
      color: $d5;
      font-size: 24px;
      font-weight: 600;
      padding-right: 40px;
    }

    .filter-wrap {
      position: relative;
      z-index: 2;

      .filter-btn {
        color: $point-blue;
        font-size: 18px;
        font-weight: 600;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  .search-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .search-wrap {
      display: flex;
      align-items: center;
      padding: 20px 0;

      .search-input {
        width: 513px;
        height: 46px;
        margin-right: 20px;
      }

      .search-btn {
        width: 138px;
        height: 46px;
        display: flex;
        justify-content: center;
        align-items: center;

        button {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 4px;

          div {
            padding-right: 10px;
          }
        }
      }
    }

    .func-wrap {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn-wrap {
        width: 180px;
        height: 46px;
        margin-left: 30px;
      }
    }
  }
}
</style>
