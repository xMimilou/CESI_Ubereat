<template>

<div class="container-fluid">
    <div class="card size-2">
        <div class="card_header">
            <h3>Selectionner un utilisateur</h3>
        </div>
        <div class="card_content">
            <form @submit.prevent="GetUserCommand">
                <div class="form-group">
              <label>username</label>
              <input
                type="text"
                class="form-control"
                placeholder="username"
                v-model="form.username"
                id="username"
                name="username"
              />
              <button class="btn btn-primary btn-block" type="submit">
                Afficher les commandes
                </button>
            </div>
            </form>
        </div>
    </div>
    <div class="card size-10">
        <div class="card_header">
            <h3>Commandes de l'utilisateur</h3>
        </div>
        <div class="card_content">
            <table class="table" >
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">restaurant</th>
                        <th scope="col">localisation</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">deliver username</th>
                        <th scope="col">client username</th>
                        <th scope="col">emplacement de livraison</th>
                        <th scope="col">Heure de livraison</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="commande in commandes">
                        <td>{{ commande._id }}</td>
                        <td>{{ commande.restaurant.name }}</td>
                        <td>{{ commande.restaurant.location }}</td>
                        <td>{{ commande.order.total_cost }}</td>
                        <td>{{ commande.delivery_person.deliver_username }}</td>
                        <td>{{ commande.username }}</td>
                        <td>{{ commande.delivery_person.delivery_location }}</td>
                        <td>{{ commande.order.time_delivered }}</td>
                        <td>{{ commande.order.status }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</div>

</template>

<script lang="ts">
import axios from 'axios';

export default {
  name: "adduser",
  data() {
    return {
      form: {
        username: "",
      },
      // make commandes as an array of objects with the following keys _id, name, location, total_cost, time_delivered, status, deliver_username, delivery_location, username
        commandes: [
            {
            _id: "",
            restaurant: {
                name: "",
                location: "",
            },
            order:{
                total_cost: "",
                time_delivered: "",
                status: "",
            },
            delivery_person: {
                deliver_username: "",
                delivery_location: "",
            },
            username: "",
            },
        ],
    };
  },
  mounted() {
    
  },
  methods: {
    async GetUserCommand() {
      try {
        /* send to api http://localhost:3000/users data nom and prenom as json in body with post method */
        var data = {
          username: this.form.username,
        };
        const response = await axios.post(
          "http://localhost:3001/commandes/user/" + this.form.username,
          data, { headers: { "auth-token": localStorage.getItem("token") } }
        );

        // for (var i = 0; i < response.data.length; i++) {
        //   this.commandes[i].username = response.data[i].username;
        //     this.commandes[i].name = response.data[i].restaurant.name;
        //     this.commandes[i].location = response.data[i].restaurant.location;
        //     this.commandes[i].total_cost = response.data[i].order.total_cost;
        //     this.commandes[i].time_delivered = response.data[i].order.time_delivered;
        //     this.commandes[i].status = response.data[i].order.status;
        //     this.commandes[i].deliver_username = response.data[i].delivery_person.deliver_username;
        //     this.commandes[i].delivery_location = response.data[i].delivery_person.delivery_location;
        //     this.commandes[i]._id = response.data[i]._id;
        // }
        // get the response data and put it in the commandes array

        this.commandes = response.data;
        console.log(this.commandes);


        
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>


/* always display table header */
table {
  width: 100%;
  
  border-collapse: collapse;
  text-align: center;
  table-layout: fixed;
}

/* don't display table if go outside the .counter-content */

/* make a scrool bar in table body */
table tbody {
  overflow: scroll;
}


table th,
table td {
  padding: 5px;
}

table tr:nth-child(even) {
  background-color: hsla(160, 100%, 37%, 0.2);
}
table tr:hover {
  background-color: hsla(0, 0%, 59%, 0.2);
}
th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
}



form{
    width: 100%;
    
}

.h3 {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.2;
    color: #212529;
}


.form-group {
  margin-bottom: 0.5rem;
  width: 100%;
}
.form-control {
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  width: 100%;
}

.container-fluid {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
}


.btn {
  background: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  /* align item center of the line */
  display: flex;
  justify-content: center;
  align-items: center;
  /* align table center */
  margin-left: auto;
  margin-right: auto;
  /* display grid border */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
}


.card_content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    width: 100%;
    height: 100%;
}

.card {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.card_header {
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

.size-2 {
    width: 20%;
}

.size-10 {
    width: 80%;
}

</style>