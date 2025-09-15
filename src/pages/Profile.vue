<template>
  <div v-if="accessToken || true" class="size-full flex flex-col">
    <TopDrawer :onDrawerStateChange="(state) => (isDrawerOpen = state)">
      <div class="m-auto size-fit py-7 flex flex-col gap-3 items-center">
        <QrcodeVue
          v-if="qrCode"
          :value="qrCode"
          :size="150"
          level="H"
          render-as="svg"
          class="m-3" />
        <div
          v-else
          class="size-24 loading loading-dots loading-md text-base-content/50"></div>
        <div>Сканируйте, чтобы совершить перевод</div>
      </div>
    </TopDrawer>

    <div class="size-full p-3 flex flex-col relative overflow-hidden">
      <Transition>
        <div
          v-if="isDrawerOpen"
          class="absolute left-0 top-0 size-full bg-black/25 z-40" />
      </Transition>

      <div class="card card-sm card-border bg-base-200 border-base-300">
        <div class="card-body gap-1">
          <!-- <div class="card-title">
            <div>Следующий урок:</div>
            <div class="text-success">Математика</div>
          </div> -->
          <div class="text-lg">
            <p class="space-x-2">
              <span class="font-medium">ИИН</span>
              <span class="text-base-content/75">** ** ** *** ***</span>
            </p>
            <p class="space-x-2">
              <span class="font-medium">Имя</span>
              <span class="text-base-content/75">Василий</span>
            </p>
            <p class="space-x-2">
              <span class="font-medium">Фамилия</span>
              <span class="text-base-content/75">Чикичипеньтьев</span>
            </p>
          </div>
        </div>
      </div>
      <!-- <button class="btn btn-block font-normal">Предъявить Мой QR</button> -->

      <div class="w-full flex justify-center mt-auto p-3">
        <RouterLink to="/readqr" class="btn size-fit btn-circle btn-info">
          <svg
            class="size-12 p-1.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M5 11h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2m0-6h4v4H5zm0 16h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2m0-6h4v4H5zm8-10v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2m6 4h-4V5h4zm2 11.5v-1c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5v1c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5m-8-7v1c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5m3.5 1.5h-1c-.28 0-.5.22-.5.5v1c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5M13 17.5v1c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5m2.5 3.5h1c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5v1c0 .28.22.5.5.5m2-2h1c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5v1c0 .28.22.5.5.5m1-6h-1c-.28 0-.5.22-.5.5v1c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5m1 4h1c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5v1c0 .28.22.5.5.5" />
          </svg>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeMount, ref } from "vue";
  import { useLocalStorage } from "@vueuse/core";
  import { router } from "@/router/router";
  import axios from "axios";

  import TopDrawer from "@/components/TopDrawer.vue";
  import QrcodeVue from "qrcode.vue";

  const accessToken = useLocalStorage<string>("AccessToken", "");
  const qrCode = ref<string | null>(null);
  const isDrawerOpen = ref<boolean>(false);

  const requestConfig = {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
  };

  onBeforeMount(() => {
    // if (!accessToken.value) {
    //   router.push("/login");
    // }

    getIin();
  });

  function getIin() {
    axios
      .get("https://bolash.uniong.ru/api/v1/whoami", requestConfig)
      .then((response) => {
        console.log(response);
        qrCode.value = `https://darling-fun-krill.ngrok-free.app/transaction/${response.data.message}`;
      })
      .catch((error) => {
        console.error(error);
      });
  }
</script>

<style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.3s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
