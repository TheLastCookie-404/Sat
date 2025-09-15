<template>
  <div>
    <component
      :is="$route.meta.layout || 'div'"
      class="fixed top-0 left-0 z-10 size-full">
      <RouterView />
    </component>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import { RouterView } from "vue-router";
  import { useScreenOrientation } from "@vueuse/core";

  const { lockOrientation } = useScreenOrientation();

  onMounted(() => {
    lockOrientation("portrait");
  });
</script>
