<script setup lang="ts">
import CheckBox from "@/components/shared/CheckBox.vue";
import Button from "@/components/shared/Button.vue";
</script>

<template>
  <div class="filter">
    <div class="filter__header">
      <div class="title">검색 필터 설정</div>
      <div class="reset">초기화</div>
    </div>
    <div class="filter__main">
      <div class="category">
        <div class="title">카테고리</div>
        <div class="box">
          <CheckBox class="checkbox" label="전체" />
          <CheckBox class="checkbox" label="실손 의료비 영수증" />
          <CheckBox class="checkbox" label="온라인 뱅킹 가입 신청서" />
          <CheckBox class="checkbox" label="통장 사본" />
          <CheckBox class="checkbox" label="가계 대출 신청서" />
          <CheckBox class="checkbox" label="진료비 계산서" />
        </div>
      </div>
      <div class="types">
        <div class="title">문서 유형</div>
        <div class="box">
          <CheckBox class="checkbox" label="전체" />
          <CheckBox class="checkbox" label="템플릿 OCR" />
          <CheckBox class="checkbox" label="정형" />
          <CheckBox class="checkbox" label="비정형" />
        </div>
      </div>
      <div class="save">
        <div class="title">저장</div>
        <div class="box">
          <CheckBox class="checkbox" label="전체" />
          <CheckBox class="checkbox" label="저장" />
          <CheckBox class="checkbox" label="저장 안함" />
        </div>
      </div>
      <div class="ocr">
        <div class="title">OCR</div>
        <div class="box">
          <CheckBox class="checkbox" label="전체" />
          <CheckBox class="checkbox" label="시스템" />
          <CheckBox class="checkbox" label="수동" />
          <CheckBox class="checkbox" label="대기" />
        </div>
      </div>
      <div class="inspection">
        <div class="title">검수</div>
        <div class="box">
          <CheckBox class="checkbox" label="전체" />
          <CheckBox class="checkbox" label="변경" />
          <CheckBox class="checkbox" label="변경 안함" />
        </div>
      </div>
      <div class="date">
        <div class="title">기간</div>
        <div class="box">
          <div class="start time">2022.01.18</div>
          <div class="divider">~</div>
          <div class="end time">2022.03.21</div>
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <Button class="primary">검색</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter {
  position: absolute;
  top: 30px;
  left: 30px;
  display: flex;
  flex-direction: column;
  min-width: 732px;
  min-height: 763px;
  background-color: $d2;
  border-radius: 40px;
  padding: 50px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: 700;

  .filter__header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $point-blue;

    .title {
      font-size: 24px;
    }
    .reset {
      position: absolute;
      top: 6px;
      right: 0;
      font-weight: 600;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .filter__main {
    width: 100%;
    color: $d5;
    .category,
    .types,
    .save,
    .ocr,
    .inspection,
    .date {
      width: 100%;
      display: flex;
      flex-direction: column;

      .box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding: 20px 0;

        .checkbox {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 5px 25px 5px 0;
        }
      }
    }

    .date {
      .box {
        .time {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 160px;
          height: 34px;
          background-color: $d3;
          border-radius: 20px;
          font-weight: 400;
          color: $d5;
          cursor: pointer;
        }

        .start {
          margin-right: 15px;
        }
        .end {
          margin-left: 15px;
        }
      }
    }
  }

  .btn-wrap {
    width: 100%;
    height: 46px;
    margin-top: 10px;
  }
}
</style>
