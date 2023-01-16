<template>
  <div class="counters widget" v-if="!SelectedOrder">
    <div class="counters__title">
      <h3>{{ username_customer }}</h3>
    </div>
    <div class="counters__content">
      <div class="container">
          <div class="col-4"><p>Addresse du client : {{ costumer_adress }}</p></div>
          <div class="col-4"><p>Nom du restaurant : {{ restaurant_name }} / {{ restaurant_adress }} </p></div>
          <div class="col-4">Horaire de livraison : {{ timeDelivered }}</div>

      </div>
      <div class="bottom">
        <div class="row">
          <div class="col-6"><button
              @click="
                onSubmit(
                  username_customer,
                  costumer_adress,
                  restaurant_name,
                  restaurant_adress,
                  total_price,
                  timeDelivered
                )
              "
              class="button"
            >
              Accepter
            </button>
        </div>
          <div class="col-6"><button
              class="button"
              @click="
                onRemoveCommand(
                  username_customer,
                  costumer_adress,
                  restaurant_name,
                  restaurant_adress,
                  total_price,
                  timeDelivered
                )
              "
            >
              Refuser
            </button></div>
        </div>
      </div>
    </div>

    
  </div>

  <div v-if="SelectedOrder">
    <h1></h1>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import counters from "./counters.vue";
import AcceptedCommands from "@/views/AcceptedCommandsView.vue";
import LisOfCommandsView from "@/views/ListOfCommandsView.vue";

export default {
  name: "counters",
  props: {
    costumer_adress: {
      type: String,
      required: true,
    },
    restaurant_name: {
      type: String,
      required: true,
    },
    restaurant_adress: {
      type: String,
      required: true,
    },
    total_price: {
      type: String,
      required: true,
    },
    timeDelivered: {
      type: String,
      required: true,
    },
    username_customer: {
      type: String,
      required: true,
    },
    Selectedtitled: {
      type: String,
      default: "",
      required: false,
    },
    id: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      count: 10,
      Selectedtitle: "",
      SelectedOrder: false,
      ArrayToCollectID: [],
      Empty: "",
      token: localStorage.getItem("token"), // token should be stored securely
      username: localStorage.getItem("username"),
      data: {},
      commandes: [],
    };
  },
  mounted() {
    //this.getCount()
  },
  methods: {
    onSubmit(
      username_customer: string,
      costumer_adress: string,
      restaurant_name: string,
      restaurant_adress: string,
      total_price: string,
      timeDelivered: string
    ) {
      var usernameCollected = localStorage.getItem("username");
      console.log(usernameCollected);

      /*
          console.log(username_customer + " " + costumer_adress + " " + restaurant_name + " " + restaurant_adress + " " + total_price + " " + usernameCollected);
          axios.post("http://localhost:5502/commandesSuivies/create", {
              "username": username_customer,
              "costumerAddress": costumer_adress,
              "restaurantName": restaurant_name,
              "restaurantAdress": restaurant_adress,
              "total_price": total_price,
              "order_time": timeDelivered,
              "statusDeliver": "En cours",
              "usernameLivreur": usernameCollected
          }, {
              headers: {
                  "auth-token": this.token
              }
          })
          .then(response => console.log(response.data))
          .catch(error => console.log(error));
          
          */

      // Update de la table des commandes

      this.updateCommandesStatus(
        username_customer,
        costumer_adress,
        restaurant_name,
        restaurant_adress,
        total_price,
        timeDelivered
      );
      this.$router.replace({ path: "/choosencommand" });
    },
    onRemoveCommand(
      username_customer: string,
      costumer_adress: string,
      restaurant_name: string,
      restaurant_adress: string,
      total_price: string,
      timeDelivered: string
    ) {
      this.getCommandes(
        username_customer,
        costumer_adress,
        restaurant_name,
        restaurant_adress,
        total_price,
        timeDelivered
      );
    },
    async getCommandes(
      username_customer: string,
      costumer_adress: string,
      restaurant_name: string,
      restaurant_adress: string,
      total_price: string,
      timeDelivered: string
    ) {
      try {
    const response = await axios.get(
      "http://localhost:5502/commandes/selected",
      {
        headers: {
          "auth-token": this.token,
        },
        params: {
          id: this.id
        }
      }
    );
    this.commandes = response.data[0];
    var id = this.commandes._id;
    localStorage.setItem("CommandID", id);
    //console.log(this.commandes._id);
  } catch (error) {
    console.error(error);
  }
    },
    async updateCommandesStatus(
      username_customer: string,
      costumer_adress: string,
      restaurant_name: string,
      restaurant_adress: string,
      total_price: string,
      timeDelivered: string
    ) {
      try {
        const response = await axios.put(
          "http://localhost:5502/commandes/update",
          {
            username: username_customer,
            costumerAddress: costumer_adress,
            restaurantAdress: restaurant_adress,
            restaurantName: restaurant_name,
            total_price: total_price,
            time_delivered: timeDelivered,
            statusDeliver: "En cours",
            usernameLivreur: this.username,
            id : this.id
          },
          {
            headers: {
              "auth-token": this.token,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  components: { AcceptedCommands },
};
</script>

<style scoped>

.bottom{
  /* display this element at bottom of the counter */
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  /* align center */
  text-align: center;
}

.row{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  /* align center */
  text-align: center;
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
  margin-left: 5px;
}
.counters {
  width: 100%;
  height: 200px;
  max-height: 200px;
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