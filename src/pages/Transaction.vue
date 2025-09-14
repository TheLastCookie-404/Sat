<template>
  <div>
    {{ iin ?? "iin not found" }}
    <form>
      <input class="input" v-model="summ" type="number" />
      <button class="submit" @click.prevent="() => sendRequest()"></button>
    </form>
    {{ summ }}
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";

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
