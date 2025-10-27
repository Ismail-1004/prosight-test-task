import { defineStore } from 'pinia'
import type { Ad } from "~/types/ad"


export const useAdsStore = defineStore('ads',() => {
    const ads = ref<Ad[]>([])
    const query = ref('')
    const statusFilter = ref<'all' | 'active' | 'pending' | 'completed'>('all')
    const sortOrder = ref<'asc' | 'desc'>('asc')

    async function loadAds() {
        try {
            const res = await fetch('/data.json')
            ads.value = await res.json()
        } catch (e) {
            console.log('Failed to load ads', e);
            throw e
        }
    }

    const filteredAds = computed(() => {
        let list = [...ads.value]

        if (query.value) {
            const q = query.value.toLowerCase()
            list = list.filter(
                ad =>
                    ad.title.toLowerCase().includes(q) ||
                    ad.description.toLowerCase().includes(q) ||
                    ad.author.toLowerCase().includes(q)
            )
        }

        if (statusFilter.value !== 'all') {
            list = list.filter(ad => ad.status === statusFilter.value)
        }

        list.sort((a, b) => {
            const titleA = a.title.toLowerCase()
            const titleB = b.title.toLowerCase()
            if (sortOrder.value === 'asc') return titleA.localeCompare(titleB)
            else return titleB.localeCompare(titleA)
        })

        return list
    })

    return { ads, filteredAds, query, statusFilter, sortOrder, loadAds }
})
