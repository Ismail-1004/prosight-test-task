<template>
  <section class="home px-4 sm:px-8 lg:px-20">
    <div class="home__head mb-6 flex items-center justify-between">
      <h1 class="home__head-title text-2xl sm:text-3xl lg:text-4xl font-bold">Tasks</h1>
      <button
        class="home__head-btn text-[24px] hover:text-blue-500 transition-colors"
      >
        <Icon name="mdi:order-alphabetical-ascending" />
      </button>
    </div>

    <AdList />
  </section>
</template>
