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
      <div class="flex items-center gap-5">
        <h1 class="home__head-title text-2xl sm:text-3xl lg:text-4xl font-bold">
          Tasks
        </h1>
        <button
          class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-600 hover:shadow-md active:bg-blue-700 duration-200"
          @click="adsStore.generateAds(5)"
        >
          Generate Ads
        </button>
      </div>
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
