<template>
  <div class="home-wrapper">
    <v-container>
      <v-row>
        <v-col v-for="item in panier" :key="item.name" cols="4">
          <v-card>
            <cart-component :menu="item"></cart-component>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <button class="btn btn-secondary" @click="submitOrder">
    Finaliser la commande
  </button>
</template>
    
    <script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import CartComponent from "../components/Cart.vue";
import axios from "axios";
const referralCodes = require("referral-codes");

export default defineComponent({
  name: "Home",
  components: {
    CartComponent,
  },
  computed: {
    ...mapGetters(["panier"]),
    ...mapGetters(["user"]),
  },
  methods: {
    async submitOrder() {
      try {
        let currentTimePlus30Minutes = new Date();
        currentTimePlus30Minutes.setMinutes(
          currentTimePlus30Minutes.getMinutes() + 30
        );

        const menus = this.panier.reduce((acc: any, item: any) => {
          if (!acc[item.restaurantName]) {
            acc = [
              {
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                articles: item.articles,
              },
            ];
          }
          return acc;
        }, {});

        const total_cost = this.panier.reduce(
          (acc: any, item: any) => acc + item.price * item.quantity,
          0
        );

        const order = {
          client: this.user.username,
          restaurant: {
            name: this.panier[0].restaurantName,
            location: this.panier[0].restaurantAddress,
            opening_time: this.panier[0].restaurantOpen,
          },
          order: {
            menus: menus,
            total_cost: total_cost,
            status: "en attente du restaurateur",
            time_placed: new Date(),
            time_delivered: currentTimePlus30Minutes,
            delivery_person: {
              deliver_username: "Danish",
              delivery_location: "Paquebot",
            },
          },
          code_client: referralCodes.generate({
            pattern: "#####-#####-##",
          }),
          code_restaurant: referralCodes.generate({
            pattern: "#####-#####-##",
          }),
        };

        console.log(order);

        
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    console.log(this.panier);
  },
});
</script>
    
