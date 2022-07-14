<script setup lang="ts">
import { ref } from "vue";

export interface Item {
  id: string;
  text: string;
}

interface Props {
  uid: string;
  items: Item[];
  placeholder: string;
  default?: Item[];
}

const props = defineProps<Props>();

const emits = defineEmits<{ (e: "selected", item: Item[]): void }>();

const list = ref<Item[]>(props.items);
const term = ref<string>("");
const badges = ref<Item[]>(props.default || []);
const isList = ref<boolean>(false);

const onKeyup = (e: KeyboardEvent) => {
  isList.value = true;
  if (!term.value) {
    list.value = props.items.filter(
      (f) => !badges.value.some((s) => s.id === f.id)
    );
  } else {
    list.value = props.items.filter(
      (f) =>
        f.text.includes(term.value) && !badges.value.some((s) => s.id === f.id)
    );
  }
};

const onFocus = () => {
  isList.value = true;
};

const onSelect = (item: Item) => {
  isList.value = false;
  term.value = "";
  badges.value = [...badges.value, item];
  list.value = props.items.filter(
    (f) => !badges.value.some((s) => s.id === f.id)
  );

  emits("selected", badges.value);
};

const onLeave = () => {
  isList.value = false;
};

const onDelete = (item: Item) => {
  badges.value = badges.value.filter((f) => f.id !== item.id);
  emits("selected", badges.value);
};
</script>

<template>
  <article class="selector" :class="layout.container" @mouseleave="onLeave">
    <section :class="search.section" aria-label="검색 영역">
      <input
        :class="search.input"
        type="text"
        name="search"
        :placeholder="props.placeholder"
        v-model="term"
        @keyup="onKeyup"
        @focus="onFocus"
      />
      <div :class="search.icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" fill="white" fill-opacity="0.01" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.29207 10.2929C8.10526 10.4818 8.00049 10.7368 8.00049 11.0024C8.00049 11.2681 8.10526 11.523 8.29207 11.7119L11.2311 14.6769C11.4491 14.8919 11.7311 14.9989 12.0101 14.9989C12.2891 14.9989 12.5661 14.8919 12.7791 14.6769L15.7091 11.7219C15.8956 11.5329 16.0002 11.278 16.0002 11.0124C16.0002 10.7469 15.8956 10.492 15.7091 10.3029C15.6172 10.2098 15.5078 10.1358 15.3871 10.0853C15.2664 10.0347 15.1369 10.0087 15.0061 10.0087C14.8752 10.0087 14.7457 10.0347 14.625 10.0853C14.5043 10.1358 14.3949 10.2098 14.3031 10.3029L12.0051 12.6199L9.69807 10.2929C9.60603 10.2001 9.49652 10.1264 9.37586 10.0762C9.25521 10.0259 9.12578 10 8.99507 10C8.86435 10 8.73493 10.0259 8.61427 10.0762C8.49361 10.1264 8.38411 10.2001 8.29207 10.2929Z"
            fill="#42526E"
          />
        </svg>
      </div>
      <div v-if="isList" :class="{ [search.list]: true, [props.uid]: true }">
        <p v-for="item in list" :class="search.item" @click="onSelect(item)">
          {{ item.text }}
        </p>
      </div>
    </section>
    <section :class="badge.section" aria-label="뱃지 여역">
      <div v-for="b in badges" :class="badge.item">
        <p>{{ b.text }}</p>
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="onDelete(b)"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.80474 0.195262C8.06509 0.455612 8.06509 0.877722 7.80474 1.13807L1.13807 7.80474C0.877722 8.06509 0.455612 8.06509 0.195262 7.80474C-0.0650874 7.54439 -0.0650874 7.12228 0.195262 6.86193L6.86193 0.195262C7.12228 -0.0650874 7.54439 -0.0650874 7.80474 0.195262Z"
            fill="#1B1B1B"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.195262 0.195262C0.455612 -0.0650874 0.877722 -0.0650874 1.13807 0.195262L7.80474 6.86193C8.06509 7.12228 8.06509 7.54439 7.80474 7.80474C7.54439 8.06509 7.12228 8.06509 6.86193 7.80474L0.195262 1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262 0.195262Z"
            fill="#1B1B1B"
          />
        </svg>
      </div>
    </section>
  </article>
</template>

<style lang="scss" module="layout">
.container {
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss" module="search">
.section {
  position: relative;
}

.input {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #dfe1e6;
  background-color: #ffffff;
  border-radius: 4px;
  outline: none;

  &::placeholder {
    color: #7a869a;
    font-size: 14px;
    font-weight: 400;
  }
}

.icon {
  position: absolute;
  top: -1px;
  right: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.list {
  width: 100%;
  max-height: 100px;
  overflow-y: scroll;
  position: absolute;
  top: 30px;
  padding: 10px 0;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0px 10px 18px rgba(9, 30, 66, 0.15),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  z-index: 2;
}

.item {
  padding: 10px;
  cursor: pointer;
  color: #7a869a;
  font-size: 14px;
  font-weight: 400;

  &:hover {
    background-color: #1b1b1b;
    color: #ffffff;
  }
}
</style>

<style lang="scss" module="badge">
.section {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin: 2px;
  padding: 5px 8px;
  background-color: #ebecf0;

  p {
    color: #1b1b1b;
    font-size: 12px;
    font-weight: 500;
    padding: 0 5px;
  }

  svg {
    cursor: pointer;
  }
}
</style>
