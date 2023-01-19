<template>
  <v-card class="mx-auto my-12" max-width="374">
    <template>
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      class="v-img__contain"
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>{{ menu.name }}</v-card-title>

    <v-card-text>
      <div>
        {{ menu.price }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="buy()"> Acheter </v-btn>
    </v-card-actions>
  </v-card>
</template>
    
    <script lang="ts">
import { PropType } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { mapGetters } from "vuex";

export default {
  props: {
    menu: {
      type: Object,
      required: true,
    },
    restaurant: {
      type: Object,
      required: true,
    },
  },
  data: () => ({}),
  setup(props: any) {
    const router = useRouter();
    const store = useStore();
    function buy() {
      const menuWithRestaurantInfo = {
        ...props.menu,
        restaurantName: props.restaurant.name,
        restaurantAddress: props.restaurant.address,
        restaurantOpen: props.restaurant.opening_hours,
      };
      store.dispatch("panier", menuWithRestaurantInfo);
      console.log(menuWithRestaurantInfo)
    }
    return {
      buy,
    };
  },
};
</script>