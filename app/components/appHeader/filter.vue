<script setup lang="ts">
import { useAdsStore } from "~/store/useAdsStore";
const store = useAdsStore();

const emit = defineEmits(["close"]);

function handleChange() {
  emit("close");
}
</script>

<template>
  <transition name="fade">
    <div
      class="absolute right-0 mt-2 bg-white border rounded-md shadow-lg p-2 z-10"
    >
      <select
        v-model="store.statusFilter"
        class="border rounded-md text-sm px-2 py-1 outline-none"
        @change="handleChange"
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
