<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { useWebNotification } from "@vueuse/core";

  onMounted(() => {
    Notification.requestPermission().then(function (status) {
      if (status === "denied") {
        console.error("denied");
      } else if (status === "granted") {
        console.log("success");
      }
    });

    const notification = new Notification("New Message!", {
      body: "You have a new message from a friend.",
      icon: "path/to/icon.png", // Optional: URL to an image to be used as an icon
      // Other options like image, badge, vibrate, etc.
    });
  });

  const {
    isSupported,
    notification,
    permissionGranted,
    show,
    close,
    onClick,
    onShow,
    onError,
    onClose,
  } = useWebNotification({
    title: "Hello, VueUse world!",
    dir: "auto",
    lang: "en",
    renotify: true,
    tag: "test",
  });

  function sendNotification() {
    if (isSupported.value && permissionGranted.value) show();
  }
</script>

<template>
  <button class="btn" @click="() => sendNotification()">
    Отправить уведомление
  </button>
</template>
