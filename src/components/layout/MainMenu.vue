<script setup lang="ts">
import Icons from "@/components/shared/icons";
import Badge from "@/components/shared/badge";
import Avatar from "@/components/shared/avatar";
</script>

<template>
  <div class="main-menu-container">
    <div class="logo"><img src="../../assets/logo/textscope-logo.png" /></div>
    <div class="menu-wrap">
      <div class="menu-list">
        <div class="icon-wrap">
          <Icons icons="dashboard" />
        </div>
        <div class="menu-text">대시보드</div>
      </div>
      <div class="menu-list">
        <div class="icon-wrap">
          <Icons icons="classification" />
        </div>
        <div class="menu-text">문서 분류 AI 모델</div>
      </div>
      <div class="menu-list">
        <div class="icon-wrap">
          <Icons icons="template" />
        </div>
        <div class="menu-text">템플릿 OCR</div>
      </div>
      <div class="menu-list">
        <div class="icon-wrap">
          <Icons icons="work" />
        </div>
        <div class="menu-text">업무 관리</div>
      </div>
    </div>
    <div class="profile">
      <div class="alarm on">
        <Badge alarm="299">
          <Icons icons="bell" />
        </Badge>
      </div>
      <div class="avatar-wrap">
        <Avatar
          uri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80"
        />
      </div>
      <div class="name">Anonymous</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-menu-container {
  width: 100%;
  min-height: 100px;
  background-color: $d1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;

  .logo {
    width: 205px;
    height: 46px;
    margin: 27px 0;
    margin-right: 110px;
  }

  .menu-wrap {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 100px;

    .menu-list {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 52px;
      margin: 0 20px;
      cursor: pointer;

      .icon-wrap {
        margin-right: 10px;

        svg {
          fill: $d4;
        }
      }

      .menu-text {
        width: 100%;
        font-size: 18px;
        font-weight: 600;
        color: $d4;
      }

      &:hover {
        svg {
          fill: $point-blue;
        }
        .menu-text {
          color: $point-blue;
        }
      }
    }
  }

  .profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .alarm {
      margin-right: 40px;

      svg {
        stroke: $d4;
      }

      &.on {
        svg {
          stroke: $point-blue;
        }
      }
    }
    .name {
      color: $d4;
      margin: 0 10px;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
</style>
