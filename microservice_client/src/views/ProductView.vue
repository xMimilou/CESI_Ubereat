<template>
  <div class="home-wrapper">
    <v-container>
      <v-row>
        <v-col v-for="rest in restaurant.menus" :key="rest.name" cols="4">
          <v-card>
            <product-component :menu="rest" :restaurant="restaurant"></product-component>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import ProductComponent from "../components/Product.vue";

export default defineComponent({
  name: "Home",
  components: {
    ProductComponent,
  },
  computed: {
    ...mapGetters(["restaurant"]),
  },
  mounted() {
    console.log(this.restaurant);
  },
});
</script>
  
<style scope>
</style>
  