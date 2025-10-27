<script setup lang="ts">
import { reactive, watch } from "vue";
import type { Ad } from "~/types/ad";

const props = defineProps<{
  ad: Ad | null;
  show: boolean;
}>();

const emit = defineEmits(["close", "update"]);

const localAd = reactive<Ad>({
  id: "",
  title: "",
  description: "",
  author: "",
  status: "active",
  timeAgo: "",
  comment: [],
});

watch(
  () => props.ad,
  (newAd) => {
    if (newAd) {
      localAd.id = newAd.id;
      localAd.title = newAd.title;
      localAd.description = newAd.description;
      localAd.author = newAd.author;
      localAd.status = newAd.status;
      localAd.timeAgo = newAd.timeAgo;
      localAd.comment = Array.isArray(newAd.comment) ? [...newAd.comment] : [];
    }
  },
  { immediate: true }
);

function saveChanges() {
  emit("update", { ...localAd });
  emit("close");
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="emit('close')"
    >
      <div class="bg-white rounded-xl shadow-xl w-[90%] max-w-lg p-6 relative">
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl"
          @click="emit('close')"
        >
          ×
        </button>

        <h2 class="text-2xl font-bold mb-2">Редактировать задачу</h2>

        <label class="block mb-2 text-sm font-medium">Название</label>
        <input
          v-model="localAd.title"
          type="text"
          class="w-full border rounded-md px-2 py-1 mb-4 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label class="block mb-2 text-sm font-medium">Описание</label>
        <textarea
          v-model="localAd.description"
          class="w-full border rounded-md px-2 py-1 mb-4 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label class="block mb-2 text-sm font-medium">Статус</label>
        <select
          v-model="localAd.status"
          class="w-full border rounded-md px-2 py-1 mb-4 outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <div class="flex justify-end gap-2">
          <button
            class="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
            @click="emit('close')"
          >
            Отмена
          </button>
          <button
            class="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
            @click="saveChanges"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
