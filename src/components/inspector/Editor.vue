<script setup lang="ts">
import { ref } from "vue";
import ComboBox from "@/components/shared/ComboBox.vue";

const deg = ref<number>(0);
const isIdx = ref<boolean>(false);
const isSection = ref<boolean>(false);
const isResult = ref<boolean>(false);

const onInit = () => {
  alert("준비중...");
};

const onFit = (t: "width" | "height") => {
  switch (t) {
    case "width":
      break;
    case "height":
      break;
    default:
      break;
  }
  alert("준비중...");
};

const onDeg = (t: "up" | "down") => {
  switch (t) {
    case "up":
      deg.value = deg.value + 1;
      break;
    case "down":
      deg.value = deg.value - 1;
      break;
    default:
      break;
  }
};

const onRotate = (t: "cw" | "ccw") => {
  switch (t) {
    case "cw":
      deg.value = deg.value + 90;
      break;
    case "ccw":
      deg.value = deg.value - 90;
      break;
    default:
      break;
  }
};
</script>

<template>
  <article :class="container.layout">
    <section :class="controll.layout" aria-label="Controller Section">
      <div :class="controll.box_start">
        <p :class="controll.text">배율</p>
        <div :class="controll.combo">
          <ComboBox :items="[{ id: 1, text: '66%', value: '66' }]" />
        </div>
        <button :class="controll.func_btn" type="button" @click="onInit">
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.1667 2.83331C20.719 2.83331 21.1667 3.28103 21.1667 3.83331V8.83331C21.1667 9.3856 20.719 9.83331 20.1667 9.83331H15.1667C14.6144 9.83331 14.1667 9.3856 14.1667 8.83331C14.1667 8.28103 14.6144 7.83331 15.1667 7.83331H19.1667V3.83331C19.1667 3.28103 19.6144 2.83331 20.1667 2.83331Z"
              fill="#1B1B1B"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.8016 4.25791C11.7468 3.95282 10.632 3.9199 9.56103 4.16221C8.4901 4.40452 7.49801 4.91417 6.67732 5.6436C5.85664 6.37304 5.23411 7.29848 4.86782 8.33358C4.68358 8.85423 4.11216 9.12694 3.59151 8.9427C3.07086 8.75846 2.79815 8.18703 2.98239 7.66639C3.46138 6.31279 4.27546 5.1026 5.34866 4.14872C6.42187 3.19485 7.71922 2.52839 9.11966 2.21152C10.5201 1.89465 11.978 1.93771 13.3573 2.33667C14.7314 2.73414 15.9829 3.47194 16.996 4.48163L20.8515 8.10456C21.254 8.48275 21.2737 9.11561 20.8955 9.51809C20.5173 9.92057 19.8845 9.94026 19.482 9.56207L15.6153 5.92873C15.6077 5.92158 15.6002 5.9143 15.5928 5.90691C14.8166 5.13032 13.8563 4.563 12.8016 4.25791ZM1.10468 11.4819C1.48288 11.0794 2.11574 11.0597 2.51822 11.4379L6.38488 15.0712C6.3925 15.0784 6.4 15.0857 6.40739 15.0931C7.1836 15.8696 8.14388 16.437 9.19864 16.742C10.2534 17.0471 11.3683 17.0801 12.4392 16.8378C13.5101 16.5954 14.5022 16.0858 15.3229 15.3564C16.1436 14.6269 16.7661 13.7015 17.1324 12.6664C17.3166 12.1457 17.8881 11.873 18.4087 12.0573C18.9293 12.2415 19.2021 12.8129 19.0178 13.3336C18.5388 14.6872 17.7248 15.8974 16.6515 16.8512C15.5783 17.8051 14.281 18.4716 12.8806 18.7884C11.4801 19.1053 10.0222 19.0623 8.64292 18.6633C7.26879 18.2658 6.01728 17.528 5.00425 16.5183L1.14866 12.8954C0.746182 12.5172 0.726493 11.8844 1.10468 11.4819Z"
              fill="#1B1B1B"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.833435 12.1667C0.833435 11.6144 1.28115 11.1667 1.83344 11.1667H6.83344C7.38572 11.1667 7.83344 11.6144 7.83344 12.1667C7.83344 12.719 7.38572 13.1667 6.83344 13.1667H2.83344V17.1667C2.83344 17.719 2.38572 18.1667 1.83344 18.1667C1.28115 18.1667 0.833435 17.719 0.833435 17.1667V12.1667Z"
              fill="#1B1B1B"
            />
          </svg>

          <p>초기화</p>
        </button>
        <button
          :class="controll.func_btn"
          type="button"
          @click="onFit('width')"
        >
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.16667 3C2.79848 3 2.5 3.29848 2.5 3.66667V17.3333C2.5 17.7015 2.79848 18 3.16667 18H16.8333C17.2015 18 17.5 17.7015 17.5 17.3333V3.66667C17.5 3.29848 17.2015 3 16.8333 3H3.16667ZM0.5 3.66667C0.5 2.19391 1.69391 1 3.16667 1H16.8333C18.3061 1 19.5 2.19391 19.5 3.66667V17.3333C19.5 18.8061 18.3061 20 16.8333 20H3.16667C1.69391 20 0.5 18.8061 0.5 17.3333V3.66667Z"
              fill="#1B1B1B"
            />
            <path
              d="M15.8514 10.2152C16.0495 10.3654 16.0495 10.6346 15.8514 10.7848L13.7119 12.4073C13.4333 12.6186 13 12.4453 13 12.1225L13 8.8775C13 8.5547 13.4333 8.38137 13.7119 8.59269L15.8514 10.2152Z"
              fill="#1B1B1B"
            />
            <path
              d="M4.14859 10.7848C3.95047 10.6346 3.95047 10.3654 4.14859 10.2152L6.28806 8.59269C6.56672 8.38137 7 8.5547 7 8.8775L7 12.1225C7 12.4453 6.56672 12.6186 6.28806 12.4073L4.14859 10.7848Z"
              fill="#1B1B1B"
            />
          </svg>
          <p>가로맞춤</p>
        </button>
        <button
          :class="controll.func_btn"
          type="button"
          @click="onFit('height')"
        >
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.16667 3C2.79848 3 2.5 3.29848 2.5 3.66667V17.3333C2.5 17.7015 2.79848 18 3.16667 18H16.8333C17.2015 18 17.5 17.7015 17.5 17.3333V3.66667C17.5 3.29848 17.2015 3 16.8333 3H3.16667ZM0.5 3.66667C0.5 2.19391 1.69391 1 3.16667 1H16.8333C18.3061 1 19.5 2.19391 19.5 3.66667V17.3333C19.5 18.8061 18.3061 20 16.8333 20H3.16667C1.69391 20 0.5 18.8061 0.5 17.3333V3.66667Z"
              fill="#1B1B1B"
            />
            <path
              d="M10.2848 16.3514C10.1346 16.5495 9.86543 16.5495 9.71519 16.3514L8.09269 14.2119C7.88137 13.9333 8.0547 13.5 8.3775 13.5L11.6225 13.5C11.9453 13.5 12.1186 13.9333 11.9073 14.2119L10.2848 16.3514Z"
              fill="#1B1B1B"
            />
            <path
              d="M9.71519 4.64859C9.86543 4.45047 10.1346 4.45047 10.2848 4.64859L11.9073 6.78806C12.1186 7.06672 11.9453 7.5 11.6225 7.5L8.3775 7.5C8.0547 7.5 7.88137 7.06672 8.09269 6.78806L9.71519 4.64859Z"
              fill="#1B1B1B"
            />
          </svg>

          <p>세로맞춤</p>
        </button>
      </div>
      <div :class="controll.box_center">
        <p :class="controll.text">회전</p>
        <div :class="controll.rotate">
          <p>{{ deg }}º</p>
          <div :class="controll.rotate_icon">
            <i @click="onDeg('up')">
              <svg
                width="9"
                height="7"
                viewBox="0 0 9 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.26595 1.27629C4.84288 0.853217 4.15695 0.853217 3.73388 1.27629L0.817217 4.19295C0.394149 4.61602 0.394149 5.30195 0.817217 5.72502C1.24028 6.14808 1.92621 6.14808 2.34928 5.72502L4.49992 3.57438L6.65055 5.72502C7.07362 6.14808 7.75955 6.14808 8.18261 5.72502C8.60568 5.30195 8.60568 4.61602 8.18261 4.19295L5.26595 1.27629Z"
                  fill="#42526E"
                />
              </svg>
            </i>
            <i @click="onDeg('down')">
              <svg
                width="9"
                height="7"
                viewBox="0 0 9 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.26595 5.72469C4.84288 6.14776 4.15695 6.14776 3.73388 5.72469L0.817217 2.80802C0.394149 2.38496 0.394149 1.69903 0.817217 1.27596C1.24028 0.852892 1.92621 0.852892 2.34928 1.27596L4.49992 3.42659L6.65055 1.27596C7.07362 0.852892 7.75955 0.852892 8.18261 1.27596C8.60568 1.69903 8.60568 2.38496 8.18261 2.80802L5.26595 5.72469Z"
                  fill="#42526E"
                />
              </svg>
            </i>
          </div>
        </div>
        <button
          :class="controll.func_btn"
          type="button"
          @click="onRotate('cw')"
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.6667 2.83301C20.219 2.83301 20.6667 3.28072 20.6667 3.83301V8.83301C20.6667 9.38529 20.219 9.83301 19.6667 9.83301H14.6667C14.1144 9.83301 13.6667 9.38529 13.6667 8.83301C13.6667 8.28072 14.1144 7.83301 14.6667 7.83301H18.6667V3.83301C18.6667 3.28072 19.1144 2.83301 19.6667 2.83301Z"
              fill="#1B1B1B"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.4162 4.06638C10.0208 3.86846 8.59896 4.12941 7.36482 4.80991C6.13067 5.4904 5.15113 6.55357 4.5738 7.83922C3.99646 9.12486 3.85262 10.5633 4.16394 11.9378C4.47526 13.3123 5.22487 14.5484 6.29983 15.4598C7.37478 16.3712 8.71684 16.9086 10.1238 16.9909C11.5307 17.0732 12.9262 16.696 14.1001 15.9161C15.274 15.1363 16.1627 13.9961 16.6321 12.6672C16.8161 12.1465 17.3874 11.8735 17.9081 12.0575C18.4289 12.2414 18.7019 12.8127 18.5179 13.3335C17.904 15.0712 16.7419 16.5622 15.2068 17.582C13.6717 18.6018 11.8468 19.0951 10.007 18.9875C8.16714 18.8798 6.41215 18.1771 5.00643 16.9853C3.60072 15.7935 2.62045 14.177 2.21334 12.3796C1.80623 10.5822 1.99434 8.70113 2.74931 7.01991C3.50429 5.33869 4.78523 3.94838 6.39911 3.0585C8.01299 2.16862 9.87238 1.82738 11.6971 2.0862C13.5166 2.34429 15.2033 3.1851 16.5046 4.48241L20.3522 8.10566C20.7543 8.48428 20.7733 9.11716 20.3947 9.51923C20.0161 9.9213 19.3832 9.94031 18.9811 9.56169L15.1228 5.92835C15.1154 5.92142 15.1082 5.91438 15.101 5.90722C14.1048 4.91037 12.8116 4.2643 11.4162 4.06638Z"
              fill="#1B1B1B"
            />
          </svg>
          <p>90º</p>
        </button>
        <button
          :class="controll.func_btn"
          type="button"
          @click="onRotate('ccw')"
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.33334 2.83301C1.88562 2.83301 2.33334 3.28072 2.33334 3.83301V7.83301H6.33334C6.88562 7.83301 7.33334 8.28072 7.33334 8.83301C7.33334 9.38529 6.88562 9.83301 6.33334 9.83301H1.33334C0.781051 9.83301 0.333336 9.38529 0.333336 8.83301V3.83301C0.333336 3.28072 0.781051 2.83301 1.33334 2.83301Z"
              fill="#1B1B1B"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.31457 2.09072C11.1395 1.83397 12.9983 2.17725 14.6112 3.06884C16.224 3.96042 17.5034 5.35201 18.2565 7.03393C19.0097 8.71585 19.1958 10.597 18.7869 12.3939C18.378 14.1908 17.3962 15.8062 15.9894 16.9966C14.5826 18.1869 12.827 18.8879 10.9872 18.9938C9.14741 19.0997 7.32302 18.6048 5.78894 17.5836C4.25486 16.5625 3.09419 15.0705 2.48182 13.3323C2.2983 12.8114 2.5718 12.2404 3.0927 12.0569C3.6136 11.8733 4.18465 12.1468 4.36817 12.6677C4.83646 13.9969 5.72403 15.1379 6.89715 15.9187C8.07027 16.6996 9.46539 17.0781 10.8723 16.9971C12.2792 16.9161 13.6217 16.3801 14.6975 15.4698C15.7733 14.5595 16.5241 13.3242 16.8368 11.9501C17.1495 10.576 17.0071 9.13749 16.4312 7.85132C15.8552 6.56514 14.8769 5.50098 13.6436 4.81919C12.4102 4.13739 10.9887 3.87488 9.59322 4.07122C8.19772 4.26756 6.90383 4.9121 5.90651 5.90774C5.89937 5.91487 5.89212 5.92189 5.88477 5.92879L2.01811 9.56213C1.61563 9.94032 0.98277 9.92063 0.604578 9.51815C0.226387 9.11567 0.246075 8.48281 0.648555 8.10462L4.50454 4.48132C5.80724 3.18559 7.49484 2.34675 9.31457 2.09072Z"
              fill="#1B1B1B"
            />
          </svg>
          <p>-90º</p>
        </button>
      </div>
      <div :class="controll.box_end">
        <p :class="controll.text">표시 항목</p>
        <button
          :class="controll.display_btn"
          type="button"
          @click="() => (isIdx = !isIdx)"
        >
          <i
            :class="{
              [controll.on_icon]: isIdx,
              [controll.off_icon]: !isIdx,
            }"
          ></i>
          <p>인식번호</p>
          <i
            :class="{
              [controll.on]: isIdx,
              [controll.off]: !isIdx,
            }"
          >
            {{ isIdx ? "&nbsp;ON&nbsp;" : "OFF" }}
          </i>
        </button>
        <button
          :class="controll.display_btn"
          type="button"
          @click="() => (isSection = !isSection)"
        >
          <i
            :class="{
              [controll.on_icon]: isSection,
              [controll.off_icon]: !isSection,
            }"
          >
          </i>
          <p>인식영역</p>
          <i
            :class="{
              [controll.on]: isSection,
              [controll.off]: !isSection,
            }"
          >
            {{ isSection ? "&nbsp;ON&nbsp;" : "OFF" }}
          </i>
        </button>
        <button
          :class="controll.display_btn"
          type="button"
          @click="() => (isResult = !isResult)"
        >
          <i
            :class="{
              [controll.on_icon]: isResult,
              [controll.off_icon]: !isResult,
            }"
          ></i>
          <p>인식결과</p>
          <i
            :class="{
              [controll.on]: isResult,
              [controll.off]: !isResult,
            }"
          >
            {{ isResult ? "&nbsp;ON&nbsp;" : "OFF" }}
          </i>
        </button>
      </div>
    </section>
    <section :class="viewer.layout" aria-label="Viewer Section">
      <div>
        <p>start</p>
        <p>end</p>
      </div>
    </section>
  </article>
</template>

<style lang="scss" module="container">
.layout {
  width: calc(100% - 468px);
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.24);
}
</style>

<style lang="scss" module="controll">
.layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  background-color: #ffffff;
  border: 1px solid $n-50;
  border-top: none;
  padding: 12px 16px;
}

.box_start {
  width: 100%;
  display: flex;
  align-items: center;
}
.box_center {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box_end {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.text {
  font-size: 14px;
  font-weight: 600;
  color: $m-500;
  padding: 0 10px;
}

.combo {
  width: 88px;
  height: 40px;
  margin: 0 10px;
}

.rotate {
  position: relative;
  display: flex;
  align-items: center;
  width: 80px;
  height: 40px;
  padding: 10px;
  border: 1px solid $n-40;
  border-radius: 4px;

  p {
    font-size: 14px;
    font-weight: 400;
    color: $m-800;
  }
}

.rotate_icon {
  position: absolute;
  right: 10px;
  top: 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.func_btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background-color: none;
  outline: none;
  background-color: #ffffff;
  margin: 0 10px;
  cursor: pointer;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  p {
    padding-top: 5px;
    color: $m-600;
    font-size: 11px;
    font-weight: 600;
  }
}

.display_btn {
  width: 102px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid $n-40;
  border-radius: 4px;
  background-color: #ffffff;
  margin: 0 5px;
  cursor: pointer;

  p {
    font-size: 13px;
    font-weight: 400;
    color: $m-700;
  }
}

.on {
  font-size: 13px;
  font-weight: 600;
  color: $g-300;
}

.off {
  font-size: 13px;
  font-weight: 600;
  color: $m-700;
}

.on_icon {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: $g-300;
}

.off_icon {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: $n-40;
}
</style>

<style lang="scss" module="viewer">
.layout {
  width: 100%;
  height: calc(100% - 128px);
  overflow: scroll;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 2000px;
    height: 1000px;
  }
}
</style>
