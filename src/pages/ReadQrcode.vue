<template>
  <div>
    <ReadQr :onReadCallback="(data: string) => redirect(data)" />
  </div>
</template>

<script lang="ts" setup>
  import ReadQr from "@/components/ReadQr.vue";

  function redirect(url: string) {
    window.location.replace(url);
  }
</script>
