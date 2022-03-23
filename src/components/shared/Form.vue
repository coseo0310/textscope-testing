<script setup lang="ts">
import { ref, onMounted } from "vue";
import Input from "@/components/shared/Input.vue";
import { useForm } from "@/hooks";

const { handleSubmit, register, getValues, formState } = useForm();

const onClick = () => {
  console.log(">>", getValues());
  handleSubmit(() => {});
};
</script>

<template>
  <form @submit.prevent="">
    <Input type="text" name="email" :ref="register({ required: true })" />
    <Input
      type="text"
      name="password"
      :ref="register({ required: true, minLength: 3 })"
    />
    <button :disabled="!formState.isValid" type="button" @click="onClick">
      test
    </button>
  </form>
</template>

<style lang="scss" scoped>
form {
  width: 100%;
  height: 200px;

  button {
    width: 50px;
    height: 50px;
  }
}
</style>
