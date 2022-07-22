<script setup lang="ts">
import { ref } from "vue";

export interface Item {
  id: string;
  text: string;
  extend: boolean;
  children?: Item[];
}

export interface Team {
  id: string;
  text: string;
  list: Item[];
}

interface Props {
  teams: Team[];
  currentId?: string;
}

interface Emits {
  (e: "selected", t: Item): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const data = ref<Team[]>(props.teams);
const currentId = ref<string>(props.currentId || "");

const onExtend = (item: Item) => {
  item.extend = !item.extend;
};

const onSelected = (item: Item) => {
  currentId.value = item.id;
  emits("selected", item);
  console.log(item.id);
};
</script>

<template>
  <article :class="container.layout">
    <section v-for="(team, idx) in data" :class="list.layout">
      <p :class="list.title">{{ team.text }}</p>
      <ul v-for="t in team.list" :class="list.box">
        <p :class="list.box_title">
          <i @click="onExtend(t)">
            <svg
              v-if="t.extend"
              width="8"
              height="5"
              viewBox="0 0 8 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L4 2.58579L6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893C8.09763 0.683417 8.09763 1.31658 7.70711 1.70711L4.70711 4.70711C4.31658 5.09763 3.68342 5.09763 3.29289 4.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                fill="#5E5E5E"
              />
            </svg>
            <svg
              v-else
              width="5"
              height="8"
              viewBox="0 0 5 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.292893 7.70711C-0.0976311 7.31658 -0.0976312 6.68342 0.292893 6.29289L2.58579 4L0.292893 1.70711C-0.0976314 1.31658 -0.0976314 0.683417 0.292893 0.292893C0.683417 -0.0976305 1.31658 -0.0976306 1.70711 0.292893L4.70711 3.29289C5.09763 3.68342 5.09763 4.31658 4.70711 4.70711L1.70711 7.70711C1.31658 8.09763 0.683418 8.09763 0.292893 7.70711Z"
                fill="#7C7C7C"
              />
            </svg>
          </i>
          {{ t.text }}
        </p>
        <template v-if="t.extend">
          <li
            v-for="c in t.children"
            :class="{
              [list.children]: true,
              [list.selected]: c.id === currentId,
            }"
            @click="onSelected(c)"
          >
            {{ c.text }}
          </li>
        </template>
      </ul>
      <div v-if="props.teams.length !== idx + 1" :class="list.divider"></div>
    </section>
  </article>
</template>

<style lang="scss" module="container">
.layout {
  width: 252px;
  height: calc(100% - 95px);
  padding: 28px;
  background-color: #ffffff;
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 3px;
  margin-left: 12px;
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
}
</style>

<style lang="scss" module="list">
.layout {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 12px;
  font-weight: 600;
  color: $m-800;
  padding-top: 15px;
  padding-bottom: 4px;
}

.box {
  padding: 0;
}

.box_title {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  font-weight: 500;
  font-size: 14px;
  color: $m-500;
  padding: 0 10px;

  i {
    margin-right: 5px;
    margin-bottom: 2px;
  }
}

.children {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 30px;
  font-weight: 500;
  font-size: 14px;
  color: $m-800;
  cursor: pointer;
}
.selected {
  background-color: $n-30;
  border-radius: 3px;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: $n-30;
}
</style>
