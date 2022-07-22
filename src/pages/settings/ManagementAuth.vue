<script setup lang="ts">
import AuthCard from "@/components/settings/AuthCard.vue";
import TeamCard, { Team } from "@/components/settings/TeamCard.vue";

const teams: Team[] = [
  {
    id: `${Date.now()}1`,
    text: "본점",
    list: [
      {
        id: `${Date.now()}2`,
        text: "영업부",
        extend: true,
        children: [
          { id: `${Date.now()}3`, text: "영업 1팀", extend: true },
          { id: `${Date.now()}4`, text: "영업 2팀", extend: true },
        ],
      },
      {
        id: `${Date.now()}7`,
        text: "검수부",
        extend: true,
        children: [
          { id: `${Date.now()}5`, text: "검수 1팀", extend: true },
          { id: `${Date.now()}6`, text: "검수 2팀", extend: true },
        ],
      },
    ],
  },
  {
    id: `${Date.now()}8`,
    text: "1지점",
    list: [
      {
        id: `${Date.now()}9`,
        text: "영업부",
        extend: true,
        children: [
          { id: `12319`, text: "영업 1팀", extend: true },
          { id: `${Date.now()}11`, text: "영업 2팀", extend: true },
        ],
      },
      {
        id: `${Date.now()}`,
        text: "검수부",

        extend: true,
        children: [
          { id: `${Date.now()}12`, text: "검수 1팀", extend: true },
          { id: `${Date.now()}13`, text: "검수 2팀", extend: true },
        ],
      },
    ],
  },
  {
    id: `${Date.now()}14`,
    text: "2지점",
    list: [
      {
        id: `${Date.now()}15`,
        text: "영업부",

        extend: true,
        children: [
          { id: `${Date.now()}16`, text: "영업 1팀", extend: true },
          { id: `${Date.now()}17`, text: "영업 2팀", extend: true },
        ],
      },
      {
        id: `${Date.now()}18`,
        text: "검수부",
        extend: true,
        children: [
          { id: `${Date.now()}20`, text: "검수 1팀", extend: true },
          { id: `${Date.now()}21`, text: "검수 2팀", extend: true },
        ],
      },
    ],
  },
];
</script>

<template>
  <main :class="main.layout">
    <h1 :class="main.title">권한 관리</h1>
    <div :class="main.card_layout">
      <AuthCard />
      <TeamCard :teams="teams" current-id="12319" />
    </div>
  </main>
</template>

<style lang="scss" module="main">
.layout {
  width: calc(100vw - 400px);
  height: 100vh;
  padding: 0 32px 48px 32px;
}

.title {
  color: $m-900;
  font-size: 29px;
  font-weight: 700;
  padding-top: 42px;
  padding-bottom: 14px;
}

.card_layout {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
