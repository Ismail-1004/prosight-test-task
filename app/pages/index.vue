<script setup lang="ts">
import { useAdsStore } from "~/store/useAdsStore";
import { storeToRefs } from "pinia";

const adsStore = useAdsStore();
const { sortOrder } = storeToRefs(adsStore);

function toggleSortOrder() {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
}
</script>

<template>
  <section class="home px-4 sm:px-8 lg:px-20">
    <div class="home__head mb-6 flex items-center justify-between">
      <h1 class="home__head-title text-2xl sm:text-3xl lg:text-4xl font-bold">
        Tasks
      </h1>
      <button
        @click="toggleSortOrder"
        class="home__head-btn text-[24px] hover:text-blue-500 transition-colors"
        :title="sortOrder === 'asc' ? 'Sort Z–A' : 'Sort A–Z'"
      >
        <Icon
          :name="
            sortOrder === 'asc'
              ? 'mdi:order-alphabetical-ascending'
              : 'mdi:order-alphabetical-descending'
          "
        />
      </button>
    </div>

    <AdList />
  </section>
</template>
