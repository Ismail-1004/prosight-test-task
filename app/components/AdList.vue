<script setup lang="ts">
import { onMounted } from 'vue';
import { useAds } from '~/composables/useAds';

const { ads, loadAds } = useAds()

onMounted(() => {
    loadAds()
})
</script>

<template>
    <ul class="list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ad-card v-for="ad in ads" :key="ad.id" :ad="ad" />
    </ul>
</template>
