<script setup lang="ts">
import { watch } from "vue";
import MainLayout from "@/components/layout/MainLayout.vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { constants } from "@/router";

const store = useStore();
const router = useRouter();

if (store.accessToken) {
  console.log("getUser");
  // TODO: GET USER
  // await store.getUser(store.accessToken);
  store.user = {
    id: `${Date.now()}`,
    name: `super`,
    division: `super`,
    job_position: `super`,
    phone_number: `000-0000-000`,
    authority: `super`,
    extension_number: `000`,
  };
}

watch(store, () => {
  if (!store.accessToken) {
    router.push(constants.login.path);
  } else if (!store.user) {
    store.user = {
      id: `${Date.now()}`,
      name: `super`,
      division: `super`,
      job_position: `super`,
      phone_number: `000-0000-000`,
      authority: `super`,
      extension_number: `000`,
    };
  }
});
</script>

<template>
  <MainLayout />
</template>

<style lang="scss">
@import "../scss/_reset.scss";
@import "../scss/_global.scss";
</style>
