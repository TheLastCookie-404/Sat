<template>
  <div v-if="accessToken" class="size-full flex flex-col">
    <div class="h-5"></div>
    <Header linkLabel="Назад" link="/profile" />
    <ReadQr
      :onReadCallback="(data: string) => redirect(data)"
      class="size-full bg-black" />
    <div class="p-3 bg-base-100">
      <RouterLink to="/transaction">
        <div class="w-fit link m-auto">Ввести иин вручную</div>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Header from "@/components/Header.vue";
  import ReadQr from "@/components/ReadQr.vue";
  import { onMounted } from "vue";
  import { useLocalStorage } from "@vueuse/core";
  import { router } from "@/router/router";

  const accessToken = useLocalStorage<string>("AccessToken", "");

  onMounted(() => {
    if (!accessToken.value) {
      router.push("/login");
    }
  });

  function redirect(url: string) {
    window.location.replace(url);
  }
</script>
