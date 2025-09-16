<template>
  <div class="fixed top-0 left-0 size-full place-content-center">
    <div class="w-fit m-auto">
      <fieldset
        class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend">Регистрация</legend>

        <label class="label">Имя</label>
        <input v-model="userName" type="text" class="input" placeholder="Имя" />

        <label class="label">Фамилия</label>
        <input
          v-model="userLastName"
          type="text"
          class="input"
          placeholder="Фамилия" />

        <label class="label">ИИН</label>
        <input v-model="userIin" type="text" class="input" placeholder="ИИН" />

        <label class="label">Пароль</label>
        <input
          v-model="userPassword"
          type="text"
          class="input"
          placeholder="Пароль" />

        <button @click="() => register()" class="btn btn-neutral mt-4">
          <span v-if="!isRegisterLoading">Зарегистрироваться</span>
          <span v-else class="loading loading-dots loading-md"></span>
        </button>
        <p class="label">
          <span>У вас уже есть аккаунт?</span>
          <RouterLink to="/login" class="text-success">Войти</RouterLink>
        </p>
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { useLocalStorage } from "@vueuse/core";
  import { router } from "@/router/router";
  import { RouterLink } from "vue-router";
  import axios from "axios";

  const userName = ref<string>();
  const userLastName = ref<string>();
  const userIin = ref<string>();
  const userPassword = ref<string>();
  const isRegisterLoading = ref<boolean>();
  const accessToken = useLocalStorage<string>("AccessToken", "");

  onMounted(() => {
    if (accessToken.value) {
      router.push("/profile");
    }
  });

  async function register() {
    const requestConfig = {};

    isRegisterLoading.value = true;

    await axios
      .post(
        "https://bolash.uniong.ru/api/v1/signup",
        {
          first_name: userName.value,
          last_name: userLastName.value,
          iin: userIin.value,
          password: userPassword.value,
        },
        requestConfig
      )
      .then((response) => {
        console.log(response);
        isRegisterLoading.value = true;
        login();
      })
      .catch((error) => {
        console.error(error);
        isRegisterLoading.value = false;
      });
  }

  async function login() {
    const requestConfig = {};

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
        router.push("/profile");
      })
      .catch((error) => {
        console.error(error);
      });
  }
</script>
