<script setup lang="ts">
import { ref, watch } from "vue";

type Props = {
  messages: {
    message: string;
    messageType: "warn" | "info";
  };
};

const props = defineProps<Props>();

const toastEl = ref<HTMLDivElement | null>(null);

watch(props, () => {
  if (!toastEl.value) {
    return;
  }
  const d = document.createElement("div");
  d.innerText = props.messages.message;
  d.classList.add("text");
  d.classList.add("start");
  d.classList.add(props.messages.messageType);
  toastEl.value.appendChild(d);
  toastEl.value.addEventListener("animationend", (e: AnimationEvent) => {
    const el = e.target as HTMLElement;
    if (!el) {
      return;
    }
    setTimeout(() => {
      el.classList.add("up");
      setTimeout(() => {
        el.remove();
      }, 300);
    }, 1000);
  });
});
</script>

<template>
  <div class="toast-continer" ref="toastEl"></div>
</template>

<style lang="scss">
.toast-continer {
  position: absolute;
  bottom: 0;
  right: 0;

  .text {
    position: relative;
    width: 400px;
    height: 100px;
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin: 20px;
    z-index: 10;
    font-size: 18px;
    font-weight: 600;
    transform: translate(0, 0);
    background-color: $d2;

    &.info {
      color: $point-blue;
    }

    &.warn {
      color: $point-red;
    }

    &.start {
      animation: start 0.3s ease-in-out;
    }
    &.up {
      animation: up 0.3s ease-in-out;
    }

    @keyframes start {
      0% {
        transform: translate(500px, 0px);
      }
      100% {
        transform: translate(0, 0px);
      }
    }
    @keyframes up {
      0% {
        transform: translate(0px, 0);
        opacity: 1;
      }
      100% {
        transform: translate(0, -120px);
        opacity: 0;
      }
    }
  }
}
</style>
