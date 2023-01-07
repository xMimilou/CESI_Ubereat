<template>
    <form @submit.prevent="handleSubmit">
      <error v-if="error" :error="error" />
      <h3>Supprimer son compte</h3>
  
      <div class="form-group">
        <label>Veuillez renseigner votre mot de passe :</label>
        <input
          type="text"
          class="form-control"
          v-model="password"
          placeholder="Mot de passe"
        />
      </div>
  
      <button class="btn btn-primary btn-block">Supprimer son compte</button>
    </form>
  </template>
  
  <script lang="ts">
  import axios from "axios";
  import Error from "./Error.vue";
  
  import { defineComponent, ref } from "vue";
  
  import store  from '../store/index';

export default defineComponent({
  name: 'Edit',
  components: {
    Error,
  },
  data() {
    return {
      password: ref(''),
      error: ref(''),
    };
  },
  methods: {
    async handleSubmit() {
      try {
        console.log(localStorage.getItem('token'));
        const response = await axios.post('delete_account', {
          password: this.password,
          token: localStorage.getItem('token')
        });
        store.dispatch('user', null);
        this.$router.push('/');
      } catch (e) {
        this.error = 'Erreur lors de la suppression du compte !';
      }
    },
  },
});
  </script>