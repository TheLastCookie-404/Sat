import DefaultLayout from "@/layouts/default.vue";

import Register from "@/pages/Register.vue";
import Login from "@/pages/Login.vue";
import Profile from "@/pages/Profile.vue";
import ReadQr from "@/pages/ReadQr.vue";

export const routes = [
  {
    component: Register,
    path: "/register",
  },
  {
    component: Login,
    path: "/login",
  },
  {
    component: Profile,
    path: "/profile",
  },
  {
    component: ReadQr,
    path: "/readqr",
  },
];
