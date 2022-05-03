<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import Calendar from "@/components/shared/Calendar.vue";
import Icons from "@/components/shared/Icons.vue";
import { useCommonStore } from "@/store";

type Position = "bottom-left" | "bottom-right";

interface Props {
  range?: boolean;
  position?: Position;
  default?: string;
}

const props = withDefaults(defineProps<Props>(), {
  range: false,
  position: "bottom-left",
});

const emits = defineEmits<{
  (e: "selected", date: string): void;
}>();

const commonStore = useCommonStore();

const date = new Date();
const year = String(date.getFullYear());
const month = String(date.getMonth() + 1);
const day = String(date.getDate());

const isStartDt = ref<boolean>(true);
const isEndDt = ref<boolean>(false);
const startDt = ref<string>(
  props.default
    ? props.default
    : `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
);
const endDt = ref<string>(
  props.default
    ? props.default
    : `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
);

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
  if (!props.range) {
    startDt.value = d;
    isStartDt.value = false;
    emits("selected", `${startDt.value}`);
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
    } else {
      isStartDt.value = false;
      isEndDt.value = false;
    }

    emits("selected", `${startDt.value}~${endDt.value}`);
  }
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

onMounted(() => {
  window.addEventListener("click", onClosest);
});

onUnmounted(() => {
  window.removeEventListener("click", onClosest);
});
</script>

<template>
  <div class="date-picker">
    <div class="start time">
      <div class="text" @click="onCalendar('start')">
        <Icons icons="calendar" />
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
    <div v-if="props.range" class="end time">
      <div class="text" @click="onCalendar('end')">
        <Icons icons="calendar" />
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

<style lang="scss">
.date-picker {
  display: flex;
  align-items: center;

  .divider {
    margin: 0 10px;
  }

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

    .text {
      display: flex;
      align-items: center;
    }
  }

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
</style>
