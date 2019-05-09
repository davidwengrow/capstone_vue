import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import MyReceipts from "./views/MyReceipts.vue";
import ReceiptsNew from "./views/ReceiptsNew.vue";
import ReceiptsShow from "./views/ReceiptsShow.vue";
import ReceiptsEdit from "./views/ReceiptsEdit.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/receipts",
      name: "receipts-index",
      component: MyReceipts
    },

    {
      path: "/receipts/new",
      name: "receipts-new",
      component: ReceiptsNew
    },
    {
      path: "/receipts/:id",
      name: "receipts-show",
      component: ReceiptsShow
    },
    {
      path: "/receipts/:id/edit",
      name: "receipts-show",
      component: ReceiptsEdit
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
