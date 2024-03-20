<script setup lang="ts">
import { reactive } from "vue";
import axiosI from "@/axios/instance";
import { type loginDataI } from "@/types/types";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "vue3-toastify";

const router = useRouter();
const authStore = useAuthStore();

const loginData: loginDataI = reactive({
  correo: "",
  clave: "",
});

const handleLogin = async () => {
  try {
    const res = await axiosI.post("/users/login", loginData);
    authStore.token = res.data.token;
    authStore.nombreUser = res.data.nombre;
    router.push({ name: "home" });
  } catch (error: any) {
    error.response.data.message.forEach((err: string) => {
      toast.warn(err, {
        autoClose: 4000,
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
        position: toast.POSITION.BOTTOM_RIGHT,
        transition: toast.TRANSITIONS.SLIDE,
      });
    });
  }
};
</script>

<template>
  <div class="">
    <h1 class="text-center py-5 text-2xl capitalize">Iniciar Sesión</h1>
    <form
      @submit.prevent="handleLogin()"
      class="flex flex-col space-y-3 justify-center items-center"
    >
      <input
        class="bg-indigo-900 py-1 px-2 rounded-lg outline-none"
        v-model="loginData.correo"
        type="email"
        placeholder="Correo Electronico"
      />
      <input
        class="bg-indigo-900 py-1 px-2 rounded-lg outline-none"
        v-model="loginData.clave"
        type="password"
        placeholder="Contraseña"
      />
      <button
        type="submit"
        class="bg-blue-600 py-1 px-2 rounded-lg border-none outline-none"
      >
        Ingresar
      </button>
    </form>
    <div class="text-center m-4">
      <p>
        ¿No tienes una cuenata?
        <RouterLink :to="{ name: 'register' }" class="text-blue-600"
          >Registrarte</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<style scoped></style>
