<template>
  <div v-if="accessToken" class="size-full flex flex-col">
    <TopDrawer
      :onDrawerStateChange="(state: boolean) => (isDrawerOpen = state)">
      <div class="m-auto size-fit py-7 flex flex-col gap-3 items-center">
        <QrcodeVue
          v-if="qrUrl"
          :value="qrUrl"
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

    <div
      class="h-24 mt-7 m-3 rounded-4xl object-cover bg-[url(https://moneyman.ru/wp-content/uploads/2020/05/Visa-Cash.jpg)]">
      <div class="flex items-center size-full p-5">
        <div class="w-full text-base-100 text-xl font-bold flex justify-around">
          <div class="w-full">Кэшбэк</div>
          <div class="w-full text-center">{{ `${userCashback ?? 0} Б` }}</div>
        </div>
      </div>
    </div>

    <div
      class="size-full px-3 pb-10 pt-5 flex flex-col relative overflow-hidden">
      <Transition>
        <div
          v-if="isDrawerOpen"
          class="absolute left-0 top-0 size-full bg-black/25 z-40" />
      </Transition>

      <div class="card card-sm card-border border-base-300 shadow-sm mb-3">
        <div class="border-b border-base-300 p-3 grid grid-cols-3 items-center">
          <button
            @click="() => logout()"
            class="btn btn-square btn-ghost font-normal mr-auto w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <path
                class="fill-error"
                d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h6q.425 0 .713.288T12 20t-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12t.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z" />
            </svg>
          </button>
          <div class="m-auto text-lg font-bold text-base-content/75">
            Профиль
          </div>
        </div>
        <div class="card-body gap-1">
          <div class="text-lg">
            <div class="space-x-2 flex">
              <div class="w-2/5 font-medium">ИИН</div>
              <div class="w-full text-base-content/75 text-center">
                {{ userIin }}
              </div>
            </div>
            <div class="space-x-2 flex">
              <div class="w-2/5 font-medium">Имя</div>
              <div class="w-full text-base-content/75 text-center">
                {{ userName }}
              </div>
            </div>
            <div class="space-x-2 flex">
              <div class="w-2/5 font-medium">Фамилия</div>
              <div class="w-full text-base-content/75 text-center">
                {{ userLastName }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card card-sm card-border border-base-300 shadow-sm">
        <div class="card-body gap-1">
          <div class="text-lg">
            <!-- <div class="space-x-2 flex">
              <div class="w-2/5 font-medium text-green-600">Кэшбэк</div>
              <div class="w-full text-base-content/75 text-center">
                {{ userCashback }}
              </div>
            </div> -->
            <div class="space-x-2 flex">
              <div class="w-2/5 font-medium text-yellow-500">Налог</div>
              <div class="w-full text-base-content/75 text-center">
                <span>{{ userTax }} т</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-center mt-auto p-4">
        <RouterLink
          to="/readqr"
          class="btn size-fit btn-circle shadow-lg shadow-blue-400 border border-blue-400 bg-radial-[at_50%_75%] from-sky-400 via-blue-400 to-indigo-600 to-90%">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-10 m-3.5"
            viewBox="0 0 24 24">
            <path
              class="fill-base-content"
              d="M8 21H4a1 1 0 0 1-1-1v-4a1 1 0 0 0-2 0v4a3 3 0 0 0 3 3h4a1 1 0 0 0 0-2m14-6a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 0 0 2h4a3 3 0 0 0 3-3v-4a1 1 0 0 0-1-1M20 1h-4a1 1 0 0 0 0 2h4a1 1 0 0 1 1 1v4a1 1 0 0 0 2 0V4a3 3 0 0 0-3-3M2 9a1 1 0 0 0 1-1V4a1 1 0 0 1 1-1h4a1 1 0 0 0 0-2H4a3 3 0 0 0-3 3v4a1 1 0 0 0 1 1m8-4H6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1M9 9H7V7h2Zm5 2h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1m1-4h2v2h-2Zm-5 6H6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1m-1 4H7v-2h2Zm5-1a1 1 0 0 0 1-1a1 1 0 0 0 0-2h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1m4-3a1 1 0 0 0-1 1v3a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1m-4 4a1 1 0 1 0 1 1a1 1 0 0 0-1-1" />
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
  const isDrawerOpen = ref<boolean>(false);
  const qrUrl = ref<string | null>(null);
  const userIin = ref<string | null>(null);
  const userName = ref<string | null>(null);
  const userLastName = ref<string | null>(null);
  const userCashback = ref<string | null>(null);
  const userTax = ref<string | null>(null);

  const requestConfig = {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
  };

  onBeforeMount(() => {
    if (!accessToken.value) {
      router.push("/login");
    }

    getIin();
  });

  function logout() {
    accessToken.value = "";
    router.push("/login");
  }

  async function getIin() {
    await axios
      .get("https://bolash.uniong.ru/api/v1/whoami", requestConfig)
      .then((response) => {
        console.log(response);
        qrUrl.value = `https://satyp.netlify.app/transaction/${response.data.iin}`;
        userIin.value = response.data["iin"];
        userName.value = response.data["first_name"];
        userLastName.value = response.data["last_name"];
        userCashback.value = response.data["cashback"];
        userTax.value = response.data["tax"];
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
