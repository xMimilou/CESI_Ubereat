<script  lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { useStore } from "vuex";
export default {
  name: 'HomeView',
  setup() {
    const store = useStore();
    return { store };
  },
  mounted() {
    console.log("mounted");

    const params = new URLSearchParams(window.location.search);
    var token = params.get('token');
    var username = params.get('username');
    var role = params.get('role');

    if(token != null && username != null && role != null)
    {

        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);

        this.store.dispatch("user", username);
        console.log("user", username);
        localStorage.setItem('EtatNotifs', "true");
    
    }

  },created() {
    const store = useStore();
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      store.commit("user", user);
    }
  },
  }



</script>

<template>
    <h1></h1>
</template>
