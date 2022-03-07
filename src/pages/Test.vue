<script setup lang="ts">
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import Switch from "@/components/shared/switch";
import Avatar from "@/components/shared/avatar";
import GradientLoader from "@/components/shared/gradient-loader/";
import IosLoader from "@/components/shared/ios-loader";
import Calrendar from "@/components/shared/calrendar";
import Icons from "@/components/shared/icons";
import Badge from "@/components/shared/badge";

const test = (s: boolean) => {
  console.log(s);
};

const c = (v: string) => {
  console.log(v);
};
</script>

<template>
  <div style="height: 100vh">
    <div style="height: 500px; margin: 20px 100px">
      <Calrendar date="2022-03-03" @change="c" />
    </div>

    <div style="height: 80px; margin: 20px">
      <Avatar
        uri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80"
      />
    </div>

    <div style="width: 55px">
      <Badge alarm="299">
        <Avatar
          uri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80"
        />
      </Badge>
    </div>
    <div class="icons" style="display: flex; margin: 20px">
      <Icons icons="dash-on" />
      <Icons icons="class-on" />
      <Icons icons="temp-on" />
      <Icons icons="work-on" />
      <Icons icons="user-plus" />
      <Icons icons="user" />
      <Icons icons="bell" />
      <Icons icons="classification" />
      <Icons icons="dashboard" />
      <Icons icons="password" />
      <Icons icons="calendar" />
      <Icons icons="show" />
      <Icons icons="template" />
      <Icons icons="setting" />
      <Icons icons="hide" />
      <Icons icons="work" />
      <Icons icons="chevron-down" />
    </div>
    <div style="height: 40px">
      <Switch :default="false" @change="test" />
    </div>
    <div style="height: 40px">
      <Input type="password" />
    </div>
    <Button class="primary extra-bold">변경</Button>
    <Button class="outline extra-bold">취소</Button>
    <Button class="primary semi-bold">일정 선택</Button>
    <Button class="primary cancel semi-bold">취소</Button>
    <div style="width: 300px; height: 200px; margin: 20px 300px">
      <IosLoader />
      <GradientLoader />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icons {
  svg {
    fill: $point-blue;
  }
}
</style>
