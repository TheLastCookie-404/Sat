<template>
  <div>
    <div class="relative h-full">
      <div class="no-scrollbar flex h-full flex-col overflow-scroll">
        <Header />
        <slot />
        <div class="fixed bottom-0 left-0 z-10 w-full">
          <Navbar :links="navigation" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Navbar from "@/components/Navbar.vue";

  const navigation = [
    {
      routePath: "/home",
      // iconName: "ph:house",
      title: "Главная",
    },
    {
      routePath: "/schedule",
      // iconName: "ph:newspaper",
      title: "Распис. и ДЗ",
    },
    {
      routePath: "/tests",
      // iconName: "ph:exam",
      title: "Тесты",
    },
    {
      routePath: "/events",
      // iconName: "ph:notification",
      title: "События",
    },
  ];
</script>

<style></style>
