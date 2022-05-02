<script setup lang="ts">
import { ref, onMounted } from "vue";
import MainLayout from "@/components/layout/MainLayout.vue";
import SearchBar from "@/components/settings/SearchBar.vue";
import UserForm from "@/components/settings/UserForm.vue";
import Pagination from "@/components/shared/Pagination.vue";
import { useUserStore } from "@/store";

const userStore = useUserStore();

const currentPage = ref<number>(1);

const onChgPage = (n: number) => {
  currentPage.value = n;
};

onMounted(() => {
  userStore.team = null;
});
</script>

<template>
  <MainLayout>
    <div class="user-page">
      <div class="title">구성원 관리 ({{ userStore.users.length }})</div>
      <div class="search">
        <SearchBar />
      </div>
      <div class="grid">
        <UserForm />
      </div>
      <div class="pagination">
        <Pagination :current="currentPage" @change="onChgPage" />
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
.user-page {
  width: 100%;
  height: 100vh;
  padding: 80px 100px;
  display: flex;
  flex-direction: column;

  .title {
    color: $d5;
    font-size: 24px;
    font-weight: 600;
  }

  .search {
    margin-bottom: 30px;
  }

  .grid {
    height: 100%;
    overflow: scroll;
  }

  .pagination {
    border-top: 1px solid $d4;
    height: 50px;
  }
}
</style>
