<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { path } from "@/router";
import { useClassificationStore } from "@/store";
import { storeToRefs } from "pinia";
import TestingChartCard from "@/components/classification/TestingChartCard.vue";

const routes = useRoute();
const router = useRouter();
const classificationStore = useClassificationStore();
const { model, testStatistics, modelList } = storeToRefs(classificationStore);

onMounted(() => {
  const id = routes.query.id;
  if (!id || !testStatistics.value || testStatistics.value.id !== id) {
    router.push({ name: path.classification_management.name });
    return;
  }
  const find = modelList.value.find(
    (f) => f.id === testStatistics.value?.modelId
  );
  if (!find) {
    router.push({ name: path.classification_management.name });
    return;
  }
  model.value = find;
});
</script>

<template>
  <div class="classification-statistics-page">
    <div class="title">{{ model?.title }} 테스트 통계</div>
    <div class="data-wrap">
      <div class="card-wrap">
        <div class="header">
          <div class="content"></div>
          <div class="text">테스트 통계</div>
          <div class="content">
            <p>전체 정확도: {{ testStatistics?.totalAccuracy }} %</p>
            <p>전체 F-1 Score: {{ testStatistics?.totalF1Score }} %</p>
          </div>
        </div>
        <div class="chart-wrap">
          <TestingChartCard
            v-if="testStatistics"
            :data="testStatistics.accuracy"
          />
        </div>
      </div>
      <div class="card-wrap">
        <div class="header">
          <div class="content"></div>
          <div class="text">True Class</div>
          <div class="content"></div>
        </div>
        <div v-if="testStatistics" class="true-class-wrap">
          <div class="row">
            <div class="common"></div>
            <div v-for="label in testStatistics.class.labels" class="h-header">
              {{ label }}
            </div>
          </div>
          <div v-for="(r, i) in testStatistics.class.datasets" class="row">
            <div class="v-header">{{ testStatistics.class.labels[i] }}</div>
            <div v-for="(c, j) in r" class="column" :class="{ point: i === j }">
              {{ c }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.classification-statistics-page {
  width: 100%;
  height: 100vh;
  padding: 80px 70px;

  .title {
    color: $d5;
    font-size: 24px;
    font-weight: 600;
  }

  .data-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 40px;

    .card-wrap {
      &:not(:first-child) {
        padding-top: 50px;
      }
      padding-bottom: 50px;

      .true-class-wrap {
        .row {
          display: flex;
          justify-content: center;
          align-items: center;

          .common {
            width: 22px;
            height: 22px;
          }
          .h-header {
            width: 300px;
            height: 22px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 2px;
            font-weight: 600;
            font-size: 18px;
            color: $d5;
          }

          .v-header {
            width: 22px;
            height: 200px;
            margin: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            writing-mode: vertical-lr;
            text-orientation: sideways;
            transform: rotate(180deg);
            font-weight: 600;
            font-size: 18px;
            color: $d5;
          }

          .column {
            background-color: $d3;
            width: 300px;
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 2px;
            font-weight: 600;
            font-size: 18px;
            color: $d5;

            &.point {
              background-color: $point-peacook;
              color: $d1;
            }
          }
        }
      }

      .header {
        color: $d5;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 20px 0;
        .text {
          font-size: 24px;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          height: 35px;
        }

        .content {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-end;
          width: 200px;
          font-size: 18px;
        }
      }

      .chart-wrap {
        width: 800px;
      }
    }
  }
}
</style>
