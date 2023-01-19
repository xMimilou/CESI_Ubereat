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
      :src="restaurant.url"
    ></v-img>

    <v-card-title>{{ restaurant.name }}</v-card-title>

    <v-card-text>
      <div>
        {{ restaurant.location }}
      </div>
      <div>
        <v-chip-group
          active-class="deep-purple accent-4 white--text"
          column
        >
          <template
            v-for="(hours, index) in restaurant.opening_time"
            :key="index"
          >
            <v-chip>{{ hours[0] }}h - {{ hours[1] }}h </v-chip>
          </template>
        </v-chip-group>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="reserve()">
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
    
<script lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { mapGetters } from "vuex";

export default {
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["panier"])
  },
  data: () => ({}),
  setup(props: any) {
    const router = useRouter();
    const store = useStore();

    function reserve() {
      store.dispatch("restaurant", props.restaurant);
      router.push("/products");
    }
    return {
      reserve,
    };
  },
};
</script>