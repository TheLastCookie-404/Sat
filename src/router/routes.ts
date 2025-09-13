import DefaultLayout from "@/layouts/default.vue";

import Register from "@/pages/Register.vue";
import Login from "@/pages/Login.vue";
import Profile from "@/pages/Profile.vue";
// @ts-ignore
import ReadQr from "@/pages/ReadQr.vue";
import Transaction from "@/pages/Transaction.vue";

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
  {
    component: Transaction,
    path: "/transaction",
  },
];
