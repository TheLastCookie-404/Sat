<template>
  <div class="navbar bg-base-200 h-20">
    <ul class="flex w-full flex-shrink justify-evenly gap-3 px-1">
      <li v-for="elem in links" :key="elem.iconName">
        <RouterLink :to="elem.routePath">
          <div class="m-auto w-fit">
            <Icon :name="elem.iconName" class="text-2xl" />
          </div>
        </RouterLink>
        <div class="text-xs leading-1.5">{{ elem.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    links: {
      routePath: string;
      iconName?: string;
      title: string;
    }[];
  }>();
</script>
