<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import Calendar from "@/components/shared/Calendar.vue";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const FULL_DAYS = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

interface Props {
  range?: boolean;
  defaultStart?: string;
  defaultEnd?: string;
  width?: string;
  fullDays?: boolean;
  startLimit?: string;
  endLimit?: string;
}

const props = withDefaults(defineProps<Props>(), {
  range: false,
  width: `124px`,
  fullDays: false,
});

const emits = defineEmits<{
  (e: "selected", date: string): void;
}>();
const date = new Date();
const year = String(date.getFullYear());
const month = String(date.getMonth() + 1);
const day = String(date.getDate());
const isStartDt = ref<boolean>(false);
const isEndDt = ref<boolean>(false);
const startDt = ref<string>(
  props.defaultStart
    ? props.defaultStart
    : `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
);

const endDt = ref<string>(
  props.defaultEnd
    ? props.defaultEnd
    : `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
);

watch(props, () => {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  if (!props.defaultStart) {
    startDt.value = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  if (!props.defaultEnd) {
    endDt.value = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
});

const getStartDt = computed(() => {
  const date = new Date(startDt.value);
  const sp = startDt.value.split("-");
  const year = sp[0];
  const month = sp[1];
  const day = sp[2];

  return `${year}.${month.padStart(2, "0")}.${day.padStart(2, "0")}. ${
    props.fullDays ? FULL_DAYS[date.getDay()] : DAYS[date.getDay()]
  }`;
});
const getEndDt = computed(() => {
  const date = new Date(endDt.value);
  const sp = startDt.value.split("-");
  const year = sp[0];
  const month = sp[1];
  const day = sp[2];

  return `${year}.${month.padStart(2, "0")}.${day.padStart(2, "0")}.  ${
    props.fullDays ? FULL_DAYS[date.getDay()] : DAYS[date.getDay()]
  }`;
});
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
    alert("선택하신 기간을 다시 확인해주세요.");
    return true;
  }
  return false;
};
const onDateConfirm = (d: string, t: "start" | "end" | "cancel") => {
  if (t === "cancel") {
    isStartDt.value = false;
    isEndDt.value = false;
    return;
  }
  if (!props.range) {
    if (
      (props.startLimit && dateVaildate(props.startLimit, d)) ||
      (props.endLimit && dateVaildate(d, props.endLimit))
    ) {
      return;
    }
    startDt.value = d;
    isStartDt.value = false;
    const sp = startDt.value.split("-");
    const year = sp[0];
    const month = sp[1];
    const day = sp[2];

    emits(
      "selected",
      `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    );
  } else {
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
    }

    const sp1 = startDt.value.split("-");
    const year1 = sp1[0];
    const month1 = sp1[1];
    const day1 = sp1[2];

    const sp2 = endDt.value.split("-");
    const year2 = sp2[0];
    const month2 = sp2[1];
    const day2 = sp2[2];
    emits(
      "selected",
      `${year1}-${month1.padStart(2, "0")}-${day1.padStart(
        2,
        "0"
      )}~${year2}-${month2.padStart(2, "0")}-${day2.padStart(2, "0")}`
    );
  }
};
const onClosest = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }
  const closestStart = el.closest(".start");
  const closestEnd = el.closest(".end");
  const combobox = el.closest(".list");
  if (combobox) {
    return;
  }
  if (!closestStart) {
    isStartDt.value = false;
  }
  if (!closestEnd) {
    isEndDt.value = false;
  }
};
onMounted(() => {
  window.addEventListener("click", onClosest);
});
onUnmounted(() => {
  window.removeEventListener("click", onClosest);
});
</script>

<template>
  <div class="date-picker">
    <div class="start time" :class="{ focus: isStartDt }">
      <div class="text" @click="onCalendar('start')">
        <span>{{ getStartDt }}</span>
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
    <div v-if="props.range" class="divider">~</div>
    <div v-if="props.range" class="end time" :class="{ focus: isEndDt }">
      <div class="text" @click="onCalendar('end')">
        <span>{{ getEndDt }}</span>
      </div>
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
</template>

<style lang="scss" scoped>
.date-picker {
  width: 100%;
  display: flex;
  align-items: center;

  .divider {
    margin: 0 10px;
  }

  .time {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 32px;
    background-color: #ffffff;
    border: 1px solid #dfe1e6;
    border-radius: 4px;
    width: v-bind("props.width");

    color: #1b1b1b;
    cursor: pointer;

    &.focus {
      background-color: #f4f5f7;
    }

    .text {
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: 14px;
      padding: 10px;
    }
  }
  .start,
  .end {
    position: relative;
    .calendar {
      position: absolute;
      top: 40px;
      left: -100px;
      z-index: 2;
    }
  }

  &.bottom-left {
    .start,
    .end {
      position: relative;
      .calendar {
        position: absolute;
        top: 40px;
        left: 0;
        z-index: 2;
      }
    }
  }
  &.bottom-right {
    .start,
    .end {
      position: relative;
      .calendar {
        position: absolute;
        top: 40px;
        left: -180px;
        z-index: 2;
      }
    }
  }
  &.top-left {
    .start,
    .end {
      position: relative;
      .calendar {
        position: absolute;
        top: -440px;
        left: 0;
        z-index: 2;
      }
    }
  }
  &.top-right {
    .start,
    .end {
      position: relative;
      .calendar {
        position: absolute;
        top: -440px;
        left: -180px;
        z-index: 2;
      }
    }
  }

  &.filter {
    .start {
      position: relative;
      .calendar {
        position: absolute;
        top: 40px;
        left: -10px;
        z-index: 2;
      }
    }
    .end {
      position: relative;
      .calendar {
        position: absolute;
        top: 40px;
        left: -164px;
        z-index: 2;
      }
    }
  }
}
</style>
