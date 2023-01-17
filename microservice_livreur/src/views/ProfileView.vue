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
      id : "63c503b2bb246effadcb2c7c",
      count :""
    };
  },
  methods: {
    async getCommandes() {
      var username = "Juleeien";
      try {
  const response = await axios.post("http://localhost:5502/commandes/count/username", {
    username
  }, {
    headers: {
      "auth-token": this.token
    }
  });
  this.count = response.data;
  console.log(this.count);
} catch (error) {
  console.error(error);
}
    }}
};
</script>