<template>
  <div>
    <Header linkLabel="Go Back" link="/profile" />
    <!-- <form>
      <input class="input" v-model="summ" type="number" />
      <button class="submit" @click.prevent="() => sendRequest()"></button>
    </form> -->
    <div class="p-3 space-y-3">
      <div class="card card-sm card-border bg-base-200 border-base-300">
        <div class="card-body gap-1">
          <!-- <div class="card-title">
            <div>Следующий урок:</div>
            <div class="text-success">Математика</div>
          </div> -->
          <div>
            <p class="space-x-2 text-lg">
              <span class="font-medium">Получатель</span>
            </p>
            <p class="space-x-2 text-base-content/75">
              <span class="font-medium">ИИН</span>
              <span>** ** ** *** ***</span>
            </p>
            <p class="space-x-2 text-base-content/75">
              <span class="font-medium">Имя</span>
              <span>Василий</span>
            </p>
            <p class="space-x-2 text-base-content/75">
              <span class="font-medium">Фамилия</span>
              <span>Чикичипеньтьев</span>
            </p>
          </div>
        </div>
      </div>
      <fieldset
        class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <label class="label">Сумма перевода</label>
        <input type="number" class="input" placeholder="KZT" />

        <button class="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </div>
    {{ summ }}
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";

  import Header from "@/components/Header.vue";

  const route = useRoute();
  const iin = route.params.iin;

  const summ = ref<Number>();

  function sendRequest() {
    axios
      .post("")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }
</script>
