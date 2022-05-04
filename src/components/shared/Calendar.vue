<script setup lang="ts">
import { ref, watch } from "vue";
import Button from "@/components/shared/Button.vue";
import Combobox, { ComboboxItem } from "@/components/shared/Combobox.vue";

interface Props {
  date: string;
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "change", date: string): void;
  (e: "confirm", date: string): void;
  (e: "cancel", date: string): void;
}>();

const prev = ref<number>(0);
const now = ref<number>(0);

const pDate = props.date.split("-");

const date = ref({
  year: Number(pDate[0]),
  month: Number(pDate[1]) - 1,
  day: Number(pDate[2]),
});

const calendarDate = ref({
  year: Number(pDate[0]),
  month: Number(pDate[1]) - 1,
});

const calculateDays = (y: number, m: number) => {
  const LIMIT = 42;
  const d = new Date(y, m, 1);
  const year = d.getFullYear();
  const month = d.getMonth();
  const week = d.getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const prevLastDay = new Date(year, month, 0).getDate();

  const tmp: number[] = [];

  prev.value = week - 1;
  now.value = week + lastDay;

  for (let i = 0; i < LIMIT; i++) {
    if (i < week) {
      tmp.push(prevLastDay - (week - i - 1));
    } else if (i - week + 1 > lastDay) {
      tmp.push(i - lastDay - week + 1);
    } else {
      tmp.push(i - week + 1);
    }
  }

  return tmp;
};

const days = ref<number[]>(
  calculateDays(calendarDate.value.year, calendarDate.value.month)
);

const onYearSelect = (i: ComboboxItem) => {
  calendarDate.value = {
    year: Number(i.value),
    month: calendarDate.value.month,
  };
};

const onMonthSelect = (i: ComboboxItem) => {
  calendarDate.value = {
    year: calendarDate.value.year,
    month: Number(i.value),
  };
};

const onCalendarSelect = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  const v = el.dataset.date;
  if (!v) {
    return;
  }
  const vDate = v.split("-");
  date.value = {
    year: Number(vDate[0]),
    month: Number(vDate[1]) - 1,
    day: Number(vDate[2]),
  };
  days.value = calculateDays(date.value.year, date.value.month);
  emits("change", v);
};

const onConfirm = () => {
  emits(
    "confirm",
    `${date.value.year}-${date.value.month + 1}-${date.value.day}`
  );
};
const onCancel = () => {
  emits(
    "cancel",
    `${date.value.year}-${date.value.month + 1}-${date.value.day}`
  );
};

watch(props, () => {
  const pDate = props.date.split("-");
  date.value = {
    year: Number(pDate[0]),
    month: Number(pDate[1]) - 1,
    day: Number(pDate[2]),
  };
  days.value = calculateDays(date.value.year, date.value.month);
});

watch(calendarDate, () => {
  days.value = calculateDays(calendarDate.value.year, calendarDate.value.month);
});

const yearList: ComboboxItem[] = [];
for (let i = -1; i < 11; i++) {
  yearList.push({
    id: i + 1,
    text: `${date.value.year + i}`,
    value: `${date.value.year + i}`,
  });
}

const monthList: ComboboxItem[] = [];
for (let i = 0; i < 12; i++) {
  monthList.push({
    id: i,
    text: `${i + 1}월`,
    value: `${i}`,
  });
}
</script>

<template>
  <div class="calendar-wrap">
    <div class="calrendar-wrap">
      <div class="combobox-wrap">
        <div class="combobox year">
          <Combobox :items="yearList" :default="1" @change="onYearSelect" />
        </div>
        <div class="combobox month">
          <Combobox
            :items="monthList"
            :default="date.month"
            @change="onMonthSelect"
          />
        </div>
      </div>
      <div class="calrendar" @click="onCalendarSelect">
        <div class="column title sun">일</div>
        <div class="column title mon">월</div>
        <div class="column title tue">화</div>
        <div class="column title wed">수</div>
        <div class="column title thu">목</div>
        <div class="column title fri">금</div>
        <div class="column title sat">토</div>
        <div
          v-for="(n, idx) in days"
          :class="{
            column: true,
            days: idx > prev && idx < now,
            selected:
              idx >= prev &&
              idx <= now &&
              n === date.day &&
              date.month === calendarDate.month,
            disabled: idx <= prev || idx >= now,
          }"
          :data-date="
            idx > prev && idx < now
              ? `${calendarDate.year}-${calendarDate.month + 1}-${n}`
              : ``
          "
        >
          {{ n }}
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <div class="btn-cancel">
        <Button class="primary cancel semi-bold" @click.stop="onCancel"
          >취소</Button
        >
      </div>
      <div class="btn-confirm">
        <Button class="primary semi-bold" @click.stop="onConfirm"
          >일정 선택</Button
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar-wrap {
  min-width: 344px;
  min-height: 432px;
  width: 100%;
  height: 100%;
  background-color: $d1;
  padding: 32px;
  box-shadow: 1px 1px 8px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;

  .calrendar-wrap {
    .combobox-wrap {
      height: 40px;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      .combobox {
        height: 40px;
        margin: 0 5px;
      }
    }
    .calrendar {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 10px;

      .column {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        font-weight: 200;
        color: $d5;
        padding: 7px 5px;
        background-color: transparent;
        z-index: 1000;

        &.title {
          font-size: 13px;
          font-weight: 600;
        }

        &.selected {
          color: $d1;
          font-weight: 600;

          &::before {
            content: "";
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            width: 35px;
            height: 35px;
            background-color: $point-blue;
            border-radius: 50%;
            z-index: -1;
          }
        }

        &.days {
          cursor: pointer;

          &:hover {
            color: $point-blue;
            font-weight: 600;

            &::before {
              content: "";
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              width: 35px;
              height: 35px;
              background-color: $d4;
              border-radius: 50%;
              z-index: -1;
            }
          }
        }
        &.disabled {
          color: $d3;
        }
      }
    }
  }

  .btn-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn-cancel,
    .btn-confirm {
      width: 136px;
      height: 40px;
    }
  }
}
</style>
