<script setup lang="ts">
import axiosI from "@/axios/instance";
import { onMounted, ref, type Ref } from "vue";
import { type tareasI } from "@/types/types";
import { useRouter } from "vue-router";

const router = useRouter();
const tareas: Ref<tareasI[]> = ref([]);

const askTask = async (): Promise<void> => {
  try {
    const res = await axiosI.get("/tareas");
    // console.log(res);
    tareas.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  askTask();
});

const handleDeleteTask = async (id: String): Promise<void> => {
  try {
    const res = await axiosI.delete(`/tareas/${id}`);
    // console.log(res);
    askTask();
  } catch (error) {
    console.log(error);
  }
};

const handleAddTask = (): void => {
  router.push({ name: "task" });
};

// hacer con componentes dinamicos

const handleUpdateTask = (title: string, description: string, id: string): void => {
  router.push({
    name: "task",
    params: {
      title: title,
      description: description,
      id: id
    },
  });
};
</script>

<template>
  <h1 class="text-center my-4 text-2xl">Lista de tareas</h1>
  <div>
    <button
      @click="handleAddTask()"
      class="bg-blue-600 py-1 px-2 rounded-lg border-none ml-10 mb-4"
    >
      Agregar tareas
    </button>
  </div>
  <main class="flex flex-wrap items-center justify-center">
    <div
      v-for="(tarea, i) in tareas"
      :key="i"
      class="bg-zinc-800 p-4 rounded-lg m-2"
    >
      <div>
        <p><span class="text-orange-600">Titulo: </span> {{ tarea.titulo }}</p>
        <p>
          <span class="text-orange-600">descripción: </span>
          {{ tarea.descripcion }}
        </p>
      </div>
      <div>
        <button
          @click="handleUpdateTask(tarea.titulo, tarea.descripcion, tarea.id)"
          class="bg-yellow-600 py-1 px-2 rounded-lg border-none mt-2 mx-2"
        >
          Editar
        </button>
        <button
          @click="handleDeleteTask(tarea.id)"
          class="bg-red-600 py-1 px-2 rounded-lg border-none mt-2 mx-2"
        >
          Borrar
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
