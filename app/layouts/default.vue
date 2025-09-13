<template>
  <div
    class="bg-white dark:bg-dark w-full min-h-dvh flex flex-col justify-center items-center px-4 sm:px-0 relative"
  >
    <slot />
    <footer
      class="text-gray-500 dark:text-white/40 absolute bottom-0 left-0 py-2 w-full flex justify-center items-center *:hover:text-black *:dark:hover:text-white *:hover:underline *:text-sm"
    >
      <NuxtLink title="source code" to="https://github.com/samithseu/ghm/"
        >source
      </NuxtLink>
      &nbsp;&middot;&nbsp;
      <NuxtLink
        class="flex items-center gap-1"
        title="Nuxt.js"
        to="https://nuxt.com"
        >made with <Icon size="18" name="lineicons:nuxt" />
      </NuxtLink>
      &nbsp;&middot;&nbsp;
      <NuxtLink title="@samithseu" to="https://github.com/samithseu">
        by @samithseu
      </NuxtLink>
    </footer>
  </div>
</template>
