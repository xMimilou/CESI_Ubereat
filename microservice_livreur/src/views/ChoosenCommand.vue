<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Notification from '../components/Notification.vue';
import CountersChoosenCommand from '@/components/countersChoosenCommand.vue';
import ActiveOrders from '@/components/ActiveOrders.vue';

import axios from 'axios';

</script>



<script lang="ts">
export default {
  name: "choosenCommand",
  data() {
      return {
          receivedUsername: "",
          usernameLivreur: localStorage.getItem("username"),
          FiltredTable: [],
          BrutTable: [],
          token: localStorage.getItem('token') // token should be stored securely

      };
  },
  async mounted() {
    setInterval(async () => {
      this.getData()
    }, 3000)
  },
  OnSetup() {
    this.getData()
  },
  methods: {
    getData(){
      console.log("Voici le username du livreur : " + this.usernameLivreur);
      this.getCommandes(this.usernameLivreur);
      console.log(this.FiltredTable);
    },
    async getCommandes(deliverUsername:string) {
    try {
        const response = await axios.post("http://localhost:5502/commandes/selected/deliver", { deliverUsername }, {
            headers: {
                "auth-token": this.token
            }
        });
        this.FiltredTable = response.data;
        console.log(this.FiltredTable);
    } catch (error) {
        console.error(error);
    }
  },
  },
  
  }

</script>


  
<template>
  <div class="container" v-for="item in FiltredTable" :key="item._id">
    <ActiveOrders :RestaurantName="item.restaurant.name" :RestaurantAddress="item.restaurant.location" :CustomerUsername="item.username" :CustomerAddress="item.delivery_person.delivery_location" :TimePlaced="item.order.time_placed" :TimeDelivered="item.order.time_delivered"/>
  </div>
</template>