<script lang="ts">
import HelloWorldVue from '@/components/HelloWorld.vue';
import { existsTypeAnnotation } from '@babel/types';

export default({
  name: 'HomeView',
  components: {
    HelloWorldVue
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

        console.log("user", username);
    }
  }
});

</script>

<template>
  <HelloWorldVue msg="Welcome to the commercial part" />
  <!-- use cart font awesome-->

</template>
