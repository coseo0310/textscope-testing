<script setup lang="ts">
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button.vue";
import Icons from "@/components/shared/Icons.vue";
import { useClassificationStore } from "@/store";
import { storeToRefs } from "pinia";

const classificationStore = useClassificationStore();

const { itemSelected, model } = storeToRefs(classificationStore);

const onDelete = () => {};

const onUpload = () => {};

const onLearning = () => {};
</script>

<template>
  <div class="register-menu-container">
    <div class="input-wrap">
      <Input class="border-color-d4 color-d5" />
      <div class="icon-wrap">
        <Icons icons="info" />
        <div class="info">
          <div class="box">
            <div class="title">
              문서 분류 모델 이름은 한글과 영어 그리고 숫자만 입력해주세요
            </div>
            <div class="subject">
              <p>∙ 사업투자 심사97 ( O )</p>
              <p>∙ 사업투자 !@ ( X )</p>
              <p>∙ 사업투자 investment( O )</p>
            </div>
          </div>
          <div class="box">
            <div class="title">
              문서 분류 모델 이름은 중복하여 사용할 수 없고, 띄어쓰기가
              반영됩니다.
            </div>
            <div class="subject">
              <p>
                ∙ 사업투자 심사 모델과 사업투자심사 모델은 다른 모델로
                인식됩니다.
              </p>
            </div>
          </div>
          <div class="box">
            <div class="title">영어 알파벳 대소문자가 구분됩니다.</div>
            <div class="subject">
              <p>
                ∙ 사업투자 Investment 와 investment는 다른 모델로 인식됩니다.
              </p>
            </div>
          </div>
          <div class="box">
            <div class="title">
              문서 분류 모델 이름은 띄어쓰기 포함 40bytes를 초과할 수 없습니다.
            </div>
            <div class="subject">
              <p>∙ 한글 1자는 2bytes</p>
              <p>∙ 띄어쓰기 공백은 1bytes</p>
              <p>∙ 알파벳 한자는 1bytes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-group">
      <div class="btn-wrap">
        <Button
          class="primary color-red extra-bold"
          :disabled="itemSelected.length === 0"
          @click="onDelete"
        >
          삭제
        </Button>
      </div>
      <div class="btn-wrap">
        <Button class="primary extra-bold" @click="onUpload">업로드</Button>
      </div>
      <div class="btn-wrap">
        <Button
          class="primary extra-bold"
          :disabled="!model"
          @click="onLearning"
        >
          학습시작
        </Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  .input-wrap {
    width: 542px;
    height: 46px;
    display: flex;
    align-items: center;

    .icon-wrap {
      position: relative;
      color: $d4;
      padding: 5px;
      cursor: pointer;

      &:hover {
        .info {
          display: flex;
        }
      }

      .info {
        display: none;
        flex-direction: column;
        color: $d5;
        position: absolute;
        background-color: $d1;
        width: 605px;
        height: 410px;
        border-radius: 10px;
        box-shadow: $shadow-alpha-1;
        z-index: 2;
        padding: 30px 0;

        .box {
          padding: 10px 40px;
          .title,
          .subject {
            font-size: 18px;
            font-weight: 600;
          }

          .title {
            padding: 5px 0;
          }

          .subject {
            color: $d4;
            padding-left: 25px;
          }
        }
      }
    }
  }

  .btn-group {
    display: flex;

    .btn-wrap {
      width: 180px;
      height: 46px;
      padding-left: 20px;
    }
  }
}
</style>
