<script setup lang="ts">
import { reactive } from "vue";
import { type registeUserI } from "@/types/types";
import axiosI from "@/axios/instance";
import { RouterLink } from 'vue-router';

const newUser: registeUserI = reactive({
  nombre: "",
  apellido: "",
  correo: "",
  clave: "",
});

const handleRegister = async () => {
  try {
    const res = await axiosI.post("/users", newUser);
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="">
    <h1 class="text-center py-5 text-2xl capitalize">Registrate</h1>
    <form
      @submit.prevent="handleRegister()"
      class="flex flex-col space-y-3 justify-center items-center"
    >
      <input
        v-model="newUser.nombre"
        class="bg-indigo-900 py-1 px-2 rounded-lg outline-none"
        type="text"
        placeholder="Nombre"
      />
      <input
        v-model="newUser.apellido"
        class="bg-indigo-900 py-1 px-2 rounded-lg outline-none"
        type="text"
        placeholder="Apellido"
      />
      <input
        v-model="newUser.correo"
        class="bg-indigo-900 py-1 px-2 rounded-lg outline-none"
        type="email"
        placeholder="Correo Electronico"
      />
      <input
        v-model="newUser.clave"
        class="bg-indigo-900 py-1 px-2 rounded-lg outline-none"
        type="password"
        placeholder="Contraseña"
      />
      <button
        type="submit"
        class="bg-blue-600 py-1 px-2 rounded-lg border-none outline-none"
      >
        Registrar
      </button>
    </form>
    <div class="text-center m-4">
      <p>
        ¿Ya tienes una cuenta? 
        <RouterLink :to="{ name: 'login' }" class="text-blue-600">Inicia sesión</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
