<template>
  <div>
    <div class="h-5"></div>
    <Header linkLabel="Назад" link="/profile" />
    <!-- <form>
      <input class="input" v-model="summ" type="number" />
      <button class="submit" @click.prevent="() => sendRequest()"></button>
    </form> -->
    <div class="p-3 space-y-3">
      <fieldset
        class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <legend class="fieldset-legend">ИИН получателя</legend>
        <input
          v-model="finalIin"
          type="text"
          class="input w-full"
          placeholder="XX-XX-XX-XXX-XXX" />
      </fieldset>
      <fieldset
        class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <legend class="fieldset-legend">Перевод</legend>
        <label class="label">Сумма перевода</label>
        <input
          v-model="total"
          type="number"
          class="input w-full"
          placeholder="KZT" />

        <button @click="() => sendRequest()" class="btn btn-neutral mt-4">
          <span v-if="!isTransactionLoading">Подтвердить</span>
          <span v-else class="loading loading-dots loading-md"></span>
        </button>
      </fieldset>
    </div>
    {{ summ }}
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  import { useLocalStorage } from "@vueuse/core";
  import { router } from "@/router/router";

  import Header from "@/components/Header.vue";

  const accessToken = useLocalStorage<string>("AccessToken", "");
  const route = useRoute();
  const iin: string = route.params.iin as string;
  const finalIin = ref<string>();
  const total = ref<number>();
  const isTransactionLoading = ref<boolean>(false);

  const summ = ref<Number>();

  onMounted(() => {
    if (!accessToken.value) {
      router.push("/login");
    }
    finalIin.value = iin ?? "";
  });

  async function sendRequest() {
    const requestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    };

    isTransactionLoading.value = true;

    await axios
      .post(
        "https://bolash.uniong.ru/api/v1/transaction",
        {
          iin: iin ?? finalIin.value,
          total: total.value,
        },
        requestConfig
      )
      .then((response) => {
        console.log(response);
        isTransactionLoading.value = false;
      })
      .catch((error) => {
        console.error(error);
        isTransactionLoading.value = false;
      });
  }
</script>
