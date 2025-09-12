<script lang="ts" setup>
const { username } = useRoute("username").params;

const { data, pending, error } = await useLazyFetch(
  () => `/api/mail/${username}`
);

useGHMSEO({
  title: `${defaultSeo.title} - "${username}"`,
  description: `${data.value?.email}`,
});

const handleCopy = () => {
  if (data.value?.email) {
    navigator.clipboard.writeText(data.value.email);
  }
};
</script>

<template>
  <!-- loading skeleton -->
  <SimpleWrapper v-if="pending">
    <h1 class="text-wrap text-center text-xl font-bold">
      <Icon name="svg-spinners:270-ring-with-bg" />
    </h1>
    <SimpleForm placeholder="loading..." />
    <SimpleAutoScrollText classes="border border-zinc-300 dark:border-zinc-800"
      >Loading...</SimpleAutoScrollText
    >
  </SimpleWrapper>

  <!-- error -->
  <SimpleWrapper v-else-if="error">
    <h1 class="text-wrap text-center text-xl font-bold">
      GitHub-Mail for "{{ username }}"
    </h1>
    <SimpleForm :placeholder="username?.toString()" />
    <SimpleAutoScrollText classes="border border-red-500 cursor-not-allowed"
      >{{ error?.statusCode }} -
      {{ error?.statusMessage }}</SimpleAutoScrollText
    >
  </SimpleWrapper>

  <!-- success - email -->
  <SimpleWrapper v-else>
    <h1 class="text-wrap text-center text-xl font-bold">
      GitHub-Mail for
      <span class="text-cyan-600 dark:text-primary">"{{ username }}"</span>
    </h1>
    <SimpleForm :placeholder="username?.toString()" />
    <small
      class="text-center text-gray-500 dark:text-white/40 md:flex md:items-center md:justify-center md:gap-1"
      >click on email to copy
      <Icon class="!h-[10px] md:!size-[14px]" name="lucide:copy"
    /></small>
    <div class="flex gap-2 items-center">
      <!-- github profile image-->
      <NuxtLink
        target="_blank"
        :title="`GitHub profile for ${data?.username}`"
        :to="`https://github.com/${data?.username}`"
        external
      >
        <img :src="data?.avatar_url" class="aspect-square w-9 rounded-full" />
      </NuxtLink>

      <!-- email -->
      <SimpleAutoScrollText
        classes="w-full border border-zinc-300 dark:border-zinc-800"
        :copy-callback="handleCopy"
        >{{ data?.email }}</SimpleAutoScrollText
      >
    </div>
  </SimpleWrapper>
</template>
