import { defineStore } from 'pinia'
import type { Ad } from "~/types/ad"
import { generateFakeAd } from '~/utils/generateAd'


export const useAdsStore = defineStore('ads', () => {
    const loading = ref(false)
    const ads = ref<Ad[]>([])
    const query = ref('')
    const statusFilter = ref<'all' | 'active' | 'pending' | 'completed'>('all')
    const sortOrder = ref<'asc' | 'desc'>('asc')

    async function loadAds() {
        try {
            loading.value = true

            const res = await fetch('/data.json')
            ads.value = await res.json()
        
            loading.value = false
        } catch (e) {
            console.log('Failed to load ads', e);
            throw e
        }
    }

    function updateAd(updatedAd: Ad) {
        const index = ads.value.findIndex(ad => ad.id === updatedAd.id)
        if (index !== -1) {
            ads.value[index] = { ...updatedAd }
        }
    }

    async function generateAds (count: number) {
        loading.value = true
        await new Promise(resolve => setTimeout(resolve, 1000))

        const newAds: Ad[] = []
        for (let i = 0; i <= count; i++) {
            let ad: Ad
            do {
                ad = generateFakeAd()
            } while (ads.value.some(a => a.id === ad.id)) 

            newAds.push(ad)
        }

        ads.value.unshift(...newAds)
        loading.value = false
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

    return { ads, filteredAds, query, statusFilter, sortOrder, loading, loadAds, updateAd, generateAds }
})
