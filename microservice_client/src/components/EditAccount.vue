<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="handleSubmit">
        <error v-if="error" :error="error" />
        <h3>Informations utilisateurs</h3>

        <div class="form-group">
          <label>Prénom</label>
          <input
            type="text"
            class="form-control"
            v-model="first_name"
            placeholder="Prénom"
          />
        </div>

        <div class="form-group">
          <label>Nom</label>
          <input
            type="text"
            class="form-control"
            v-model="last_name"
            placeholder="Nom"
          />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Email"
          />
        </div>

        <div class="form-group">
          <label>Pseudo</label>
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="Mot de passe"
          />
        </div>
        <button class="btn btn-primary btn-block">Modifier</button>
      </form>
    </div>
  </div>
</template>
  
  <script lang="ts">
import axios from "axios";
import Error from "./Error.vue";

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Edit",
  components: {
    Error,
  },
  data() {
    return {
      first_name: ref(""),
      last_name: ref(""),
      username: ref(""),
      email: ref(""),
      error: ref(""),
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post(
          "update",
          {
            first_name: this.first_name,
            last_name: this.last_name,
            username: this.username,
            email: this.email,
          },
          { headers: { "auth-token": localStorage.getItem("token") } }
        );
        this.$router.push("/");
      } catch (e) {
        this.error = "Veuillez renseigner tous les champs !";
      }
    },
  },
});
</script>

<style scope>
</style>
