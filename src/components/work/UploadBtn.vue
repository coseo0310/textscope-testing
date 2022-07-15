<script setup lang="ts">
import { ref } from "vue";
import Upload from "@/components/work/Upload.vue";
import { useWorkStore } from "@/store";
import { storeToRefs } from "pinia";

const workStore = useWorkStore();
const { files } = storeToRefs(workStore);
const isUpload = ref<boolean>(false);
const fileEl = ref<HTMLInputElement | null>(null);

const onModal = () => {
  isUpload.value = true;
};

const onClose = () => {
  isUpload.value = false;
  files.value = [];
};

const onUpload = () => {
  if (!fileEl.value) {
    return;
  }
  fileEl.value.click();
};

const onFiles = (e: Event) => {
  const list = fileEl.value?.files;
  if (!list) {
    return;
  }

  for (let i = 0; i < list.length; i++) {
    files.value.push(list[i]);
  }
};
</script>

<template>
  <article :class="btn.layout">
    <button :class="btn.button" type="button" @click="onModal">
      <i>
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5 2.91669C10.9603 2.91669 11.3334 3.28978 11.3334 3.75002V12.0834C11.3334 12.5436 10.9603 12.9167 10.5 12.9167C10.0398 12.9167 9.66669 12.5436 9.66669 12.0834V3.75002C9.66669 3.28978 10.0398 2.91669 10.5 2.91669Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.91077 3.16076C10.2362 2.83533 10.7638 2.83533 11.0893 3.16076L14.5615 6.63299C14.8869 6.95842 14.8869 7.48606 14.5615 7.8115C14.2361 8.13694 13.7084 8.13694 13.383 7.8115L10.5 4.92853L7.61706 7.8115C7.29163 8.13694 6.76399 8.13694 6.43855 7.8115C6.11311 7.48606 6.11311 6.95842 6.43855 6.63299L9.91077 3.16076Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5 2.91669C10.9603 2.91669 11.3334 3.28978 11.3334 3.75002V12.0834C11.3334 12.5436 10.9603 12.9167 10.5 12.9167C10.0398 12.9167 9.66669 12.5436 9.66669 12.0834V3.75002C9.66669 3.28978 10.0398 2.91669 10.5 2.91669Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.25002 11.25C4.71026 11.25 5.08335 11.6231 5.08335 12.0834V14.8611C5.08335 15.0085 5.14189 15.1498 5.24607 15.254C5.35026 15.3582 5.49157 15.4167 5.63891 15.4167H15.3611C15.5085 15.4167 15.6498 15.3582 15.754 15.254C15.8582 15.1498 15.9167 15.0085 15.9167 14.8611V12.0834C15.9167 11.6231 16.2898 11.25 16.75 11.25C17.2103 11.25 17.5834 11.6231 17.5834 12.0834V14.8611C17.5834 15.4505 17.3492 16.0157 16.9325 16.4325C16.5157 16.8492 15.9505 17.0834 15.3611 17.0834H5.63891C5.04954 17.0834 4.48431 16.8492 4.06756 16.4325C3.65081 16.0157 3.41669 15.4505 3.41669 14.8611V12.0834C3.41669 11.6231 3.78978 11.25 4.25002 11.25Z"
            fill="currentColor"
          />
        </svg>
      </i>
      <p>문서 업로드</p>
    </button>
    <Upload v-if="isUpload" :close-callback="onClose" :upload="onUpload" />
    <input
      ref="fileEl"
      type="file"
      accept="image/jpg, image/jpeg, image/png, image/tiff, image/tif, application/pdf"
      style="display: none"
      multiple
      @change="onFiles"
    />
  </article>
</template>

<style lang="scss" module="btn">
.layout {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 40px;
  border: 0;
  background-color: $m-900;
  border-radius: 4px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  cursor: pointer;

  i {
    padding-top: 3px;
  }

  p {
    padding: 0 5px;
  }
}
</style>
