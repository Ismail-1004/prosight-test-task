import type { Ad } from "~/types/ad"

const ads = ref<Ad[]>([])

export function useAds () {
    const filteredAds = computed(() => ads.value)

    async function loadAds () {
        try {
            const res = await fetch('/data.json')
            ads.value = await res.json()
        } catch (e) {
            console.log('Failed to load ads', e);
            throw e
        }
    }

    return { ads, filteredAds, loadAds }
}
