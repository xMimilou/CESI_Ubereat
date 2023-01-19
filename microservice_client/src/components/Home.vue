<template>
  <div class="home-wrapper">
    <div v-if="user">
      <v-container>
        <v-row class="mx-auto">
          <v-col>
            <h3>Bonjour {{ user.username }} ! Votre solde: {{ balance }}€</h3>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col
            v-for="restaurant in filteredRestaurants"
            :key="restaurant.name"
            cols="4"
          >
            <v-card>
              <restaurant-component
                :restaurant="restaurant"
              ></restaurant-component>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <h3>tu n'es pas connecté</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import RestaurantComponent from "./Restaurant.vue";
import { fetchRestaurants } from "../data/products";
import axios from "axios";
import { useStore } from "vuex";

export interface Article {
    name: string,
    type: string,
    quantity: number,
    price: number,
    image_url: string
};

export interface Menu {
    name: string,
    articles: Article[],
    price: number,
    image_url: string
};

export interface Restaurant {
    name: string,
    location: string,
    opening_time: number[][],
    menus: Menu[],
    image_url: string
};

export default defineComponent({
  name: "Home",
  components: {
    RestaurantComponent,
  },
  data: () => {
    return {
      restaurants: [],
    } as { restaurants: Restaurant[] };
  },
  mounted() {
    fetchRestaurants().then((res) => {
       this.restaurants = res;
       console.log(this.restaurants)
    });

    const params = new URLSearchParams(window.location.search);
    var token = params.get('token');
    var username = params.get('username');
    var role = params.get('role');

    if(token != null && username != null && role != null)
    {

        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);

        this.store.dispatch("user", username);
        console.log("user", username);
    
    }

  },
  computed: {
    ...mapGetters(["user"]),
    ...mapGetters(["panier"]),
    filteredRestaurants() {
      if (!this.panier.length) return this.restaurants;
      return this.restaurants.filter((restaurant) => {
        return restaurant.name === this.panier[0].restaurantName;
      });
    },
  },
  setup() {
    
    
    const balance = ref(0);
    const store = useStore();
    

    async function checkReferal() {
      try {
        const response = await axios.get("http://localhost/auth/referal", {
          headers: { "auth-token": localStorage.getItem("token") },
        });
        if (response.data.valid) {
          balance.value = 5;
        } else {
          balance.value = 0;
        }
        console.log(balance);
      } catch (error) {
        console.error(error);
      }
    }
    checkReferal();
    return { store, balance };
  },
  
});
</script>

<style scope>
</style>
