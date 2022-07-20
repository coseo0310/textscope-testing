<script setup lang="ts"></script>

<template>
  <article :class="container.layout">
    <section :class="controll.layout" aria-label="Controller Section"></section>
    <section :class="viewer.layout" aria-label="Viewer Section">
      <div>
        <p>start</p>
        <p>end</p>
      </div>
    </section>
  </article>
</template>

<style lang="scss" module="container">
.layout {
  width: calc(100% - 468px);
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.24);
}
</style>

<style lang="scss" module="controll">
.layout {
  width: 100%;
  height: 64px;
  background-color: #ffffff;
  border: 1px solid $n-50;
  border-top: none;
}
</style>

<style lang="scss" module="viewer">
.layout {
  width: 100%;
  height: calc(100% - 128px);
  overflow: scroll;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 2000px;
    height: 1000px;
  }
}
</style>
