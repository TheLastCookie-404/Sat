<template>
  <div class="fixed top-0 left-0 size-full place-content-center">
    <div class="w-fit m-auto">
      <fieldset
        class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend">Register</legend>

        <label class="label">Имя</label>
        <input v-model="userName" type="text" class="input" placeholder="Имя" />

        <label class="label">Фамилия</label>
        <input
          v-model="userLastName"
          type="text"
          class="input"
          placeholder="Фамилия" />

        <label class="label">Иин</label>
        <input v-model="userIin" type="text" class="input" placeholder="Иин" />

        <label class="label">Пароль</label>
        <input
          v-model="userPassword"
          type="text"
          class="input"
          placeholder="Пароль" />

        <button @click="() => login()" class="btn btn-neutral mt-4">
          Register
        </button>
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import axios from "axios";

  const userName = ref<string>();
  const userLastName = ref<string>();
  const userIin = ref<string>();
  const userPassword = ref<string>();

  function login() {
    const requestConfig = {};

    axios
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
      })
      .catch((error) => {
        console.error(error);
      });
  }
</script>
