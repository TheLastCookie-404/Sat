<template>
  <div class="m-0">
    <div
      class="collapse collapse-arrow bg-base-100 shadow-sm absolute w-full z-50 rounded-b-3xl">
      <input ref="drawerInput" v-model="isDrawerOpen" type="checkbox" />
      <div class="collapse-title font-semibold">Предоставить мой QR</div>
      <div class="collapse-content text-sm">
        <slot />
      </div>
    </div>
    <div class="w-full" :style="`height: ${drawerInput?.clientHeight}px`"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from "vue";

  const drawerInput = ref<HTMLInputElement | null>();
  const isDrawerOpen = ref<boolean>(false);

  const props = defineProps<{
    onDrawerStateChange: (state: boolean) => void;
  }>();

  watch(
    () => isDrawerOpen.value,
    (isDrawerOpen) => {
      props.onDrawerStateChange(isDrawerOpen);
    }
  );
</script>
