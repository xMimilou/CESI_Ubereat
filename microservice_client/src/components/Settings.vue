<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <div>
        <h6>Votre code parrainage: {{ user.referal_code }}</h6>
        <button @click="deleteAccount" class="btn btn-secondary btn-block">
          Supprimer le compte
        </button>
        <button @click="editAccount" class="btn btn-secondary btn-block">
          Modifier le compte
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { mapGetters } from "vuex";

export default defineComponent({
  computed: {
    ...mapGetters(["user"]),
  },
  setup() {
    const router = useRouter();

    return {
      deleteAccount() {
        router.push("/delete_account");
      },
      editAccount() {
        router.push("/edit_account");
      },
    };
  },
});
</script>


<style>

</style>
