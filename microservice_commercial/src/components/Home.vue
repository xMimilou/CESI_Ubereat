<template>
  <form @submit.prevent="handleSubmit">
    <div v-if="user">
      <h3>Bonjour, {{ user.first_name }} {{ user.last_name }}</h3>
      <button class="btn btn-primary btn-block">Gerer ses commandes</button>
      <button class="btn btn-primary btn-block">Suivre ses livraisons</button>
      <button class="btn btn-primary btn-block">Parainer un ami</button>
    </div>
    <div v-else>
      <h3>tu n'es pas connecté</h3>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
  computed: {
    ...mapGetters(["user"]),
  },
  setup() {
    const router = useRouter();

    function handleSubmit() {
      router.push('/edit');
    }
    return {
      handleSubmit,
    };
  }
});
</script>

