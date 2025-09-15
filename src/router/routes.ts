import DefaultLayout from "@/layouts/default.vue";
import ProfileLayout from "@/layouts/profile.vue";

import Register from "@/pages/Register.vue";
import Login from "@/pages/Login.vue";
import Profile from "@/pages/Profile.vue";
import ReadQrcode from "@/pages/ReadQrcode.vue";
import Transaction from "@/pages/Transaction.vue";

export const routes = [
  {
    component: Register,
    path: "/register",
  },
  {
    component: Login,
    path: "/",
    children: [
      {
        component: Login,
        path: "login",
      },
    ],
  },
  {
    component: Profile,
    path: "/profile",
    // meta: {
    //   layout: ProfileLayout,
    // },
  },
  {
    component: ReadQrcode,
    // path: "/",
    path: "/readqr",
  },
  {
    component: Transaction,
    path: "/transaction/",
    children: [{ component: Transaction, path: ":iin" }],
  },
];
