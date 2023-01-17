import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/statistique',
      name: 'statistique',
      component: () => import('../views/StatistiqueView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: "/users",
      name: "users",
      component: () => import('../views/UsersView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: "/update/:id",
      name: "update",
      component: () => import('../views/UpdateView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: "/delete/:id",
      name: "delete",
      component: () => import('../views/DeleteView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: "/display/:query/:page",
      name: "display",
      component: () => import('../views/DisplayView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: "/suivis-livraison",
      name: "suivis-livraison",
      component: () => import('../views/LivraisonView.vue'),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import('../views/ProfileView.vue'),
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    var token = localStorage.getItem('token');
    if (token == null || token == undefined) {
      next({ name: 'login' });
    } else {
      // make axios post on tokenCheckup and token in header at auth-token
      axios.get('http://localhost/auth/tokenCheckup', { headers: { 'auth-token': token } }).then((response) => {
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


export default router
