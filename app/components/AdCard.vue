<script setup lang="ts">
import type { Ad } from "~/types/ad";

defineProps<{
  ad: Ad;
}>();

const emit = defineEmits<{
  (e: 'open-modal', ad: Ad): void
}>()
</script>

<template>
  <li
    class="card w-full p-4 border rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-shadow duration-300 cursor-pointer"
    @click="emit('open-modal', ad)"
  >
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-bold mb-2 truncate">{{ ad.title }}</h2>
      <span
        class="text-[12px] bg-green-300 px-[5px] py-[3px] rounded-md"
        :class="{
          'bg-green-300': ad.status === 'completed',
          'bg-yellow-300': ad.status === 'pending',
          'bg-red-300': ad.status === 'active',
        }"
      >
        {{ ad.status }}
      </span>
    </div>

    <div class="flex items-center gap-3">
      <div
        class="w-[40px] h-[40px] rounded-full bg-gray-800 flex-shrink-0"
      ></div>
      <div>
        <p class="text-sm text-gray-700 font-medium">{{ ad.author }}</p>
        <span class="text-xs text-gray-500">{{ ad.timeAgo }}</span>
      </div>
    </div>
  </li>
</template>
  