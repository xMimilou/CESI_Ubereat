import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import axios from 'axios'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import('../components/Home.vue')
  },
  {
    path: "/login",
    component: () => import('../components/Login.vue'),
  },
  {
    path: "/register",
    component: () => import('../components/Register.vue'),
  },
  {
    path: "/forgot",
    component: () => import('../components/Forgot.vue'),
  },
  {
    path: "/settings",
    component: () => import('../components/Settings.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: "/delete_account",
    component: () => import('../components/DeleteAccount.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: "/edit_account",
    component: () => import('../components/EditAccount.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: "/products",
    component: () => import('../views/ProductView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: "/cart",
    component: () => import('../views/CartView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: "/orders",
    component: () => import('../views/OrderView.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    var token = localStorage.getItem('token');
    if (token == null || token == undefined) {
      next({ name: 'login' });
    } else {
      // make axios post on tokenCheckup and token in header at auth-token
      axios.post('http://localhost:3000/api/tokenCheckup', {}, { headers: { 'auth-token': token } }).then((response) => {
        if (response.data.message == 'Access granted') {
          next();
        } else {
          next({ name: 'login' });
        }
      }).catch((error) => {
        console.log(error);
        next({ name: 'login' });
      });
    }
  } else {
    next();
  }
});


export default router;

