<script setup lang="ts">
import { ref, watch } from "vue";
import ComboBox, { ComboBoxItem } from "@/components/shared/ComboBox.vue";
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
const onYearSelect = (i: ComboBoxItem) => {
  calendarDate.value = {
    year: Number(i.value),
    month: calendarDate.value.month,
  };
};
const onMonthSelect = (i: ComboBoxItem) => {
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
const yearList: ComboBoxItem[] = [];
for (let i = -1; i < 11; i++) {
  yearList.push({
    id: i + 1,
    text: `${date.value.year + i}`,
    value: `${date.value.year + i}`,
  });
}
const monthList: ComboBoxItem[] = [];
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
          <ComboBox :items="yearList" :default="1" @change="onYearSelect" />
        </div>
        <div class="combobox month">
          <ComboBox
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
        <button class="close" @click.stop="onCancel">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.17499 5.99999L10.7583 2.42499C10.9152 2.26807 11.0034 2.05524 11.0034 1.83333C11.0034 1.61141 10.9152 1.39858 10.7583 1.24166C10.6014 1.08474 10.3886 0.996582 10.1667 0.996582C9.94474 0.996582 9.73191 1.08474 9.57499 1.24166L5.99999 4.82499L2.42499 1.24166C2.26807 1.08474 2.05524 0.996582 1.83333 0.996582C1.61141 0.996582 1.39858 1.08474 1.24166 1.24166C1.08474 1.39858 0.996582 1.61141 0.996582 1.83333C0.996582 2.05524 1.08474 2.26807 1.24166 2.42499L4.82499 5.99999L1.24166 9.57499C1.08474 9.73191 0.996582 9.94474 0.996582 10.1667C0.996582 10.3886 1.08474 10.6014 1.24166 10.7583C1.39858 10.9152 1.61141 11.0034 1.83333 11.0034C2.05524 11.0034 2.26807 10.9152 2.42499 10.7583L5.99999 7.17499L9.57499 10.7583C9.73191 10.9152 9.94474 11.0034 10.1667 11.0034C10.3886 11.0034 10.6014 10.9152 10.7583 10.7583C10.9152 10.6014 11.0034 10.3886 11.0034 10.1667C11.0034 9.94474 10.9152 9.73191 10.7583 9.57499L7.17499 5.99999Z"
              fill="#242424"
            />
          </svg>
          <p>취소</p>
        </button>
      </div>
      <div class="btn-confirm">
        <button class="on" @click.stop="onConfirm">
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.1448 0.244078C13.4703 0.569515 13.4703 1.09715 13.1448 1.42259L5.50596 9.06148C5.34968 9.21776 5.13771 9.30556 4.9167 9.30556C4.69569 9.30556 4.48373 9.21776 4.32745 9.06148L0.855223 5.58926C0.529786 5.26382 0.529786 4.73618 0.855223 4.41075C1.18066 4.08531 1.7083 4.08531 2.03373 4.41075L4.9167 7.29371L11.9663 0.244078C12.2918 -0.0813592 12.8194 -0.0813592 13.1448 0.244078Z"
              fill="white"
            />
          </svg>
          <p>일정 선택</p>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar-wrap {
  border-radius: 4px;
  min-width: 300px;
  min-height: 410px;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0px 10px 18px rgba(9, 30, 66, 0.15),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
  overflow: visible;
  .calrendar-wrap {
    .combobox-wrap {
      height: 40px;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      .combobox {
        margin: 0 5px;
      }
    }
    .calrendar {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 5px;
      .column {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: 200;
        color: #1b1b1b;
        padding: 10px 0;
        background-color: transparent;
        z-index: 1000;
        &.title {
          font-size: 13px;
          font-weight: 600;
        }
        &.selected {
          color: #ffffff;
          font-weight: 600;
          &::before {
            content: "";
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            width: 35px;
            height: 35px;
            background-color: #1b1b1b;
            border-radius: 50%;
            z-index: -1;
          }
        }
        &.days {
          cursor: pointer;
          &:hover {
            color: #ffffff;
            font-weight: 600;
            &::before {
              content: "";
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              width: 35px;
              height: 35px;
              background-color: #7c7c7c;
              border-radius: 50%;
              z-index: -1;
            }
          }
        }
        &.disabled {
          color: #999999;
        }
      }
    }
  }
  .btn-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .close {
      display: flex;
      align-items: center;
      outline: none;
      background-color: transparent;
      border: 1px solid $n-50;
      padding: 10px 14px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;

      p {
        padding-left: 5px;
      }
    }

    .on {
      display: flex;
      align-items: center;
      outline: none;
      background-color: $m-700;
      color: $n-0;
      border: none;
      padding: 10px 14px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;

      p {
        padding-left: 5px;
      }
    }
  }
}
</style>
