<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Notification from "../components/Notification.vue";
import counters from "../components/counters.vue";
import AcceptedCommands from "./AcceptedCommandsView.vue";
</script>

<script lang="ts">
import axios from "axios";
export default {
  name: "ListOfCommandsView",
  components: {
    AcceptedCommands,
  },
  data() {
    return {
      count: 10,
      Selectedtitle: [],
      FiltredTable: [],
      Empty: "",
      UndesirableIDS: [],
      token: localStorage.getItem("token"), // token should be stored securely
      username: localStorage.getItem("username"),
      isLoadding: true,
      intervalId: 0,
      state : localStorage.setItem("state", "listofcommands")
    };
  },
  mounted() {
    this.intervalId = setInterval(() => {
      if(localStorage.getItem("state") == "listofcommands")
      {
        this.getData();
      }
    }, 3000);
  },
  methods: {
    async getData() {
  // Partie des valeurs indésirables
  let id = localStorage.getItem("CommandID");
  //console.log(id);
  if (id != "") {
    this.UndesirableIDS.push(id);
    localStorage.setItem("CommandID", "");
  }
  console.log("Voici les id à ne pas afficher : ");
  //console.log(this.UndesirableIDS);

  // Récupération des données
  try {
    const response = await axios.get(
      "http://localhost/commandes/all/available",
      {
        headers: {
          "auth-token": this.token,
        },
        params: {
          undesirable_ids: this.UndesirableIDS
        }
      }
    );
    this.Selectedtitle = response.data;
    //console.log(this.Selectedtitle);

    this.FiltredTable = [];
    this.Selectedtitle.forEach((element) => {
      if (!this.UndesirableIDS.includes(element._id)) {
        this.FiltredTable.push(element);
      }
    });
    this.isLoadding = false;
  } catch (error) {
    console.error(error);
  }
},
  },
};
</script>

<template>
  <h1 class="text-center">Requêtes en cours</h1>
  <div class="container" v-if="!isLoadding">
    <div class="row">
      <div class="col-3" v-for="item in FiltredTable" :key="item._id">
        <counters
          :username_customer="item.username"
          :costumer_adress="item.delivery_person.delivery_location"
          :restaurant_name="item.restaurant.name"
          :restaurant_adress="item.restaurant.location"
          :total_price="item.order.total_cost"
          :timeDelivered="item.order.time_placed"
          :id = "item._id"
        />
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
.text-center {
  text-align: center;
  color: hsla(160, 100%, 37%, 1);
}

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

/* animation text loading */
.loading {
  position: relative;
  animation: loading 1s infinite;
}

@keyframes loading {
  0% {
    color: hsla(160, 100%, 37%, 1);
  }
  50% {
    color: hsla(160, 100%, 37%, 0.5);
  }
  100% {
    color: hsla(160, 100%, 37%, 1);
  }
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