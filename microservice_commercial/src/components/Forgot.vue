<template>
  <form @submit.prevent="handleSubmit">
    <h3>Forgot Password</h3>

    <div class="Forgot Password">
      <label>Email</label>
      <input
        type="email"
        class="form-control"
        v-model="email"
        placeholder="Email"
      />
    </div>

    <button class="btn btn-primary btn-block">submit</button>
  </form>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Forgot",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async handleSubmit() {
      const response = await axios.post("forgot", {
        email: this.email
       
      });
      console.log(response)
    },
  },
});
</script>
