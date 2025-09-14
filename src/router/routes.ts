import DefaultLayout from "@/layouts/default.vue";

import Register from "@/pages/Register.vue";
import Login from "@/pages/Login.vue";
import Profile from "@/pages/Profile.vue";
import ReadQrcode from "@/pages/ReadQrcode.vue";
import Transaction from "@/pages/Transaction.vue";
import NotificationTest from "@/pages/NotificationTest.vue";

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
    component: ReadQrcode,
    path: "/",
    // path: "/readqr",
  },
  {
    component: Transaction,
    path: "/transaction/",
    children: [{ component: Transaction, path: ":iin" }],
  },
  {
    component: NotificationTest,
    path: "/notification",
  },
];
