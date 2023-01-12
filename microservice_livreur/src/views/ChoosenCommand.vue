<template>
    <div>
      <counters  @update:username="handleUsername"/>
    </div>
  </template>
  
  <script lang="ts">
  import counters from '../components/counters.vue';
  
  export default {
    name: "choosenCommand",
    data() {
      return {
        receivedUsername: "",
        username: null,
      }
    },
    created() {
    this.$on('username', (username:string) => {
      this.username = username;
    });
    },
    methods: {
      handleUsername(username) {
        this.receivedUsername = username;
        console.log(username);
        console.log("test");      }
    }
  }
  </script>