<script setup lang="ts">
import Button from "@/components/shared/Button.vue";
import Icons from "@/components/shared/Icons.vue";

const onFilter = () => {
  alert("준비중...");
};

const onReload = () => {
  alert("준비중...");
};

const onDelete = () => {
  alert("준비중...");
};

const onDownload = () => {
  alert("준비중...");
};

const onUpload = () => {
  alert("준비중...");
};
</script>

<template>
  <div class="work-menu">
    <div class="work-menu__info">
      <div class="title">업무</div>
      <div class="total">전체: {{ "302,234" }}</div>
      <div class="reload" @click="onReload">
        <Icons icons="reload" />
      </div>
      <div class="waiting">대기: {{ "200" }}</div>
      <div class="confirm">완료: {{ "192,049" }}</div>
      <div class="filter-btn" @click="onFilter">검색 필터 선택</div>
    </div>
    <div class="work-menu__btn-wrap">
      <div class="delete">
        <Button class="outline semi-bold color-red" @click="onDelete"
          >삭제</Button
        >
      </div>
      <div class="download">
        <Button class="outline semi-bold" @click="onDownload">다운로드</Button>
      </div>
      <div class="upload">
        <Button class="primary semi-bold" @click="onUpload">문서업로드</Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.work-menu {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .work-menu__info {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    color: $d5;
    font-size: 18px;
    padding-bottom: 10px;

    .title {
      font-size: 24px;
    }
    .total {
      padding: 0 40px;
    }
    .reload {
      stroke: $point-blue;
      cursor: pointer;
    }
    .waiting {
      padding: 0 50px;
    }

    .filter-btn {
      color: $point-blue;
      text-decoration: underline;
      line-height: 20px;
      padding: 0 40px;
      cursor: pointer;
    }

    .total,
    .title,
    .filter-btn {
      font-weight: 600;
    }
  }

  .work-menu__btn-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .delete,
    .download,
    .upload {
      width: 180px;
      height: 46px;
      margin-left: 20px;
    }
  }
}
</style>
