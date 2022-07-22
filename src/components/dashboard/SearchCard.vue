<script setup lang="ts">
import { ref } from "vue";
import DatePicker from "@/components/shared/DatePicker.vue";
import ChartModal from "@/components/dashboard/ChartModal.vue";
import { useCommonStore } from "@/store";

const commonStore = useCommonStore();

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const isModal = ref<boolean>(false);
const startDt = ref<string>(
  `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`
);
const endDt = ref<string>(
  `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`
);

const onStartDate = (d: string) => {
  startDt.value = d;
};
const onEndDate = (d: string) => {
  endDt.value = d;
};

const onDownload = () => {
  isModal.value = true;
};
</script>

<template>
  <article :class="container.layout">
    <div :class="search.layout">
      <h1 :class="search.title">조회기간 설정</h1>
      <div :class="search.box">
        <div :class="search.date">
          <DatePicker
            width="154px"
            :full-days="true"
            :default-start="startDt"
            :end-limit="endDt"
            @selected="onStartDate"
          />
          <p>부터</p>
        </div>
      </div>
      <div :class="search.box">
        <div :class="search.date">
          <DatePicker
            width="154px"
            :full-days="true"
            :default-start="endDt"
            :start-limit="startDt"
            @selected="onEndDate"
          />
          <p>까지</p>
        </div>
      </div>
    </div>
    <div :class="container.divider"></div>
    <div :class="sso.layout">
      <h1 :class="sso.title">데이터 내보내기</h1>
      <button type="button" :class="sso.btn" @click="onDownload">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.75002 10.2501C3.21026 10.2501 3.58335 10.6232 3.58335 11.0834V13.8612C3.58335 14.0085 3.64189 14.1498 3.74607 14.254C3.85026 14.3582 3.99157 14.4167 4.13891 14.4167H13.8611C14.0085 14.4167 14.1498 14.3582 14.254 14.254C14.3582 14.1498 14.4167 14.0085 14.4167 13.8612V11.0834C14.4167 10.6232 14.7898 10.2501 15.25 10.2501C15.7103 10.2501 16.0834 10.6232 16.0834 11.0834V13.8612C16.0834 14.4506 15.8492 15.0158 15.4325 15.4325C15.0157 15.8493 14.4505 16.0834 13.8611 16.0834H4.13891C3.54954 16.0834 2.98431 15.8493 2.56756 15.4325C2.15081 15.0158 1.91669 14.4506 1.91669 13.8612V11.0834C1.91669 10.6232 2.28978 10.2501 2.75002 10.2501Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.00002 1.91675C9.46026 1.91675 9.83335 2.28984 9.83335 2.75008V11.0834C9.83335 11.5437 9.46026 11.9167 9.00002 11.9167C8.53978 11.9167 8.16669 11.5437 8.16669 11.0834V2.75008C8.16669 2.28984 8.53978 1.91675 9.00002 1.91675Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.93853 7.02195C5.26396 6.69651 5.7916 6.69651 6.11704 7.02195L9 9.90491L11.883 7.02195C12.2084 6.69651 12.736 6.69651 13.0615 7.02195C13.3869 7.34738 13.3869 7.87502 13.0615 8.20046L9.58926 11.6727C9.26382 11.9981 8.73619 11.9981 8.41075 11.6727L4.93853 8.20046C4.61309 7.87502 4.61309 7.34738 4.93853 7.02195Z"
            fill="white"
          />
        </svg>
        차트 내보내기(.xlsx)
      </button>
    </div>
    <ChartModal v-if="isModal" :close-callback="() => (isModal = !isModal)" />
  </article>
</template>

<style lang="scss" module="container">
.layout {
  position: relative;
  width: 252px;
  height: 277px;
  background-color: #ffffff;
  box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 3px;
  margin-left: 12px;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: $n-30;
}
</style>

<style lang="scss" module="search">
.layout {
  display: flex;
  flex-direction: column;
  padding: 26px;
}

.box {
  display: flex;
  align-items: center;
  height: 32px;
  margin: 5px 0;
}

.title {
  color: $n-200;
  font-size: 12px;
  font-weight: 600;
  padding-bottom: 16px;
}

.date {
  display: flex;
  align-items: center;

  p {
    width: 40px;
    font-size: 14px;
    font-weight: 400;
    color: $n-600;
  }
}
</style>

<style lang="scss" module="sso">
.layout {
  display: flex;
  flex-direction: column;
  padding: 26px;
}

.title {
  color: $n-200;
  font-size: 12px;
  font-weight: 600;
  padding-bottom: 16px;
}

.btn {
  width: 196px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $m-800;
  color: #ffffff;
  outline: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;

  svg {
    margin-right: 10px;
  }
}
</style>
