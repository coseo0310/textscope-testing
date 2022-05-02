<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import CheckBox from "@/components/shared/CheckBox.vue";
import Button from "@/components/shared/Button.vue";
import Calendar from "@/components/shared/Calendar.vue";
import { useWorkStore, useCommonStore } from "@/store";
import { Work } from "@/types";

export type FilterLists = Work.FilterLists;
export type FilterKeys = Work.FilterKeys;

const date = new Date();
const year = String(date.getFullYear());
const month = String(date.getMonth() + 1);
const day = String(date.getDate());

const workStore = useWorkStore();
const commonStore = useCommonStore();

const isStartDt = ref<boolean>(false);
const isEndDt = ref<boolean>(false);
const startDt = ref<string>(`${year}-${month.padStart(2, "0")}-${day}`);
const endDt = ref<string>(`${year}-${month.padStart(2, "0")}-${day}`);
const lists = ref<FilterLists>(workStore.filterLists);

const isAllDefault = computed(() => ({
  category:
    lists.value.category.length === 0
      ? false
      : !lists.value.category.find((f) => f.checked === false),
  type:
    lists.value.type.length === 0
      ? false
      : !lists.value.type.find((f) => f.checked === false),
  save:
    lists.value.save.length === 0
      ? false
      : !lists.value.save.find((f) => f.checked === false),
  ocr:
    lists.value.ocr.length === 0
      ? false
      : !lists.value.ocr.find((f) => f.checked === false),
  inspection:
    lists.value.inspection.length === 0
      ? false
      : !lists.value.inspection.find((f) => f.checked === false),
}));
const getStartDt = computed(() => startDt.value.split("-").join("."));
const getEndDt = computed(() => endDt.value.split("-").join("."));

const onCalendar = (t: "start" | "end") => {
  if (t === "start") {
    isStartDt.value = !isStartDt.value;
    isEndDt.value = false;
  } else {
    isEndDt.value = !isEndDt.value;
    isStartDt.value = false;
  }
};

const dateVaildate = (s: string, e: string) => {
  const sDate = new Date(s).getTime();
  const eDate = new Date(e).getTime();

  if (sDate > eDate) {
    commonStore.setToast("선택하신 기간을 다시 확인해주세요.", "warn");

    return true;
  }
  return false;
};

const onDateConfirm = (d: string, t: "start" | "end" | "cancel") => {
  if (t === "start") {
    if (dateVaildate(d, endDt.value)) {
      return;
    }
    startDt.value = d;
    isStartDt.value = false;
  } else if (t === "end") {
    if (dateVaildate(startDt.value, d)) {
      return;
    }
    endDt.value = d;
    isEndDt.value = false;
  } else {
    isStartDt.value = false;
    isEndDt.value = false;
  }
};

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
  workStore.resetFilterLists();
  lists.value = workStore.filterLists;
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
  workStore.getGridList();
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
      <div class="category">
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
      <div class="types">
        <div class="title">문서 유형</div>
        <div class="box">
          <CheckBox
            :default="isAllDefault.type"
            class="checkbox"
            label="전체"
            @change="onAllChecked('type')"
          />
          <CheckBox
            v-for="t in lists.type"
            class="checkbox"
            :label="t.name"
            :default="t.checked"
            @change="(v: boolean) => {onChange(t.name, v, 'type')}"
          />
        </div>
      </div>
      <div class="save">
        <div class="title">저장</div>
        <div class="box">
          <CheckBox
            :default="isAllDefault.save"
            class="checkbox"
            label="전체"
            @change="onAllChecked('save')"
          />
          <CheckBox
            v-for="s in lists.save"
            class="checkbox"
            :label="s.name"
            :default="s.checked"
            @change="(v: boolean) => {onChange(s.name, v, 'save')}"
          />
        </div>
      </div>
      <div class="ocr">
        <div class="title">OCR</div>
        <div class="box">
          <CheckBox
            :default="isAllDefault.ocr"
            class="checkbox"
            label="전체"
            @change="onAllChecked('ocr')"
          />
          <CheckBox
            v-for="o in lists.ocr"
            class="checkbox"
            :label="o.name"
            :default="o.checked"
            @change="(v: boolean) => {onChange(o.name, v, 'ocr')}"
          />
        </div>
      </div>
      <div class="inspection">
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
      <div class="date">
        <div class="title">기간</div>
        <div class="box">
          <div class="start time">
            <div class="text" @click="onCalendar('start')">
              {{ getStartDt }}
            </div>
            <div class="calendar">
              <Calendar
                v-if="isStartDt"
                :date="startDt"
                @confirm="(d) => onDateConfirm(d, 'start')"
                @cancel="(d) => onDateConfirm(d, 'cancel')"
              />
            </div>
          </div>
          <div class="divider">~</div>
          <div class="end time">
            <div class="text" @click="onCalendar('end')">{{ getEndDt }}</div>
            <div class="calendar">
              <Calendar
                v-if="isEndDt"
                :date="endDt"
                @confirm="(d) => onDateConfirm(d, 'end')"
                @cancel="(d) => onDateConfirm(d, 'cancel')"
              />
            </div>
          </div>
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
  min-width: 732px;
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
    .category,
    .types,
    .save,
    .ocr,
    .inspection,
    .date {
      width: 100%;
      display: flex;
      flex-direction: column;

      .box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding: 20px 0 30px 0;

        .checkbox {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 5px 25px 5px 0;
        }
      }
    }

    .category {
      .box {
        display: grid;
        grid-template-columns: 0.5fr 0.7fr 1fr;
      }
    }

    .date {
      .box {
        .time {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 160px;
          height: 34px;
          background-color: $d3;
          border-radius: 20px;
          font-weight: 400;
          color: $d5;
          cursor: pointer;
        }

        .start,
        .end {
          position: relative;
          margin-right: 15px;

          .calendar {
            position: absolute;
            top: -440px;
            left: 0;
            z-index: 2;
          }
        }
        .end {
          margin-left: 15px;
        }
      }
    }
  }

  .btn-wrap {
    width: 100%;
    height: 46px;
  }
}
</style>
