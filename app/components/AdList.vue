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
        <ul class="list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ad-card v-for="ad in store.filteredAds" :key="ad.id" :ad="ad" @open-modal="openModal" />
        </ul>

        <AdModal :ad="selectedAd" :show="showModal" @close="closeModal" @update="handleUpdate" />
    </div>
</template>
