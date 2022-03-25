<script setup lang="ts">
import { ref, onMounted } from "vue";
import Grid from "@/components/shared/Grid.vue";
import Pagination from "@/components/shared/Pagination.vue";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();

const currentPage = ref<number>(1);

const onPageChange = (current: number) => {
  currentPage.value = current;
  authStore.getAlarmList(currentPage.value);
};

onMounted(() => {
  authStore.getAlarmList(currentPage.value);
});
</script>

<template>
  <div class="alarm-form">
    <div class="alarm-form__grid">
      <Grid
        class="underline"
        :columns="authStore.alarmColumns"
        :grid-list="authStore.alarmList"
      >
        <template v-slot:content="{ item }">
          <div class="content">
            <div class="dot" :class="{ new: item.new }"></div>
            <div class="text">{{ item.content }}</div>
          </div>
        </template>
      </Grid>
    </div>
    <div class="alarm-form__pagination">
      <Pagination :current="currentPage" @change="onPageChange" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.alarm-form {
  .alarm-form__grid {
    padding-bottom: 20px;

    .grid {
      .grid__columns {
        .row {
          .content {
            display: flex;
            align-items: center;
            .dot {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              margin: 0 10px;
              &.new {
                background-color: $point-blue;
              }
            }

            .text {
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }
}
</style>
