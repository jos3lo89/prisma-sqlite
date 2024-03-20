<script setup lang="ts">
// import { RouterLink } from "vue-router";
import axiosI from "@/axios/instance";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  try {
    const res = await axiosI.post("/users/logout");
    // console.log(res);
    authStore.token = undefined;
    router.push({ name: "login" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <header class="flex justify-around bg-gray-800 py-4">
    <div>
      <h1 class="text-xl capitalize">vue ts</h1>
    </div>
    <!-- <nav class="space-x-4">
      <RouterLink class="text-xl capitalize" :to="{ name: 'home' }"
        >home</RouterLink
      >
      <RouterLink class="text-xl capitalize" :to="{ name: 'register' }"
        >register</RouterLink
      >
      <RouterLink class="text-xl capitalize" :to="{ name: 'login' }"
        >login</RouterLink
      >
     
    </nav> -->

    <div>
      <button
        v-if="authStore.token"
        @click="handleLogout()"
        class="bg-red-600 px-2 py-1 rounded-lg border-none"
      >
        Cerra Sesión
      </button>
    </div>
  </header>
</template>

<style scoped></style>
