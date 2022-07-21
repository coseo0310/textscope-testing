<script setup lang="ts">
import ComboBox from "@/components/shared/ComboBox.vue";

const str = `YYYY/MM/DD\nRPA 봇을 실행합니다.`;

const onSave = () => {
  alert("준비중...");
};
</script>

<template>
  <article :class="container.layout">
    <div :class="rpa.box">
      <div :class="rpa.label">RPA봇 수신메일 주소</div>
      <div :class="rpa.combo">
        <ComboBox
          :items="[
            { id: 1, text: 'rpabot0001@koreaexim.co.kr', value: 'adsf' },
            { id: 2, text: 'rpabot0002@koreaexim.co.kr', value: 'adsf' },
            { id: 3, text: 'rpabot0003@koreaexim.co.kr', value: 'adsf' },
            { id: 4, text: 'rpabot0004@koreaexim.co.kr', value: 'adsf' },
          ]"
        />
      </div>
    </div>
    <div :class="rpa.box">
      <div :class="rpa.label">인식결과 저장 경로 (NAS)</div>
      <input :class="rpa.input" type="text" value="\192.168.0.10\AIOCR" />
    </div>
    <div :class="rpa.box">
      <div :class="rpa.label">메일 발송 문구</div>
      <textarea
        :class="rpa.textarea"
        type="text"
        rows="8"
        cols="50"
        :value="str"
      >
      </textarea>
    </div>
    <button :class="rpa.btn" type="button" @click="onSave">
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
          d="M15.1448 4.24408C15.4703 4.56951 15.4703 5.09715 15.1448 5.42259L7.50593 13.0615C7.34965 13.2178 7.13768 13.3056 6.91667 13.3056C6.69566 13.3056 6.4837 13.2178 6.32741 13.0615L2.85519 9.58926C2.52976 9.26382 2.52976 8.73618 2.85519 8.41075C3.18063 8.08531 3.70827 8.08531 4.0337 8.41075L6.91667 11.2937L13.9663 4.24408C14.2917 3.91864 14.8194 3.91864 15.1448 4.24408Z"
          fill="white"
        />
      </svg>
      <p>변경사항 저장</p>
    </button>
  </article>
</template>

<style lang="scss" module="container">
.layout {
  width: 100%;
  height: calc(100% - 95px);
  padding: 48px;
  background-color: #ffffff;
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 3px;
}
</style>

<style lang="scss" module="rpa">
.box {
  display: flex;
  padding: 8px 0;
}

.label {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  color: $m-500;
}

.combo {
  width: 600px;
  height: 40px;
}

.input {
  width: 600px;
  height: 40px;
  border: 1px solid $n-40;
  border-radius: 3px;
  outline: none;
  font-size: 14px;
  font-weight: 400;
  color: $m-800;
  padding: 0 15px;
}

.textarea {
  resize: none;
  width: 600px;
  height: 180px;
  border: 1px solid $n-40;
  border-radius: 3px;
  outline: none;
  font-size: 14px;
  font-weight: 400;
  color: $m-800;
  padding: 15px;
}

.btn {
  width: 141px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  background-color: $m-900;
  margin-left: calc(800px - 141px);
  cursor: pointer;

  p {
    font-size: 16px;
    font-weight: 700;
    padding: 0 5px;
    color: #ffffff;
  }
}
</style>
