<script setup lang="ts">
import InspectorCard from "@/components/dashboard/InspectorCard.vue";
import WorkCard from "@/components/dashboard/WorkCard.vue";
import RecognizeAccuracyCard from "@/components/dashboard/InspectorCard.vue";
import ModelCard from "@/components/dashboard/ModelCard.vue";
import ModelAccuracyCard from "@/components/dashboard/ModelAccuracyCard.vue";
import UseCard from "@/components/dashboard/UseCard.vue";
import ErrorCard from "@/components/dashboard/ErrorCard.vue";
import SearchCard from "@/components/dashboard/SearchCard.vue";
import NavCard from "@/components/dashboard/NavCard.vue";
</script>

<template>
  <main :class="main.layout">
    <div :class="main.card_layout">
      <aside>
        <InspectorCard class="card" />
        <WorkCard class="card" />
        <UseCard class="card" />
        <ModelCard class="card" />
        <ModelAccuracyCard class="card" />
        <RecognizeAccuracyCard class="card" />
        <ErrorCard class="card" />
      </aside>
      <nav>
        <NavCard />
        <SearchCard />
      </nav>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.card {
  &:not(:first-child) {
    margin-top: 12px;
  }
}
</style>

<style lang="scss" module="main">
.layout {
  width: calc(100vw - 200px);
  height: 100vh;
  padding: 32px;
}

.card_layout {
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }

  aside {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  nav {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
  }
}
</style>
