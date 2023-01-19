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
        const menus = [];
        for (const item of this.panier) {
          menus.push(item._id);
        }
        const total_cost = this.panier.reduce(
          (acc: any, item: any) => acc + item.price * item.quantity,
          0
        );
        const order = {
          client: this.user.username,
          restaurant: this.panier[0].restaurantId,
          order: {
            menus: menus,
            total_cost: total_cost,
            status: "En cours",
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
        const response = await axios.post(
          "http://localhost:3002/restorer/orders",
          {
            client: this.user.username,
            restaurant: this.panier[0].restaurantId,
            order: {
              menus: menus,
              total_cost: total_cost,
              status: "En cours",
              time_placed: new Date(),
              time_delivered: currentTimePlus30Minutes,
              delivery_person: {
                deliver_username: "Danish",
                delivery_location: "Paquebot",
              },
            },
            code_client: referralCodes.generate({
              pattern: "#####-#####-##",
            })[0],
            code_restaurant: referralCodes.generate({
              pattern: "#####-#####-##",
            })[0],
          },
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );
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
    