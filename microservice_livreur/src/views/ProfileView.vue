<template>
<button @click="getCommandes"> Modifier le compte </button>
<button @click=""> Supprimer le compte </button>
</template>

<script lang="ts">

import axios from "axios";

export default {
  data() {
    return {
      commandes: [],
      token: localStorage.getItem('token'), // token should be stored securely
      username: localStorage.getItem('username')
    };
  },
  methods: {
    async getCommandes() {
      try {
        console.log(this.username);
        const response = await axios.post("http://localhost:5502/commandes/all/username", {
          username : this.username
        }, {
          headers: {
            "auth-token": this.token
          }
        });
        this.commandes = response.data;
        console.log(this.commandes);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>