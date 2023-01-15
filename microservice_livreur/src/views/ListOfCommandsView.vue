<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Notification from "../components/Notification.vue";
import counters from "../components/counters.vue";
import ChoosenCommand from "./ChoosenCommand.vue";
</script>

<script lang="ts">
import axios from "axios";
export default {
  name: "ListOfCommandsView",
  components: {
    ChoosenCommand,
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
    };
  },
  mounted() {
    setInterval(() => {
      this.getData();
    }, 3000);
    //this.getData();
  },
  methods: {
    async getData() {
      // Partie des valeurs indésirables
      let id = localStorage.getItem("CommandID");
      console.log(id);
      if (id != "") {
        this.UndesirableIDS.push(id);
        localStorage.setItem("CommandID", "");
      }
      console.log("Voici les id à ne pas afficher : ");
      console.log(this.UndesirableIDS);

      // Récupération des données
      try {
        const response = await axios.post(
          "http://localhost:5502/commandes/all/available",
          {},
          {
            headers: {
              "auth-token": this.token,
            },
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
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<template>
  <h1 class="text-center">Requêtes en cours</h1>
  <div class="container">
    <div class="row">
      <div class="col-3" v-for="item in FiltredTable" :key="item._id">
        <counters
          :username_customer="item.username"
          :costumer_adress="item.delivery_person.delivery_location"
          :restaurant_name="item.restaurant.name"
          :restaurant_adress="item.restaurant.location"
          :total_price="item.order.total_cost"
          :timeDelivered="item.order.time_placed"
        />
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
</style>