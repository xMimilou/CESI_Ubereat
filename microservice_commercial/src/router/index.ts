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
  }else{
    next();
  }
});

export default router
