<template>
  <div class="home">
    <!-- <Products></Products> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Products from '@/components/Products.vue'
import { useStore } from "vuex";

export default defineComponent({
  name: 'HomeView',
  components: {
    Products
  },
  created() {
    const store = useStore();
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      store.commit("user", user);
    }
  },
  setup(){
    const store = useStore();
    return { store };
  },
  mounted() {

    const params = new URLSearchParams(window.location.search);
    var token = params.get('token');
    var username = params.get('username');
    var role = params.get('role');

    if(token != null && username != null && role != null)
    {

        localStorage.setItem('token', token);
        localStorage.setItem('user', username);
        localStorage.setItem('role', role);

        this.store.dispatch("user", username);
        console.log("user", username);
    
    }

  },
});
</script>
