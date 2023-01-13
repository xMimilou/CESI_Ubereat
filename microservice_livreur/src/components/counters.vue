<template>

    <div class="counters widget" v-if="!SelectedOrder">
        <div class="counters__title">

        </div>
        <div class="counters__content">
        <div class="counters__content__item">
            <div class="counters__content__item__text">

            <div class="display_val">
                <button @click="onSubmit(username_customer,costumer_adress,restaurant_name,restaurant_adress,total_price,timeDelivered)" class="button">Accepter</button>
                
                <button class="button" @click="onRemoveCommand(username_customer,costumer_adress,restaurant_name,restaurant_adress,total_price,timeDelivered)" >Refuser</button>
            </div>
            </div>
        </div>
        </div>
        <h3> {{ username_customer }} </h3>
        <h3>{{ costumer_adress }}</h3>
            <h3>{{ restaurant_name }}</h3>
    <h3>{{ restaurant_adress }}</h3>
    <h3>{{ total_price }}</h3>
    <h3> {{ timeDelivered }} </h3>

    
    </div>

    <div v-if="SelectedOrder">
      <h1> </h1>
    </div>

</template>
<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import counters from './counters.vue'
import ChoosenCommandVue from '@/views/ChoosenCommand.vue';
import LisOfCommandsView from '@/views/ListOfCommandsView.vue';


export default{
    name: "counters",
    props: {
        costumer_adress: {
            type: String,
            required: true
        },
        restaurant_name: {
            type: String,
            required: true
        },
        restaurant_adress: {
            type: String,
            required: true
        },
        total_price: {
            type: String,
            required: true
        },
        timeDelivered: {
            type: String,
            required: true
        },
        username_customer: {
            type: String,
            required: true
        },
        Selectedtitled: {
          type: String,
          default : "",
          required : false
        }
    },
    data() {
        return {
            count: 10,
            Selectedtitle : "",
            SelectedOrder: false,
            ArrayToCollectID: [],
            Empty: ""
        };
    },
    mounted() {
        //this.getCount()
    },
    methods: {
        onSubmit(username_customer : string, costumer_adress: string, restaurant_name: string, restaurant_adress: string, total_price: string, timeDelivered: string) {
          var usernameCollected = localStorage.getItem('username');
          console.log(usernameCollected);


          console.log(this.username_customer);
          //this.Selectedtitle = title;
          const data = {
            username : username_customer,
            costumerAddress: costumer_adress,
            restaurantAdress : restaurant_adress,
            restaurantName : restaurant_name,
            total_price: total_price,
            time_delivered : timeDelivered,
            statusDeliver : "En cours",
            usernameLivreur : usernameCollected
          };
          


            

            // Récupération des données existantes
            axios.get('http://localhost:5501/posts')
            .then(response => {
            // Vérification de l'existence de la donnée
            const existingData = response.data;
            let dataExist = false;
            existingData.forEach(dataToCheck => {
              console.log(dataToCheck);
              console.log("Le username de la bdd " + dataToCheck.username + " le username de la bde " + data.username);
            if (dataToCheck.usernameLivreur === data.usernameLivreur && dataToCheck.username === data.username && dataToCheck.costumerAddress === data.costumerAddress && dataToCheck.restaurantAdress === data.restaurantAdress && dataToCheck.restaurantName === data.restaurantName && dataToCheck.total_price === data.total_price && dataToCheck.time_delivered === data.time_delivered) {
                dataExist = true;
            }
            });
            if (dataExist) {
              console.log('La donnée existe déjà');
            } else {
            // Envoi de la requête axios.post
            axios.post('http://localhost:5501/posts', data)
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.log(error);
            });
              }
            })
            .catch(error => {
              console.log('Erreur lors de la récupération des données existantes');
            });

          const dataToPut = {
            statusDeliver : "En cours"
          };
          // Collecte de l'id de la commande
          axios.get('http://localhost:5500/posts')
          .then(response => {
            //console.log(response.data); 
            this.ArrayToCollectID = response.data;
            //console.log(this.ArrayToCollectID);
            
            this.ArrayToCollectID.forEach((element) => {
            //console.log("Le statut : ");
            //console.log(element.order.status);
            const dataToPut = {
              status : "En cours"
            };

            if(element.order.status != "Delivered" && element.delivery_person.deliver_username == this.Empty && element.username == this.username_customer && element.delivery_person.delivery_location == this.costumer_adress && element.restaurant.name == this.restaurant_name && element.restaurant.location == this.restaurant_adress && element.order.total_cost == this.total_price && element.order.time_placed == this.timeDelivered)
            {
              console.log("L'id de la commande est : " + element._id);
              axios.put(`http://localhost:5500/posts/${element._id}/${usernameCollected}`, dataToPut)
              .then(response => {
                console.log(response.data);
              })
              .catch(error => {
                console.log(error);
            });
              //localStorage.setItem('CommandID', element._id);
            }
            });

           })
          .catch(error => {
            console.log(error);
          });
            
          this.$router.replace({path: "/choosencommand"});
  
        
        },onRemoveCommand(username_customer : string, costumer_adress: string, restaurant_name: string, restaurant_adress: string, total_price: string, timeDelivered: string) {
          
          axios.get('http://localhost:5500/posts')
          .then(response => {
            //console.log(response.data); 
            this.ArrayToCollectID = response.data;
            //console.log(this.ArrayToCollectID);
            
            this.ArrayToCollectID.forEach((element) => {
            //console.log("Le statut : ");
            //console.log(element.order.status);
            const dataToPut = {
              status : "En cours"
            };

            if(element.order.status != "Delivered" && element.delivery_person.deliver_username == this.Empty && element.customer_username == username_customer && element.delivery_person.delivery_location == costumer_adress && element.restaurant.name == restaurant_name && element.restaurant.location == restaurant_adress && element.order.total_cost == total_price && element.order.time_placed == timeDelivered)
            {
              console.log("L'id de la commande est : " + element._id);
              localStorage.setItem('CommandID', element._id);
            }
            });

           })
          .catch(error => {
            console.log(error);
          });
        }
    },
    components: { ChoosenCommandVue }
}
</script>

<style scoped>
.display_val {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  font-size: 15px;
}
/* drow line after title */
.counters__title::after {
  content: "";
  display: block;
  width: 70%;
  height: 2px;
  background-color: hsla(0, 0%, 59%, 0.2);
  margin: 0 auto;
  /* vertical align center */
  margin-top: 12px;
}
.counters__title {
  display: flex;
  flex: 1;
  width: 100%;
  margin: 20px auto;
  line-height: 1em;
  font-weight: 50px;
  font-size: 20px;
  height: 20%;
  justify-content: start;
  color: hsla(160, 100%, 37%, 1);
}
/* .counters__title {
  display: flex;
  flex: 1;
  width: 70%;
  margin: 20px auto;
  line-height: 1em;
  font-weight: 50px;
  font-size: 20px;
  height: 20%;
  justify-content: start;
  color: hsla(160, 100%, 37%, 1);
} */
.counters {
  width: 100%;
  height: 300px;
  max-height: 300px;
  background-color: var(--color-widget);
  border-radius: 10px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
.counters__content {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.counters__content__item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.counters__content__item__number {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.counters__content__item__number h1 {
  font-size: 2rem;
  font-weight: 500;
  color: var(--color-text);
}
.counters__content__item__text {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.counters__content__item__text h3 {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-text);
}


.button {
        padding: 10px 50px;
        margin: 10px 4px;
        color: hsla(160, 100%, 37%, 1);
        font-family: sans-serif;
        text-transform: uppercase;
        text-align: center;
        position: relative;
        text-decoration: none;
        display: inline-block;
      }


.button {
  border: 1px solid transparent;
  -webkit-transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
}
.button::before {
  content: "";
  position: absolute;
  left: 0px;
  bottom: 0px;
  z-index: -1;
  width: 0%;
  height: 1px;
  background: #00ff40;
  box-shadow: inset 0px 0px 0px #b6cdef;
  display: block;
  -webkit-transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
}
.button:hover::before {
  width: 100%;
}
.button::after {
  content: "";
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: -1;
  width: 0%;
  height: 1px;
  background: #a9c1e8;
  -webkit-transition: all 0.4s cubic-bezier(0.7, 0.25, 0, 1);
  transition: all 0.4s cubic-bezier(0.7, 0.25, 0, 1);
}
.button:hover::after {
  width: 100%;
}
.button:hover {
  border-left: 1px solid #b6cdef;
  border-right: 1px solid #6098ff;
}
</style>