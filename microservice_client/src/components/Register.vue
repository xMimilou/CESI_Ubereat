<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="handleSubmit">
        <error v-if="error" :error="error" />
        <h3>S'inscrire</h3>

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
          <label>Pseudo</label>
          <input
            type="text"
            class="form-control"
            v-model="username"
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
          <label>Role</label>
          <select class="form-control" v-model="role">
            <option value="Client">Client</option>
            <option value="Livreur">Livreur</option>
            <option value="Restaurateur">Restaurateur</option>
          </select>
        </div>

        <div class="form-group">
          <label>Code parrainage</label>
          <input
            type="text"
            class="form-control"
            v-model="referal_by"
            placeholder="Code parrainage"
          />
        </div>

        <div class="form-group">
          <label>Mot de passe</label>
          <input
            type="text"
            class="form-control"
            v-model="password"
            placeholder="Mot de passe"
          />
        </div>

        <div class="form-group">
          <label>Confirmer Mot de passe</label>
          <input
            type="text"
            class="form-control"
            v-model="password_confirm"
            placeholder="Confirmer Mot de passe"
          />
        </div>

        <button class="btn btn-primary btn-block">S'inscrire</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Error from "./Error.vue";

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Register",
  components: {
    Error,
  },
  data() {
    return {
      first_name: ref(""),
      last_name: ref(""),
      username: ref(""),
      role: ref(""),
      referal_by: ref(""),
      email: ref(""),
      password: ref(""),
      password_confirm: ref(""),
      error: ref(""),
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post("register", {
          first_name: this.first_name,
          last_name: this.last_name,
          username: this.username,
          role: this.role,
          referal_by: this.referal_by,
          email: this.email,
          password: this.password,
          password_confirm: this.password_confirm,
        });
        this.$router.push("/login");
      } catch (e) {
        this.error = "Veuillez renseigner tous les champs !";
      }
    },
  },
});
</script>


<style scope>
</style>
