<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAdsStore } from '~/store/useAdsStore';
import type { Ad } from '~/types/ad';

const store = useAdsStore()
onMounted(() => store.loadAds())

const selectedAd = ref<Ad | null>(null)
const showModal = ref(false)

function openModal(ad: Ad) {
  selectedAd.value = ad
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedAd.value = null
}

function handleUpdate(updatedAd: Ad) {
  store.updateAd(updatedAd) 
}
</script>

<template>
    <div>
      <loader v-if="store.loading" />
  
      <ul
        v-else-if="store.filteredAds.length"
        class="list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <ad-card
          v-for="ad in store.filteredAds"
          :key="ad.id"
          :ad="ad"
          @open-modal="openModal"
        />
      </ul>
  
      <p v-else class="text-gray-500 text-center">
        Tasks not found
      </p>
  
      <AdModal
        :ad="selectedAd"
        :show="showModal"
        @close="closeModal"
        @update="handleUpdate"
      />
    </div>
  </template>
  
