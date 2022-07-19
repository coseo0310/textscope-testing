<script setup lang="ts">
import { useWorkStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { path } from "@/router";

const router = useRouter();
const workStore = useWorkStore();
const {isInspector} = storeToRefs(workStore);

const onWork = () => {
  router.push({ name: path.work.name });
};

const onPrev = () => {
  alert("준비중...");
};

const onNext = () => {
  alert("준비중...");
};

const onInspector = () => {
  isInspector.value = !isInspector.value;
}
</script>

<template>
  <article :class="container.layout">
    <section :class="nav.layout" aria-label="nav">
      <i @click="onPrev">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 16C0 7.16344 7.16344 0 16 0V0C24.8366 0 32 7.16344 32 16V16C32 24.8366 24.8366 32 16 32V32C7.16344 32 0 24.8366 0 16V16Z"
            fill="white"
            fill-opacity="0.01"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.2071 10.2929C19.5976 10.6834 19.5976 11.3166 19.2071 11.7071L14.9142 16L19.2071 20.2929C19.5976 20.6834 19.5976 21.3166 19.2071 21.7071C18.8166 22.0976 18.1834 22.0976 17.7929 21.7071L12.7929 16.7071C12.4024 16.3166 12.4024 15.6834 12.7929 15.2929L17.7929 10.2929C18.1834 9.90237 18.8166 9.90237 19.2071 10.2929Z"
            fill="#1B1B1B"
          />
        </svg>
      </i>
      <i @click="onNext">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
            fill="white"
            fill-opacity="0.01"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.7929 10.2929C13.1834 9.90237 13.8166 9.90237 14.2071 10.2929L19.2071 15.2929C19.5976 15.6834 19.5976 16.3166 19.2071 16.7071L14.2071 21.7071C13.8166 22.0976 13.1834 22.0976 12.7929 21.7071C12.4024 21.3166 12.4024 20.6834 12.7929 20.2929L17.0858 16L12.7929 11.7071C12.4024 11.3166 12.4024 10.6834 12.7929 10.2929Z"
            fill="#1B1B1B"
          />
        </svg>
      </i>
      <i @click="onWork">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
            fill="white"
            fill-opacity="0.01"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.3861 6.87764C15.7472 6.59678 16.2528 6.59678 16.6139 6.87764L24.1139 12.711C24.3575 12.9004 24.5 13.1917 24.5 13.5003V22.667C24.5 23.3742 24.219 24.0525 23.719 24.5526C23.2189 25.0527 22.5406 25.3337 21.8333 25.3337H10.1667C9.45942 25.3337 8.78115 25.0527 8.28105 24.5526C7.78095 24.0525 7.5 23.3742 7.5 22.667V13.5003C7.5 13.1917 7.64247 12.9004 7.88606 12.711L15.3861 6.87764ZM9.5 13.9894V22.667C9.5 22.8438 9.57024 23.0134 9.69526 23.1384C9.82029 23.2634 9.98986 23.3337 10.1667 23.3337H21.8333C22.0101 23.3337 22.1797 23.2634 22.3047 23.1384C22.4298 23.0134 22.5 22.8438 22.5 22.667V13.9894L16 8.93385L9.5 13.9894Z"
            fill="#1B1B1B"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.5 16C12.5 15.4477 12.9477 15 13.5 15H18.5C19.0523 15 19.5 15.4477 19.5 16V24.3333C19.5 24.8856 19.0523 25.3333 18.5 25.3333C17.9477 25.3333 17.5 24.8856 17.5 24.3333V17H14.5V24.3333C14.5 24.8856 14.0523 25.3333 13.5 25.3333C12.9477 25.3333 12.5 24.8856 12.5 24.3333V16Z"
            fill="#1B1B1B"
          />
        </svg>
      </i>
    </section>
    <section :class="title.layout" aria-label="title">
      <div class="divider"></div>
      <div :class="title.wrap">
        <div :class="title.info">
          <p :class="title.text">해외투자 신고서_고객사명_20220222.pdf 
           <!-- <div v-if="item.status === 'analysis'" :class="status.analysis">
            분석대기
          </div> -->
          <div :class="status.wait">검수대기</div>
          <!-- <div v-if="item.status === 'progress'" :class="status.progress">
            검수중
          </div>
          <div v-if="item.status === 'complete'" :class="status.complete">
            검수완료
          </div> -->
          </p>
          <p :class="title.name">
            012345678 <span :class="title.divider">|</span>우영우 검수1팀
          </p>
        </div>
        <button :class="title.btn" @click="onInspector">
          <svg v-if="!isInspector" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.30564 4.58366C6.69763 4.58366 4.58341 6.69787 4.58341 9.30588C4.58341 11.9139 6.69763 14.0281 9.30564 14.0281C11.9136 14.0281 14.0279 11.9139 14.0279 9.30588C14.0279 6.69787 11.9136 4.58366 9.30564 4.58366ZM2.91675 9.30588C2.91675 5.7774 5.77715 2.91699 9.30564 2.91699C12.8341 2.91699 15.6945 5.7774 15.6945 9.30588C15.6945 12.8344 12.8341 15.6948 9.30564 15.6948C5.77715 15.6948 2.91675 12.8344 2.91675 9.30588Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.64 12.6402C12.9654 12.3148 13.4931 12.3148 13.8185 12.6402L16.8393 15.6611C17.1648 15.9865 17.1648 16.5141 16.8393 16.8396C16.5139 17.165 15.9863 17.165 15.6608 16.8396L12.64 13.8187C12.3146 13.4933 12.3146 12.9657 12.64 12.6402Z" fill="white"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4872 4.41447C11.2835 3.87812 9.93862 3.74525 8.6532 4.03567C7.36779 4.32609 6.21069 5.02425 5.35448 6.02602C4.49827 7.02778 3.98882 8.27948 3.90211 9.59444C3.81541 10.9094 4.15608 12.2172 4.87334 13.3227C5.5906 14.4282 6.64601 15.2722 7.88215 15.7289C9.1183 16.1856 10.469 16.2305 11.7327 15.8569C12.9964 15.4832 14.1055 14.7111 14.8946 13.6556C15.6836 12.6001 16.1103 11.3178 16.1111 10V9.36162C16.1111 8.90138 16.4842 8.52828 16.9444 8.52828C17.4047 8.52828 17.7778 8.90138 17.7778 9.36162V10.0005C17.7768 11.6777 17.2337 13.3102 16.2295 14.6535C15.2252 15.9969 13.8136 16.9796 12.2053 17.4551C10.5969 17.9307 8.87785 17.8736 7.30457 17.2923C5.73128 16.7111 4.38804 15.6368 3.47517 14.2298C2.56229 12.8228 2.1287 11.1584 2.23906 9.48478C2.34941 7.8112 2.9978 6.21812 4.08753 4.94315C5.17725 3.66817 6.64992 2.77961 8.2859 2.40998C9.92188 2.04035 11.6335 2.20946 13.1655 2.89209C13.5859 3.07941 13.7749 3.57205 13.5876 3.99245C13.4002 4.41284 12.9076 4.60179 12.4872 4.41447Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5334 3.85541C17.859 4.18068 17.8592 4.70832 17.534 5.03392L10.5895 11.9853C10.4333 12.1417 10.2213 12.2296 10.0002 12.2297C9.77908 12.2297 9.56704 12.1419 9.4107 11.9856L7.32737 9.90227C7.00193 9.57683 7.00193 9.04919 7.32737 8.72376C7.65281 8.39832 8.18044 8.39832 8.50588 8.72376L9.99966 10.2175L16.3549 3.856C16.6801 3.5304 17.2078 3.53013 17.5334 3.85541Z" fill="white"/>
            </svg>
          <p>{{isInspector ? '검수완료': '검수시작'}}</p>
        </button>
      </div>
      <div class="divider"></div>
    </section>
    <section :class="info.layout" aria-label="info">
      <div :class="info.inspector">
        <p :class="info.text">검수인/검수일</p>
        <p :class="info.date">-</p> 
      </div>
      <div class="divider"></div>
      <div :class="info.accuracy">
        <p :class="info.text">인식 정확도</p>
        <p :class="info.progress">
          <div :class="accuracy.progress">
            <div
              :class="{
                [accuracy.progress_percent]: true,
                // [accuracy.progress_perfect]: item.accuracy >= 100,
                // [accuracy.progress_below]: item.accuracy < 100,
              }"
              :style="{ width: `50%` }"
            ></div>
          </div>
        </p>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.divider {
  width: 1px;
  height: 40px;
  background-color: $n-30;
}
</style>

<style lang="scss" module="container">
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $n-50;
}
</style>

<style lang="scss" module="nav">
.layout {
  width: 136px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

i {
  cursor: pointer;
}
</style>

<style lang="scss" module="title">
.layout {
  width: calc(100% - 468px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.text {
  color: $m-900;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;

  div {
    margin: 0 10px;
  }
}

.name {
  margin-top: 5px;
  font-size: 12px;
  font-weight: 500;
  color: $m-400;
}

.divider {
  color: $n-40;
}

.btn {
  outline: none;
  border: none;
  padding: 10px 14px;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  background-color: $b-300;
  border-radius: 4px;
  cursor: pointer;

  p {
    padding-top: 3px;
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>

<style lang="scss" module="info">
.layout {
  width: 336px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.inspector {
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    display: flex;
    align-items: center;
    height: 32px;
  }
}

.accuracy {
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


  p {
    display: flex;
    align-items: center;
    height: 32px;
  }
}

.text {
  color: $m-400;
  font-size: 12px;
  font-weight: 600;
}

.progress {
  padding-bottom: 20px;
}

.date {
  padding-bottom: 20px;
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

<style lang="scss" module="accuracy">
.progress {
  position: relative;
  width: 78px;
  height: 6px;
  background-color: $n-30;
  border-radius: 20px;
}

.progress_percent {
  position: absolute;
  left: 0;
  top: 0;
  height: 6px;
  max-width: 78px;
  border-radius: 20px;
}

.progress_perfect {
  background-color: $g-200;
}

.progress_below {
  background-color: $b-300;
}

.percent_perfect {
  color: $g-500;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  padding-left: 10px;
}
.percent_below {
  color: $b-400;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  padding-left: 10px;
}
</style>
