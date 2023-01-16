<template>

    <div class="counters widget">
      <div v-if="showElement">
        <div class="counters__title">
          <h3>{{ RestaurantName }}</h3>
        </div>
        <div class="container">
          <div class="col-4"><p> Adresse du restaurant : {{  RestaurantAddress }}</p></div>
          <div class="col-4"><p>Date de la commande : {{  TimePlaced }}</p></div>
          <div class="col-4">Date de la livraison prévue : {{  TimeDelivered }}</div>
          <div class="col-4 error">{{ ErrorDisplay }}</div>
        </div>
        <input class="input-text" type="text" placeholder="Entrez le code de la commande" v-model="inputContentRestaurateur" />  
        <div class="bottom">
          <div class="row">
            <button class="button" @click="doneOrder">Confirmer la reception</button>
          </div>
        </div>
      </div>


      <div v-if="!showElement">
        <div class="counters__title">
          <h3>{{ CustomerUsername }}</h3>
        </div>
        <div class="container">
          <div class="col-4"><p> Adresse du client : {{  CustomerAddress }}</p></div>
          <div class="col-4"><p>Date de la commande : {{  TimePlaced }}</p></div>
          <div class="col-4">Date de la livraison prévue : {{  TimeDelivered }}</div>
          <div class="col-4 error">{{ ErrorDisplay }}</div>
        </div>
        <input class="input-text" type="text" placeholder="Entrez le code de la commande" v-model="inputContentClient" />  
        <div class="bottom">
          <div class="row">
            <button class="button" @click="doneOrder">Terminer la livraison</button>
          </div>
        </div>
      </div>
        
       
    </div>
</template>
<script lang="ts">
import ChoosenCommandVue from '@/views/AcceptedCommandsView.vue';
import axios from "axios";


export default{
    name: "activeOrders",
    props: {
        RestaurantAddress: {
            type: String,
            required: true
        },
        RestaurantName: {
            type: String,
            required: true
        },
        CustomerUsername: {
            type: String,
            required: true
        },
        CustomerAddress: {
            type: String,
            required: true
        },
        TimePlaced:
        {
            type: String,
            required: true
        },
        TimeDelivered:
        {
            type: String,
            required: true
        },
        Status:
        {
            type: String,
            required: true
        }

        
    },
    mounted() {
      console.log("L'état vaut " + this.Status);
        if(this.Status == "En cours"){
          this.showElement = true;
        }else if(this.Status == "Livraison"){
          this.showElement = false;
        }
    },
    data() {
        return {
          showElement: true,
          inputContentRestaurateur: "",
          inputContentClient: "",
          token: localStorage.getItem('token'), // token should be stored securely
          username: localStorage.getItem('username'),
          ValidationCodeRestaurateur: false,
          ValidationCodeClient: false,
          ErrorDisplay: ""
        };
    },
    methods: {
        doneOrder() {
          this.updateCommandesStatus(this.CustomerUsername, this.CustomerAddress, this.RestaurantName, this.RestaurantAddress, this.TimePlaced, this.TimeDelivered);
        },
        async updateCommandesStatus(username_customer : string, costumer_adress: string, restaurant_name: string, restaurant_adress: string, timePlaced: string, timeDelivered: string) {
            var inputContent = "";
            var etape = "";
            if(this.showElement){
              inputContent = this.inputContentRestaurateur;
              etape = "1";
            }else{
              inputContent = this.inputContentClient;
              etape = "2";
            }
            if(etape == "1"){
              try {
              const response = await axios.put("http://localhost:5502/commandes/update/validation/restaurant", {
                username : username_customer,
                costumerAddress: costumer_adress,
                restaurantAdress : restaurant_adress,
                restaurantName : restaurant_name,
                time_delivered : timeDelivered,
                time_placed : timePlaced,
                usernameLivreur : this.username,
                inputContent : inputContent
              }, {
                headers: {
                  "auth-token": this.token
                }
              });
              console.log("Bien joué");
              console.log(response.data.message);
              console.log(response.data);
              
              if(response.data.message == "Code Restaurateur Valide")
              {
                this.showElement = false;
                console.log(this.inputContentRestaurateur);
                console.log("Livraison bien recpetionnée");
                this.inputContentRestaurateur = "";
                this.ErrorDisplay = "";
              }
            } catch (error) {
              console.error(error);
              this.ErrorDisplay = "Code invalide";
            }
            }else if(etape == "2")
            {
              try {
              const response = await axios.put("http://localhost:5502/commandes/update/validation/client", {
                username : username_customer,
                costumerAddress: costumer_adress,
                restaurantAdress : restaurant_adress,
                restaurantName : restaurant_name,
                time_delivered : timeDelivered,
                time_placed : timePlaced,
                usernameLivreur : this.username,
                inputContent : inputContent
              }, {
                headers: {
                  "auth-token": this.token
                }
              });
              console.log(response.data);
              if(response.data.message == "Code Client Valide")
              {
                this.showElement = true;
                console.log(this.inputContentClient);
                console.log("Livraison terminee");
                this.inputContentClient = "";
                this.ErrorDisplay = "";
              }
            } catch (error) {
              console.error(error);
              this.ErrorDisplay = "Code invalide";
            }
            }

          }
    }
    }

</script>

<style scoped>

.input-text {
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    padding: 12px 20px;
    resize: vertical;
}

.error{
  color: red;
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