<script lang="ts">
import HelloWorldVue from '@/components/HelloWorld.vue';
import { existsTypeAnnotation } from '@babel/types';
import { useStore } from "vuex";

export default({
  name: 'HomeView',
  components: {
    HelloWorldVue
  },
  setup() {
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
  }
});

</script>

<template>
  <HelloWorldVue msg="Welcome to the commercial part" />
  <!-- use cart font awesome-->

</template>
