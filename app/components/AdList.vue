<script setup lang="ts">
import { onMounted } from 'vue';
import { useAdsStore } from '~/store/useAdsStore';

const store = useAdsStore()

onMounted(() => store.loadAds())
</script>

<template>
    <ul class="list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ad-card v-for="ad in store.filteredAds" :key="ad.id" :ad="ad" />
    </ul>
</template>
