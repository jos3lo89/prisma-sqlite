import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token: Ref<string | undefined> = ref(undefined);
    const nombreUser: Ref<string | undefined> = ref(undefined);

    return { token, nombreUser };
  },
  {
    persist: true,
  }
);
