<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import CheckBox from "@/components/shared/CheckBox.vue";
import Button from "@/components/shared/Button.vue";
import DatePicker from "@/components/shared/DatePicker.vue";
import { useTaskStore, useCommonStore } from "@/store";
import { Task } from "@/types";

export type FilterLists = Task.ManagementFilterLists;
export type FilterKeys = Task.ManagementFilterKeys;

const taskStore = useTaskStore();

const isStartDt = ref<boolean>(false);
const isEndDt = ref<boolean>(false);
const lists = ref<FilterLists>(taskStore.managementFitlerLists);

const isAllDefault = computed(() => ({
  category:
    lists.value.category.length === 0
      ? false
      : !lists.value.category.find((f) => f.checked === false),
  department:
    lists.value.department.length === 0
      ? false
      : !lists.value.department.find((f) => f.checked === false),
  register:
    lists.value.register.length === 0
      ? false
      : !lists.value.register.find((f) => f.checked === false),
  inspector:
    lists.value.inspector.length === 0
      ? false
      : !lists.value.inspector.find((f) => f.checked === false),
  inspection:
    lists.value.inspection.length === 0
      ? false
      : !lists.value.inspection.find((f) => f.checked === false),
  status:
    lists.value.status.length === 0
      ? false
      : !lists.value.status.find((f) => f.checked === false),
}));

const onAllChecked = (key: FilterKeys) => {
  if (!!lists.value[key].find((f) => f.checked === false)) {
    lists.value[key] = lists.value[key].map((c) => {
      c.checked = true;
      return { ...c };
    });
  } else {
    lists.value[key] = lists.value[key].map((c) => {
      c.checked = false;
      return { ...c };
    });
  }
};
const onChange = (name: string, v: boolean, key: FilterKeys) => {
  const list = lists.value[key];
  list.forEach((c) => {
    if (c.name == name) {
      c.checked = v;
    }
  });
};
const onReset = () => {
  taskStore.resetFilterLists();
  lists.value = taskStore.managementFitlerLists;
};
const onClosest = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }
  const closestStart = el.closest(".start");
  const closestEnd = el.closest(".end");
  if (!closestStart) {
    isStartDt.value = false;
  }
  if (!closestEnd) {
    isEndDt.value = false;
  }
};

const onSearch = () => {
  taskStore.getGridList();
};

const onSelected = (date: string) => {
  const sp = date.split("~");

  const startDt = sp[0];
  const endDt = sp[1];
};

onMounted(() => {
  window.addEventListener("click", onClosest);
});

onUnmounted(() => {
  window.removeEventListener("click", onClosest);
});
</script>

<template>
  <div class="filter">
    <div class="filter__header">
      <div class="title">검색 필터 설정</div>
      <div class="reset" @click="onReset">초기화</div>
    </div>
    <div class="filter__main">
      <div class="category wrap-box">
        <div class="title">카테고리</div>
        <div class="box">
          <CheckBox
            :default="isAllDefault.category"
            class="checkbox"
            label="전체"
            @change="onAllChecked('category')"
          />
          <CheckBox
            v-for="c in lists.category"
            class="checkbox"
            :label="c.name"
            :default="c.checked"
            @change="(v: boolean) => {onChange(c.name, v, 'category')}"
          />
        </div>
      </div>
      <div class="department wrap-box">
        <div class="title">부서</div>
        <div class="box">
          <CheckBox
            :default="isAllDefault.department"
            class="checkbox"
            label="전체"
            @change="onAllChecked('department')"
          />
          <CheckBox
            v-for="t in lists.department"
            class="checkbox"
            :label="t.name"
            :default="t.checked"
            @change="(v: boolean) => {onChange(t.name, v, 'department')}"
          />
        </div>
      </div>
      <div class="registor wrap-box">
        <div class="title">등록 담당자</div>
        <div class="box">
          <CheckBox
            :default="isAllDefault.register"
            class="checkbox"
            label="전체"
            @change="onAllChecked('register')"
          />
          <CheckBox
            v-for="s in lists.register"
            class="checkbox"
            :label="s.name"
            :default="s.checked"
            @change="(v: boolean) => {onChange(s.name, v, 'register')}"
          />
        </div>
      </div>
      <div class="inspector wrap-box">
        <div class="title">검수 담당자</div>
        <div class="box">
          <CheckBox
            :default="isAllDefault.inspector"
            class="checkbox"
            label="전체"
            @change="onAllChecked('inspector')"
          />
          <CheckBox
            v-for="s in lists.inspector"
            class="checkbox"
            :label="s.name"
            :default="s.checked"
            @change="(v: boolean) => {onChange(s.name, v, 'inspector')}"
          />
        </div>
      </div>
      <div class="inspection wrap-box">
        <div class="title">검수</div>
        <div class="box">
          <CheckBox
            :default="isAllDefault.inspection"
            class="checkbox"
            label="전체"
            @change="onAllChecked('inspection')"
          />
          <CheckBox
            v-for="i in lists.inspection"
            class="checkbox"
            :label="i.name"
            :default="i.checked"
            @change="(v: boolean) => {onChange(i.name, v, 'inspection')}"
          />
        </div>
      </div>

      <div class="status wrap-box">
        <div class="title">저장</div>
        <div class="box">
          <CheckBox
            :default="isAllDefault.status"
            class="checkbox"
            label="전체"
            @change="onAllChecked('status')"
          />
          <CheckBox
            v-for="i in lists.status"
            class="checkbox"
            :label="i.name"
            :default="i.checked"
            @change="(v: boolean) => {onChange(i.name, v, 'status')}"
          />
        </div>
      </div>
      <div class="date wrap-box">
        <div class="title">기간</div>
        <div class="datepicker-wrap">
          <DatePicker :range="true" @selected="onSelected" />
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <Button class="primary extra-bold" @click="onSearch">검색</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter {
  position: absolute;
  top: 30px;
  left: 30px;
  display: flex;
  flex-direction: column;
  min-width: 1023px;
  min-height: 763px;
  background-color: $d2;
  border-radius: 40px;
  padding: 60px;
  box-shadow: $shadow-alpha-1;
  font-size: 18px;
  font-weight: 700;

  .filter__header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $point-blue;
    margin-bottom: 30px;

    .title {
      font-size: 24px;
    }
    .reset {
      position: absolute;
      top: 6px;
      right: 0;
      font-weight: 600;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .filter__main {
    width: 100%;
    color: $d5;
    .wrap-box {
      width: 100%;
      display: flex;
      flex-direction: column;

      .box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding: 20px 0 20px 0;

        .checkbox {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 5px 25px 5px 0;
        }
      }
    }

    .date {
      .datepicker-wrap {
        padding: 15px 0;
      }
    }
  }

  .btn-wrap {
    width: 100%;
    height: 46px;
  }
}
</style>
