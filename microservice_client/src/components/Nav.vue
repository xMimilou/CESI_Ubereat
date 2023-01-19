<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">Page d'accueil</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto" v-if="!user">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Se connecter</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link"
              >S'inscrire</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ml-auto" v-if="user">
          <li class="nav-item">
            <a href="javascript:void(0)" @click="handleClick" class="nav-link"
              >Se déconnecter</a
            >
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" @click="handleClick4" class="nav-link"
              >Commandes</a
            >
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" @click="handleClick3" class="nav-link"
              >Panier
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
           </a>
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" @click="handleClick2" class="nav-link"
              >Paramètres <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
             </svg>
           </a>
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" class="nav-link"> </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Nav",
  setup() {
    const store = useStore();
    const router = useRouter();

    async function handleClick() {
      store.dispatch("user", null);
      store.dispatch("restaurant", null);
      store.dispatch("clearPanier");
      localStorage.removeItem("token");
      router.push("/");
    }
    async function handleClick2() {
      router.push("/settings");
    }
    async function handleClick3() {
      router.push("/cart");
    }
    async function handleClick4() {
      router.push("/orders");
    }

    return {
      handleClick,
      handleClick2,
      handleClick3,
      handleClick4
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
});
</script>
<style scope>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");

.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}
</style>
