<script setup lang="ts">
import { ref } from "vue";
import DatePicker from "@/components/shared/DatePicker.vue";
import { useCommonStore } from "@/store";

const commonStore = useCommonStore();

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

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

const onUpdate = () => {
  commonStore.setLoader(true, "목록 새로고침 중...");
  setTimeout(() => {
    commonStore.setLoader(false, "");
  }, 1000);
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
      <h1 :class="sso.title">SSO 업데이트</h1>
      <button type="button" :class="sso.btn" @click="onUpdate">
        <svg
          width="17"
          height="18"
          viewBox="0 0 17 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.1389 2.61077C16.5992 2.61077 16.9723 2.98386 16.9723 3.4441V7.61077C16.9723 8.07101 16.5992 8.4441 16.1389 8.4441H11.9723C11.512 8.4441 11.1389 8.07101 11.1389 7.61077C11.1389 7.15053 11.512 6.77744 11.9723 6.77744H15.3056V3.4441C15.3056 2.98386 15.6787 2.61077 16.1389 2.61077Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.0013 3.79794C9.12237 3.54369 8.19333 3.51626 7.30089 3.71818C6.40845 3.92011 5.58171 4.34482 4.8978 4.95268C4.2139 5.56054 3.69512 6.33174 3.38988 7.19432C3.23635 7.6282 2.76016 7.85546 2.32629 7.70192C1.89241 7.54839 1.66515 7.0722 1.81869 6.63833C2.21785 5.51034 2.89625 4.50184 3.79058 3.70695C4.68492 2.91205 5.76605 2.35666 6.93308 2.09261C8.10012 1.82855 9.31502 1.86443 10.4644 2.1969C11.6095 2.52812 12.6525 3.14296 13.4967 3.98437L16.7097 7.00348C17.0451 7.31864 17.0615 7.84602 16.7463 8.18142C16.4311 8.51682 15.9038 8.53322 15.5684 8.21806L12.3461 5.19029C12.3398 5.18432 12.3335 5.17826 12.3274 5.1721C11.6805 4.52494 10.8803 4.05218 10.0013 3.79794ZM0.253935 9.8179C0.569094 9.4825 1.09648 9.46609 1.43188 9.78125L4.6541 12.809C4.66044 12.815 4.6667 12.8211 4.67285 12.8272C5.31969 13.4744 6.11993 13.9471 6.9989 14.2014C7.87786 14.4556 8.80691 14.4831 9.69935 14.2811C10.5918 14.0792 11.4185 13.6545 12.1024 13.0466C12.7863 12.4388 13.3051 11.6676 13.6104 10.805C13.7639 10.3711 14.2401 10.1439 14.674 10.2974C15.1078 10.4509 15.3351 10.9271 15.1816 11.361C14.7824 12.489 14.104 13.4975 13.2097 14.2924C12.3153 15.0873 11.2342 15.6427 10.0672 15.9067C8.90012 16.1708 7.68521 16.1349 6.5358 15.8024C5.39069 15.4712 4.34777 14.8564 3.50358 14.0149L0.290582 10.9958C-0.0448174 10.6807 -0.0612251 10.1533 0.253935 9.8179Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.0278931 10.3886C0.0278931 9.92834 0.400989 9.55525 0.861226 9.55525H5.02789C5.48813 9.55525 5.86123 9.92834 5.86123 10.3886C5.86123 10.8488 5.48813 11.2219 5.02789 11.2219H1.69456V14.5552C1.69456 15.0155 1.32146 15.3886 0.861226 15.3886C0.400989 15.3886 0.0278931 15.0155 0.0278931 14.5552V10.3886Z"
            fill="white"
          />
        </svg>
        목록 업데이트
      </button>
    </div>
  </article>
</template>

<style lang="scss" module="container">
.layout {
  width: 252px;
  height: 277px;
  background-color: #ffffff;
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
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
