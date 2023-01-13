<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Notification from '../components/Notification.vue';
  import counters from '../components/counters.vue';
import ChoosenCommand from './ChoosenCommand.vue';

</script>

<script lang="ts">
import axios from 'axios';
export default{
  name: 'ListOfCommandsView',
  components: {
    ChoosenCommand
},data() {
    return {
      count: 10,
      Selectedtitle : [

      ],FiltredTable : [

      ],
      Empty: "",
      UndesirableIDS : []
    }
  },mounted() {
  setInterval(() => {
    this.getData();
  }, 3000);
  //this.getData();
},methods: {
    getData() {

      // Partie des valeurs indésirables
      let id = localStorage.getItem("CommandID");
      console.log(id);
      if(id != "") {
        this.UndesirableIDS.push(id);
        localStorage.setItem('CommandID', "");
      }
      console.log("Voici les id à ne pas afficher : ");
      console.log(this.UndesirableIDS);


      // Récupération des données
      axios.get('http://localhost:5500/posts')
          .then(response => {
            //console.log(response.data); 
            this.Selectedtitle = response.data;
            //console.log(this.Selectedtitle);
            
            this.FiltredTable = [];
            this.Selectedtitle.forEach((element) => {
            
            //console.log("Le statut : ");
            //console.log(element.order.status);
            if(element.order.status != "Delivered" && element.delivery_person.deliver_username == this.Empty)
            {
              
              
              if(!this.UndesirableIDS.includes(element._id))
              {
                this.FiltredTable.push(element);
              }
              
            }

            });

           })
          .catch(error => {
            console.log(error);
  });

    }
    
  }
}

</script>

<template>
  <h1> Requêtes en cours </h1>
  <div class="container">
    <div class="container" v-for="item in FiltredTable" :key="item._id">
      <counters :username_customer='item.username' :costumer_adress = 'item.delivery_person.delivery_location' :restaurant_name ='item.restaurant.name' :restaurant_adress='item.restaurant.location' :total_price='item.order.total_cost' :timeDelivered = 'item.order.time_placed' />
    </div>
  </div>
</template>



<style scoped>
.columns-6 {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
}
.columns-12 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
}
.widget {
  width: 100%;
  padding: 1rem;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.row {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.columns-3 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
}




</style>