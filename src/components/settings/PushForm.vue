<script setup lang="ts">
import Switch from "@/components/shared/Switch.vue";
</script>

<template>
  <div class="push-form">
    <div class="push-form__items">
      <div class="text">문서 분류 AI 모델 학습</div>
      <div class="switch-wrap">
        <div class="switch">
          <Switch />
        </div>
        <div class="description">
          *새로운 문서 분류 AI 모델이 학습되어 등록되면 알림을 받습니다.
        </div>
      </div>
    </div>
    <div class="push-form__items">
      <div class="text">템플릿 OCR</div>
      <div class="switch-wrap">
        <div class="switch">
          <Switch />
        </div>
        <div class="description">
          *새로운 템플릿 OCR모델이 등록되면 알림을 받습니다.
        </div>
      </div>
    </div>
    <div class="push-form__items">
      <div class="text">권한</div>
      <div class="switch-wrap">
        <div class="switch">
          <Switch />
        </div>
        <div class="description">
          *관리자가 팀의 구성원을 추가 / 삭제 시 알림을 받습니다.
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.push-form {
  width: 614px;
  height: 275px;

  .push-form__items {
    display: flex;
    width: 100%;
    height: 65px;

    &:first-child {
      margin-bottom: 30px;
    }

    &:last-child {
      margin-top: 30px;
    }

    .text {
      padding: 10px 0;
      width: 255px;
      font-size: 18px;
      font-weight: 400;
    }

    .switch-wrap {
      .switch {
        width: 162px;
        height: 40px;
        padding-bottom: 8px;
      }

      .description {
        font-weight: 400;
        font-size: 14px;
      }
    }
  }
}
</style>
