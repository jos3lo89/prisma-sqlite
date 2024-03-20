<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <NavBar></NavBar>
  <section>
    <slot name="mainSlot"></slot>
  </section>
</template>

<style scoped></style>
