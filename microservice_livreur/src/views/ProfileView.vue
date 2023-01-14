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
        const response = await axios.post("http://localhost:5502/commandes/all/available", {}, {
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