<template>
  <div class="size-full flex flex-col">
    <Header linkLabel="Go Back" link="/profile" />
    <ReadQr
      :onReadCallback="(data: string) => redirect(data)"
      class="size-full bg-black" />
    <!-- <div class="h-20 bg-base-100"></div> -->
  </div>
</template>

<script lang="ts" setup>
  import Header from "@/components/Header.vue";
  import ReadQr from "@/components/ReadQr.vue";

  function redirect(url: string) {
    window.location.replace(url);
  }
</script>
