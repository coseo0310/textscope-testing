<script setup lang="ts">
interface Props {
  title: string;
  text: string[];
  confirm: Function;
  progress: boolean;
}

const props = defineProps<Props>();

const onConfirm = () => {
  if (props.progress) {
    return;
  }
  props.confirm();
};
</script>

<template>
  <article :class="modal.layout">
    <div :class="modal.box">
      <h1 :class="modal.title">{{ props.title }}</h1>
      <div :class="modal.text">
        <p v-for="t in props.text">
          {{ t }}
        </p>
      </div>
      <div :class="modal.btn_wrap">
        <button
          :class="{
            [modal.confirm_btn]: true,
            [modal.progress_color]: props.progress,
            [modal.complete_color]: !props.progress,
          }"
          type="button"
          @click="onConfirm"
        >
          <i v-if="props.progress">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3333 9.99984C18.3333 14.6022 14.6024 18.3332 10 18.3332C5.39762 18.3332 1.66666 14.6022 1.66666 9.99984C1.66666 5.39746 5.39762 1.6665 10 1.6665C14.6024 1.6665 18.3333 5.39746 18.3333 9.99984ZM4.58333 9.99984C4.58333 12.9914 7.00846 15.4165 10 15.4165C12.9915 15.4165 15.4167 12.9914 15.4167 9.99984C15.4167 7.0083 12.9915 4.58317 10 4.58317C7.00846 4.58317 4.58333 7.0083 4.58333 9.99984Z"
                fill="url(#paint0_angular_393_5168)"
              />
              <path
                d="M10 1.66683C11.0943 1.66683 12.178 1.88238 13.189 2.30116C14.2001 2.71995 15.1187 3.33378 15.8926 4.1076C16.6664 4.88143 17.2802 5.80009 17.699 6.81113C18.1178 7.82218 18.3333 8.90581 18.3333 10.0002L15.4167 10.0002C15.4167 9.28883 15.2766 8.58447 15.0043 7.92729C14.7321 7.27011 14.3331 6.67298 13.8302 6.17C13.3272 5.66702 12.73 5.26803 12.0729 4.99581C11.4157 4.7236 10.7113 4.58349 10 4.58349L10 1.66683Z"
                fill="url(#paint1_angular_393_5168)"
              />
              <defs>
                <radialGradient
                  id="paint0_angular_393_5168"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(10 9.99984) scale(8.33333)"
                >
                  <stop offset="0.9999" stop-color="#aaa" />
                  <stop offset="1" stop-color="#aaa" stop-opacity="0.01" />
                </radialGradient>
                <radialGradient
                  id="paint1_angular_393_5168"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(10 10.0002) rotate(-90) scale(8.33333)"
                >
                  <stop offset="0.9999" stop-color="white" />
                  <stop offset="1" stop-color="white" stop-opacity="0.01" />
                </radialGradient>
              </defs>
            </svg>
          </i>
          <p>
            {{ props.progress ? "파일 생성중..." : `확인` }}
          </p>
        </button>
      </div>
    </div>
  </article>
</template>

<style lang="scss" module="modal">
.layout {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 400px;
  height: 180px;
  background-color: #ffffff;
  border-radius: 3px;
  padding: 24px;
}

.title {
  color: $m-800;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  padding-bottom: 16px;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  color: $n-800;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  padding-bottom: 5px;
}

.btn_wrap {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.confirm_btn {
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  outline: none;
  cursor: pointer;
  color: #ffffff;
  margin: 0 4px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;

  i {
    width: 20px;
    height: 20px;
    animation-duration: 0.5s;
    animation-name: animate;
    animation-iteration-count: infinite;
  }

  @keyframes animate {
    100% {
      transform: rotate(360deg);
    }
  }

  p {
    padding: 0 5px;
  }
}

.complete_color {
  background-color: $m-700;
}

.progress_color {
  background-color: #7a7a7a;
}
</style>
