<script lang="ts" setup>
useGHMSEO({
  title: `${defaultSeo.title} - Home`,
  description: defaultSeo.desc,
});
</script>

<template>
  <SimpleWrapper>
    <h1 class="text-wrap text-center text-xl font-bold">
      GitHub Email by username!
    </h1>
    <SimpleForm autofocus />
  </SimpleWrapper>
</template>
