import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Forgot from '../components/Forgot.vue'
import Settings from '../components/Settings.vue'
import Delete from '../components/DeleteAccount.vue'
import Edit from '../components/EditAccount.vue'

const routes: Array<RouteRecordRaw> = [
{
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/forgot",
    component: Forgot,
  },
  {
    path: "/settings",
    component: Settings,
  },
  {
    path: "/delete_account",
    component: Delete,
  },
  {
    path: "/edit_account",
    component: Edit,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

