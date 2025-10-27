<script setup lang="ts">
import { ref } from "vue";
import { useAdsStore } from "~/store/useAdsStore";

const store = useAdsStore();
const showFilter = ref(false);

function toggleFilter() {
  showFilter.value = !showFilter.value;
}
</script>

<template>
  <form
    class="header__nav-form w-full max-w-[300px] sm:max-w-[400px] relative"
    @submit.prevent
  >
    <div class="header__nav-field flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        class="header__nav-input w-full border outline-none px-2 py-1 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
        v-model="store.query"
      />

      <button
        type="button"
        aria-label="Filter"
        class="header__nav-filter bg-slate-200 hover:bg-slate-300 flex items-center justify-center px-2 py-1 text-[22px] rounded-md transition"
        @click="toggleFilter"
      >
        <Icon name="material-symbols-light:filter-list" />
      </button>
    </div>

    <app-header-filter v-if="showFilter" @close="showFilter = false"/>
  </form>
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
  