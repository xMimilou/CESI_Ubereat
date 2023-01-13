<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Notification from '../components/Notification.vue';
import CountersChoosenCommand from '@/components/countersChoosenCommand.vue';
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
          BrutTable: []
      };
  },
  created() {
    axios.get('http://localhost:5501/posts')
          .then(response => {
            console.log(response.data); 
            this.BrutTable = response.data;

            this.BrutTable.forEach((element) => {
            //console.log("Le statut : ");
            //console.log("Voici les éléments " + element.statusDeliver + " " + element.usernameLivreur + " " + this.usernameLivreur);
            //console.log(element.statusDeliver != "Delivered" && element.usernameLivreur == this.usernameLivreur);
            if(element.statusDeliver != "Delivered" && element.usernameLivreur == this.usernameLivreur)
            {
              this.FiltredTable.push(element);
            }
            });

           })
          .catch(error => {
            console.log(error);
  });
  console.log(this.FiltredTable);
  
  },
  }

</script>


  
<template>
  <div class="container" v-for="item in FiltredTable" :key="item._id">
    <CountersChoosenCommand  :CustomerUsername="item.usernameLivreur" :CustomerAddress="item.costumerAddress" :RestaurantAddress="item.restaurantAdress" :RestaurantName="item.restaurantName" :Total_cost="item.total_price"/>
  </div>
</template>