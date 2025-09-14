<template>
  <div class="fixed top-0 left-0 size-full place-content-center">
    <div class="w-fit m-auto">
      <fieldset
        class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend">Login</legend>

        <label class="label">Иин</label>
        <input v-model="userIin" type="text" class="input" placeholder="Иин" />

        <label class="label">Пароль</label>
        <input
          v-model="userPassword"
          type="text"
          class="input"
          placeholder="Пароль" />

        <button @click="() => login()" class="btn btn-neutral mt-4">
          Login
        </button>
        <p class="label">
          <span>Don`t have an account?</span>
          <router-link to="/register" class="text-success"
            >Register</router-link
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
  const accessToken = useLocalStorage<string>("AccessToken", "");
  const minAccesTokenLength = 50;

  onMounted(() => {
    if (accessToken.value.length > minAccesTokenLength) {
      router.push("/profile");
    }
  });

  function login() {
    const requestConfig = {};

    axios
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

  function profileRedirect() {}
</script>
