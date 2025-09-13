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
      <SimpleLoading class="text-2xl mx-auto animate-spin text-zinc-500" />
    </h1>
    <SimpleForm placeholder="loading..." />
    <SimpleAutoScrollText classes="border border-zinc-300 dark:border-zinc-800"
      >Loading...</SimpleAutoScrollText
    >
  </SimpleWrapper>

  <!-- error -->
  <SimpleWrapper v-else-if="error">
    <h1 class="text-wrap text-center text-xl font-bold">
      GitHub Mail for "{{ data?.username }}"
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
      GitHub Mail for
      <span class="text-cyan-600 dark:text-primary"
        >"{{ data?.username }}"</span
      >
    </h1>
    <SimpleForm :placeholder="username?.toString()" />
    <ClickToCopy />
    <div class="flex gap-2 items-center">
      <!-- github profile image-->
      <NuxtLink
        target="_blank"
        :title="`&quot;${data?.username}&quot; GitHub`"
        :to="`https://github.com/${data?.username}`"
        external
      >
        <img
          :src="data?.avatar_url"
          :alt="`&quot;${data?.username}&quot; GitHub`"
          class="aspect-square min-w-9 max-w-9 rounded-full"
        />
      </NuxtLink>

      <!-- email -->
      <SimpleAutoScrollText
        classes="border border-zinc-300 dark:border-zinc-800 overflow-mask"
        :copy-callback="handleCopy"
        >{{ data?.email }}</SimpleAutoScrollText
      >
    </div>
  </SimpleWrapper>
</template>
