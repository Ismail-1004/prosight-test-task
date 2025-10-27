<template>
  <header class="header py-3 border-b border-gray-200">
    <nav class="header__nav flex items-center justify-between">
      <NuxtLink to="/" class="header__nav-logo flex items-center gap-2">
        <Icon
          name="material-symbols-light:check-circle-outline"
          class="text-green-500 text-[28px]"
        />
        <span class="font-bold text-[22px]">Task Flow</span>
      </NuxtLink>

      <form class="header__nav-form w-full max-w-[300px] sm:max-w-[400px]">
        <div class="header__nav-field flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            class="header__nav-input w-full border outline-none px-2 py-1 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            aria-label="Search"
            class="header__nav-search bg-slate-200 hover:bg-slate-300 flex items-center justify-center px-2 py-1 text-[22px] rounded-md transition"
          >
            <Icon name="material-symbols-light:search" />
          </button>

          <button
            type="button"
            aria-label="Filter"
            class="header__nav-filter bg-slate-200 hover:bg-slate-300 flex items-center justify-center px-2 py-1 text-[22px] rounded-md transition"
          >
            <Icon name="material-symbols-light:filter-list" />
          </button>
        </div>
      </form>
    </nav>
  </header>
</template>
  