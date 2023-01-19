<template>
  <div id="app">
    <Notification />
    <Nav />
    <router-view />
  </div>
</template>

<script lang="ts">
import "./assets/style.css";
import Nav from "./components/Nav.vue";
import Notification from './components/Notification.vue';
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  components: {
    Nav,
    Notification
  },
  setup() {
    const store = useStore();

    async function created() {
      const response = await axios.get("user");
      store.dispatch("user", response.data);
    }

    return {
      created,
    };
  },
});
</script>

