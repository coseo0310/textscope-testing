<script setup lang="ts"></script>

<template>
  <article :class="container.layout">
    <div :class="profile.box">
      <div :class="profile.label">행번</div>
      <input :class="profile.input" type="text" value="0001" readonly />
    </div>
    <div :class="profile.box">
      <div :class="profile.label">이름</div>
      <input :class="profile.input" type="text" value="우영우" readonly />
    </div>
    <div :class="profile.box">
      <div :class="profile.label">부서</div>
      <input
        :class="profile.input"
        type="text"
        value="본점 > 검수부 > 검수 1팀"
        readonly
      />
    </div>
    <div :class="profile.box">
      <div :class="profile.label">직위</div>
      <input :class="profile.input" type="text" value="사원" readonly />
    </div>
    <div :class="profile.box">
      <div :class="profile.label">내선번호</div>
      <input :class="profile.input" type="text" value="00-000-0000" readonly />
    </div>
    <div :class="profile.box">
      <div :class="profile.label">이메일</div>
      <input :class="profile.input" type="text" value="wyw@test.kr" readonly />
    </div>
    <div :class="profile.box">
      <div :class="profile.label">권한</div>
      <input :class="profile.input" type="text" value="관리자" readonly />
    </div>
    <p :class="profile.text">권한 부여 기간: 2022.01.31 ~ 2022.12.31</p>
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

<style lang="scss" module="profile">
.box {
  display: flex;
  padding: 8px 0;
}

.label {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 88px;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  color: $m-500;
}

.input {
  width: 360px;
  height: 40px;
  border: 1px solid $n-40;
  border-radius: 3px;
  outline: none;
  background-color: $n-20;
  font-size: 14px;
  font-weight: 400;
  color: $n-70;
  padding: 0 10px;
}

.text {
  padding-left: 88px;
  font-size: 12px;
  font-weight: 500;
  color: $b-300;
}
</style>
