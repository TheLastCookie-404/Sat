<template>
  <div class="fixed top-0 left-0 size-full place-content-center">
    <div class="w-fit m-auto">
      <fieldset
        class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend">Войти</legend>

        <label class="label">ИИН</label>
        <input v-model="userIin" type="text" class="input" placeholder="ИИН" />

        <label class="label">Пароль</label>
        <input
          v-model="userPassword"
          type="text"
          class="input"
          placeholder="Пароль" />

        <button @click="() => login()" class="btn btn-neutral mt-4">
          <span v-if="!isLoginLoading">Войти</span>
          <span v-else class="loading loading-dots loading-md"></span>
        </button>
        <p class="label">
          <span>У вас нет аккаунта?</span>
          <RouterLink to="/register" class="text-success"
            >Регистрация</RouterLink
          >
        </p>
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { useLocalStorage } from "@vueuse/core";
  import { router } from "@/router/router";
  import axios from "axios";

  const userIin = ref<string>();
  const userPassword = ref<string>();
  const isLoginLoading = ref<boolean>(false);
  const accessToken = useLocalStorage<string>("AccessToken", "");

  onMounted(() => {
    if (accessToken.value.length > 0) {
      router.push("/profile");
    }
  });

  async function login() {
    const requestConfig = {};

    isLoginLoading.value = true;

    await axios
      .post(
        "https://bolash.uniong.ru/api/v1/login",
        {
          iin: userIin.value,
          password: userPassword.value,
        },
        requestConfig
      )
      .then((response) => {
        console.log(response);
        accessToken.value = response.data["access_token"];
        isLoginLoading.value = false;
        router.push("/profile");
      })
      .catch((error) => {
        console.error(error);
        isLoginLoading.value = false;
      });
  }
</script>
