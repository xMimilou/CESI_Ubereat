<template>
  <div class="alert alert-danger" role="alert">
    {{ error }}
  </div>
</template>

<script lang="ts">
export default {
  name: "Error",
  props: ['error']
};
</script>
