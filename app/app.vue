<template>
  <div
    class="bg-white dark:bg-dark w-full min-h-dvh flex flex-col justify-center items-center px-4 sm:px-0 relative"
  >
    <NuxtPage />
    <footer
      class="text-gray-500 dark:text-white/40 absolute bottom-0 left-0 py-2 w-full flex justify-center items-center *:hover:text-black *:dark:hover:text-white *:hover:underline *:text-sm *:flex *:items-center *:gap-1"
    >
      <NuxtLink
        target="_blank"
        title="Source (GitHub)"
        to="https://github.com/samithseu/ghm/"
      >
        <Icon size="18" name="lineicons:code-1" />
        source
      </NuxtLink>
    </footer>
  </div>
</template>
