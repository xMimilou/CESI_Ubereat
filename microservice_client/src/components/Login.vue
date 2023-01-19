<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="handleSubmit">
        <error v-if="error" :error="error" />
        <h3>Se connecter</h3>

        <div class="form-group">
          <label>Pseudo</label>
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="Pseudo"
          />
        </div>

        <div class="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Mot de passe"
          />
        </div>

        <button class="btn btn-primary btn-block">Se connecter</button>

        <p class="forgot-password text-right">
          <router-link to="forgot">Mot de passe oublié ?</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";
import Error from "./Error.vue";

export default defineComponent({
  name: "Login",
  components: {
    Error,
  },
  setup() {
    const username = ref("");
    const password = ref("");
    const error = ref("");

    const store = useStore();
    const router = useRouter();

    async function handleSubmit() {
      try {
        const response = await axios.post("login", {
          username: username.value,
          password: password.value,
        });
        localStorage.setItem("token", response.data.token);
        store.dispatch("user", response.data);
        console.log(response.data)
        router.push("/");
      } catch (e) {
        error.value = "Email/Mot de passe invalide !";
      }
    }

    return {
      username,
      password,
      error,
      handleSubmit,
    };
  },
});
</script>

<style scope>
</style>
