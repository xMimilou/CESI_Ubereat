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
            <router-link to="/register" class="nav-link">S'inscrire</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto" v-if="user">
          <li class="nav-item">
            <a href="javascript:void(0)" @click="handleClick" class="nav-link"
              >Se déconnecter</a>
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" @click="handleClick2" class="nav-link" >Paramètres</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, useStore } from "vuex";
import { useRouter} from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "Nav",
  setup() {
    const store = useStore();
    const router = useRouter();

    async function handleClick() {
      const response = await axios.post("logout")
      store.dispatch('user', null);
      localStorage.removeItem("token");
      router.push('/');
    }
    async function handleClick2() {
      router.push('/settings');
    }
    return {
      handleClick,
      handleClick2
    };
  },
  computed: {
    ...mapGetters(['user'])
  }
});

</script>
