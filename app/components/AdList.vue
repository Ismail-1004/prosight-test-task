<template>
    <ul class="list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ad-card v-for="card in 8" :key="card" />
    </ul>
</template>
