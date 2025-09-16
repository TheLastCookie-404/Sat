<template>
  <div class="m-0">
    <div
      class="collapse collapse-arrow bg-base-100 shadow-sm absolute w-full z-50 rounded-b-3xl">
      <input
        ref="drawerInput"
        v-model="isDrawerOpen"
        type="checkbox"
        class="mt-5" />
      <div
        class="collapse-title font-semibold mt-5 text-center text-base-content/80">
        *предъявить мой QR
      </div>
      <div class="collapse-content text-sm">
        <slot />
      </div>
    </div>

    <div
      class="w-full mb-5"
      :style="`height: ${drawerInput?.clientHeight}px`"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from "vue";
  import { useElementSize } from "@vueuse/core";

  const drawerInput = ref<HTMLInputElement | null>();
  const isDrawerOpen = ref<boolean>(false);
  const { height } = useElementSize(drawerInput);

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
