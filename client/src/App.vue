<script setup lang="ts">
import { RouterView } from "vue-router";
import MainLayout from "./layout/MainLayout.vue";
</script>

<template>
  <MainLayout>
    <template v-slot:mainSlot>
      <RouterView />
    </template>
  </MainLayout>
</template>

<style scoped></style>
