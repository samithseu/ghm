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
      <!-- Finding email... -->
      <Icon name="svg-spinners:270-ring-with-bg" />
    </h1>
    <SimpleForm placeholder="loading..." />
    <SimpleAutoScrollText classes="border border-gray-300 dark:border-gray-900"
      >Loading...</SimpleAutoScrollText
    >
  </SimpleWrapper>

  <!-- error -->
  <SimpleWrapper v-else-if="error">
    <h1 class="text-wrap text-center text-xl font-bold">
      GitHub-Email for "{{ username }}"
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
      GitHub-Email for
      <span class="text-cyan-600 dark:text-primary">"{{ username }}"</span>
    </h1>
    <SimpleForm :placeholder="username?.toString()" />
    <small class="text-center text-gray-500 dark:text-white/40"
      >click on email to copy!</small
    >
    <div class="flex gap-2 items-center">
      <NuxtLink
        target="_blank"
        :to="`https://github.com/${data?.username}`"
        external
      >
        <img :src="data?.avatar_url" class="aspect-square w-9 rounded-full" />
      </NuxtLink>
      <SimpleAutoScrollText
        classes="w-full border border-gray-300 dark:border-gray-900"
        :copy-callback="handleCopy"
        >{{ data?.email }}</SimpleAutoScrollText
      >
    </div>
  </SimpleWrapper>
</template>
