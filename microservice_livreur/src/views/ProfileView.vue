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
      username: localStorage.getItem('username'),
      id : "63c503b2bb246effadcb2c7c"
    };
  },
  methods: {
    async getCommandes() {
      try {
    await axios.delete("http://localhost:5502/commandes/" + this.id, {
      headers: {
        "auth-token": this.token,
      }
    });
    console.log("Commande supprimée avec succès");
  } catch (error) {
    console.error(error);
  }
    }}
};
</script>