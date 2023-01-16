<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Notification from '../components/Notification.vue';
import ActiveOrders from '@/components/ActiveOrders.vue';

import axios from 'axios';

</script>



<script lang="ts">
export default {
  name: "acceptedCommandsView",
  data() {
      return {
          receivedUsername: "",
          usernameLivreur: localStorage.getItem("username"),
          FiltredTable: [],
          BrutTable: [],
          token: localStorage.getItem('token'), // token should be stored securely
          isLoadding: true,
          state: localStorage.setItem("state", "choosencommand")
      };
  },
  async mounted() {
    setInterval(async () => {
      if (localStorage.getItem("state") == "choosencommand") {
        this.getData();
      }
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
        this.isLoadding = false;
    } catch (error) {
        console.error(error);
    }
},
  },
  
  }

</script>


  
<template>
  <h1 class="text-center">Requêtes en cours</h1>
  <div class="container" v-if="!isLoadding">
    <div class="row">
      <div class="col-3" v-for="item in FiltredTable" :key="item._id">
        <ActiveOrders :RestaurantName="item.restaurant.name" :RestaurantAddress="item.restaurant.location" :CustomerUsername="item.username" :CustomerAddress="item.delivery_person.delivery_location" :TimePlaced="item.order.time_placed" :TimeDelivered="item.order.time_delivered" :Status ="item.order.status" />
      </div>
    </div>
  </div>
  <div v-else>
    <!-- display text at vertical and horizontal center-->
    <div class="text-center">
      <h1>Chargement des données</h1>
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style scoped>


.container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-4{
  padding: 5px;
  flex: 0 0 auto;
  width: 33.3333333333%;
}

.col-3{
  padding: 5px;
  flex: 0 0 auto;
  width: 25%;
}

/* animation loading */
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: hsla(160, 100%, 37%, 1);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}


</style>