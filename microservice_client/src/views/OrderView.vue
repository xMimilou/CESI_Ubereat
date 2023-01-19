<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card_header">
        <h3>Suivi et historique des commandes</h3>
      </div>
      <div class="card_content">
        <table class="table">
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
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="commande in commandes" :key="commande._id">
              <td>{{ commande._id }}</td>
              <td>{{ commande.restaurant.name }}</td>
              <td>{{ commande.restaurant.location }}</td>
              <td>{{ commande.order.total_cost }}</td>
              <td>{{ commande.delivery_person.deliver_username }}</td>
              <td>{{ commande.username }}</td>
              <td>{{ commande.delivery_person.delivery_location }}</td>
              <td>{{ commande.order.time_delivered }}</td>
              <td>{{ commande.order.status }}</td>
              <td v-if="commande.order.status === 'Delivered'">
                <button class="btn btn-secondary btn-block" @click="deleteCommand(commande._id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
    
<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    let commandes = ref();

    async function getCommand() {
      try {
        const response = await axios.post(
          "http://localhost:5502/commandes/all/username",
          { username: store.getters.user.username },
          { headers: { "auth-token": localStorage.getItem("token") } }
        );
        commandes.value = response.data;
        console.log(commandes)
      } catch (error) {
        console.error(error);
      }
    }
    async function deleteCommand(id: number) {
      try {
        const response = await axios.delete(
          `http://localhost:5502/commandes/${id}`,
          { headers: { "auth-token": localStorage.getItem("token") } }
        );
        console.log(response.data)
        getCommand();
      } catch (error) {
        console.error(error);
      }
    }

    getCommand();
    return {
      commandes,
      deleteCommand
    };
  },
});
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
form {
  width: 100%;
}
.container-fluid {
  margin-top: 45px;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
}

.card_content {
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
</style>