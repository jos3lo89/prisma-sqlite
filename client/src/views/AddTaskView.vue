<script setup lang="ts">
import axiosI from "@/axios/instance";
import { reactive } from "vue";
import { type newTaskI } from "@/types/types";
import { useRouter, useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import { string } from "zod";

const router = useRouter();
const routerParams = useRoute();

// arreglar el tipo any
const newTask: newTaskI | any = reactive({
  titulo: routerParams.params.title,
  descripcion: routerParams.params.description,
});

const handleAdd = async (): Promise<void> => {
  try {
    const res = await axiosI.post("/tareas", newTask);
    // console.log(res);
    router.push({ name: "home" });
  } catch (error: any) {
    error.response.data.message.forEach((err: string) => {
      toast.warn(err, {
        autoClose: 1500,
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
        position: toast.POSITION.BOTTOM_RIGHT,
        transition: toast.TRANSITIONS.SLIDE,
      });
    });
  }
};

const handleUpdateTask = async (id: any) => {
  try {
    const res = await axiosI.put(`/tareas/${id}`, newTask);
    // console.log(res);
    router.push({ name: "home" });
  } catch (error: any) {
    error.response.data.message.forEach((err: string) => {
      toast.warn(err, {
        autoClose: 1500,
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
  <h1 class="text-center text-2xl m-4">Agregar tarea</h1>
  <div class="flex justify-center items-center">
    <form
      @submit.prevent="
        !routerParams.params.id
          ? handleAdd()
          : handleUpdateTask(routerParams.params.id)
      "
      class="max-w-[329px] bg-gray-600 p-4 rounded-lg space-y-3 mt-5"
    >
      <input
        v-model="newTask.titulo"
        class="w-full bg-gray-800 p-1 rounded-lg outline-none"
        type="text"
        placeholder="titulo"
      />
      <textarea
        v-model="newTask.descripcion"
        class="w-full border-none outline-none rounded-lg bg-gray-800 p-2"
        rows="5"
        cols="30"
      ></textarea>
      <button
        type="submit"
        class="bg-blue-600 px-2 py-1 rounded-lg outline-none"
      >
        {{ !routerParams.params.id ? "guardar" : "actualizar" }}
      </button>
    </form>
  </div>
</template>

<style scoped></style>
