<script setup lang="ts">
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
    authStore.nombreUser = undefined;

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

    <div class="flex space-x-3">
      <p class="text-xl capitalize">
        {{ authStore.nombreUser === undefined ? "" : authStore.nombreUser }}
      </p>
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
