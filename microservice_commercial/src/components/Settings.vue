<template>
  <div>
    <button @click="deleteAccount" class="btn btn-primary btn-block">
      Supprimer le compte
    </button>
    <button @click="editAccount" class="btn btn-primary btn-block">
      Modifier le compte
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
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