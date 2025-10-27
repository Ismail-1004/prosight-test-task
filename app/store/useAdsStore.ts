import { defineStore } from 'pinia'
import localforage from 'localforage'
import type { Ad } from "~/types/ad"
import { generateFakeAd } from '~/utils/generateAd'


export const useAdsStore = defineStore('ads', () => {
    const loading = ref(false)
    const ads = ref<Ad[]>([])
    const query = ref('')
    const statusFilter = ref<'all' | 'active' | 'pending' | 'completed'>('all')
    const sortOrder = ref<'asc' | 'desc'>('asc')

    const STORAGE_KEY = 'ads_data'

    localforage.config({
        name: 'task-flow-app',
        storeName: 'ads',
        description: 'Local storage for ads/tasks'
    })

    async function saveToLocal() {
        const plainAds = JSON.parse(JSON.stringify(ads.value))
        await localforage.setItem(STORAGE_KEY, plainAds)
    }

    async function loadAds() {
        loading.value = true
        const storedAds = await localforage.getItem<Ad[]>(STORAGE_KEY)

        if (!navigator.onLine) {
            ads.value = storedAds || []
            loading.value = false
            return
        }

        if (storedAds && storedAds.length) {
            ads.value = storedAds
        } else {
            try {
                const res = await fetch('/data.json')
                ads.value = await res.json()
            } catch (e) {
                console.log('Failed to load ads', e)
            }
            await saveToLocal()
        }
        loading.value = false
    }

    async function updateAd(updatedAd: Ad) {
        const index = ads.value.findIndex(ad => ad.id === updatedAd.id)
        if (index !== -1) {
            ads.value.splice(index, 1, { ...updatedAd })
            await saveToLocal()
        }
    }

    async function generateAds(count: number) {
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
        await saveToLocal()
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
