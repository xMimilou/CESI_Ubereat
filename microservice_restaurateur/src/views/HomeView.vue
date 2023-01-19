<template>
  <div class="home">
    <!-- <Products></Products> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Products from '@/components/Products.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Products
  },
});
</script>
