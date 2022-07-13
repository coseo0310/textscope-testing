<script setup lang="ts">
import CheckBox from "@/components/shared/CheckBox.vue";
import { useWorkStore } from "@/store";
import { storeToRefs } from "pinia";

const workStore = useWorkStore();
const { filter } = storeToRefs(workStore);
</script>

<template>
  <article :class="modal.layout">
    <section :class="header.layout" aria-label="상단 타이틀 헤더">
      <h1>필터</h1>
      <button type="button">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.1111 2.88892C14.4793 2.88892 14.7778 3.18739 14.7778 3.55558V6.88892C14.7778 7.25711 14.4793 7.55558 14.1111 7.55558H10.7778C10.4096 7.55558 10.1111 7.25711 10.1111 6.88892C10.1111 6.52073 10.4096 6.22225 10.7778 6.22225H13.4444V3.55558C13.4444 3.18739 13.7429 2.88892 14.1111 2.88892Z"
            fill="#0052CC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.6108 3.71051C7.68056 3.57857 6.73264 3.75253 5.90988 4.2062C5.08711 4.65986 4.43409 5.36864 4.0492 6.22574C3.66431 7.08283 3.56841 8.0418 3.77596 8.95814C3.9835 9.87448 4.48325 10.6985 5.19989 11.3061C5.91652 11.9137 6.81123 12.272 7.74917 12.3268C8.68711 12.3817 9.61748 12.1303 10.4001 11.6104C11.1827 11.0905 11.7751 10.3303 12.0881 9.44441C12.2107 9.09725 12.5916 8.91524 12.9387 9.03789C13.2859 9.16054 13.4679 9.5414 13.3453 9.88856C12.936 11.047 12.1613 12.0411 11.1379 12.721C10.1145 13.4008 8.89784 13.7297 7.6713 13.6579C6.44476 13.5861 5.27476 13.1177 4.33762 12.3231C3.40048 11.5286 2.74697 10.451 2.47556 9.25267C2.20416 8.05438 2.32956 6.80035 2.83288 5.67953C3.33619 4.55872 4.19015 3.63185 5.26607 3.0386C6.342 2.44534 7.58159 2.21785 8.79805 2.39039C10.0111 2.56245 11.1356 3.12299 12.0031 3.98786L14.5682 6.40336C14.8362 6.65578 14.8489 7.0777 14.5965 7.34575C14.344 7.6138 13.9221 7.62647 13.6541 7.37405L11.0819 4.95183C11.0769 4.94721 11.0721 4.94251 11.0673 4.93774C10.4032 4.27317 9.54104 3.84246 8.6108 3.71051Z"
            fill="#0052CC"
          />
        </svg>
        전체 설정 초기화
      </button>
    </section>
    <section :class="box.layout" aria-label="조회 기간">
      <h1 :class="box.title">조회 기간</h1>
      <div :class="box.all_check">
        <div :class="box.check"><CheckBox class="color-blue" /></div>
        <p>모든 상태</p>
      </div>
      <div :class="box.divider"></div>
      <div :class="box.group_check">
        <div :class="box.box_check">
          <div :class="box.check"><CheckBox class="color-blue" /></div>
          <p :class="status.analysis">분석대기</p>
        </div>
        <div :class="box.box_check">
          <div :class="box.check"><CheckBox class="color-blue" /></div>
          <p :class="status.wait">검수대기</p>
        </div>
        <div :class="box.box_check">
          <div :class="box.check"><CheckBox class="color-blue" /></div>
          <p :class="status.progress">검수중</p>
        </div>
        <div :class="box.box_check">
          <div :class="box.check"><CheckBox class="color-blue" /></div>
          <p :class="status.complete">검수완료</p>
        </div>
      </div>
    </section>
  </article>
</template>

<style lang="scss" module="modal">
.layout {
  position: absolute;
  right: 0;
  top: 0;
  width: 480px;
  height: 100vh;
  background-color: $n-0;
  overflow-y: scroll;
  padding: 0 32px;
}
</style>

<style lang="scss" module="box">
.layout {
  width: 100%;
  padding: 32px;
  background-color: $n-10;
  border-radius: 4px;
  border: 1px solid $n-30;
}

.title {
  color: $m-900;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
}

.check {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  margin-right: 10px;
}

.all_check {
  display: flex;
  align-items: center;
  margin-top: 20px;

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: $m-700;
  }
}

.box_check {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}

.group_check {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.divider {
  width: 352px;
  height: 1px;
  background-color: $n-30;
  margin: 12px 0;
}
</style>

<style lang="scss" module="header">
.layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 29px;

  h1 {
    color: $m-900;
    font-size: 29px;
    font-weight: 700;
    line-height: 32px;
  }

  button {
    display: flex;
    align-items: center;
    outline: none;
    border: 0px;
    border-bottom: 1px solid $b-400;
    background: transparent;
    font-size: 14px;
    font-weight: 400;
    height: 20px;
    color: $b-400;
    padding: 0 2px;
    cursor: pointer;

    svg {
      margin-right: 5px;
    }
  }
}
</style>

<style lang="scss" module="status">
.analysis {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  border-radius: 3px;
  color: $m-500;
  background-color: $n-40;
}

.wait {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  border-radius: 3px;
  color: $b-500;
  background-color: $b-50;
}

.progress {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  border-radius: 3px;
  color: $p-500;
  background-color: $p-50;
}

.complete {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  border-radius: 3px;
  color: $g-500;
  background-color: $g-50;
}
</style>
