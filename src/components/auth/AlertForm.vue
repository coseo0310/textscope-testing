<script setup lang="ts"></script>

<template>
  <div class="alert-form">
    <div class="title">
      <slot name="title" />
    </div>
    <div class="subject">
      <slot name="subject" />
    </div>
    <div class="btn-wrap">
      <slot name="btn" />
    </div>
  </div>
</template>

<style lang="scss">
.alert-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  min-width: 700px;

  .title {
    font-size: 48px;
    font-weight: 700;
  }

  .subject {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 24px;
    font-weight: 600;
    margin-top: 30px;
    line-height: 34px;
  }

  .btn-wrap {
    width: 330px;
    height: 46px;
    margin-top: 50px;

    button {
      font-size: 18px;
      font-weight: 800;
    }
  }
}
</style>
