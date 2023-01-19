<template>
    <!-- <h1>Welcome to the ORDERS view!</h1> -->
    <v-alert v-model="alert" type="error" :dismissible="dismissible" :timeout="timeout" >   
      Order Refused!
    </v-alert> 
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Id
          </th>
          <th class="text-left">
            Restaurant
          </th>
          <th class="text-left">
            Location
          </th>
          <th class="text-left">
            Total price
          </th>
          <th class="text-left">
            Deliver username
          </th>
          <th class="text-left">
            Client username
          </th>
          <th class="text-left">
            Custumer adress
          </th>
          <th class="text-left">
            Delivery time
          </th>
          <th class="text-left">
            Status
          </th>
          <th class="text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order._id"
        >
          <td>{{ order._id }}</td>
          <td>{{ order.restaurant?.name }}</td>
          <td>{{ order.restaurant?.location }}</td>
          <td>{{ order.order.total_cost }}</td>
          <td>{{ order.order.delivery_person.deliver_username }}</td>
          <td>{{ order.client }}</td>
          <td>{{ order.order.delivery_person.delivery_location }}</td>
          <td>{{ order.order.time_delivered }}</td>
          <td>{{ order.order.status }}</td>
          <td>
            <!-- <v-icon color="green" small class="mr-2" @click="validateOrder(order._id)" icon="$check"></v-icon>
            <v-icon color="blue" small class="mr-2" @click="updateOrder(order._id)" icon="$update"></v-icon>
            <v-icon color="red" small @click="deleteOrder(order._id)" icon="$delete"></v-icon> -->
            <v-btn color="success" class="ma-2" @click="validateOrder(order._id), showAlert">
                <v-icon icon="$check"></v-icon>
                Accept
            </v-btn>
            <v-btn color="error" class="ma-2" @click="refuseOrder(order._id), showAlert">
                <v-icon icon="$close"></v-icon>
                Refuse
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import store from '@/store';

import vuetify from 'vuetify';

export default defineComponent({
    name: 'OrdersView',
    data(){
      return {
        alert: false,
        dismissible: true,
        timeout: 3000      
      }
    },
    computed: {
        orders(){
            return store.state.orders
        },
    },
    methods: {
        updateOrder(id: string){

        },
        deleteOrder(id: string){
            store.dispatch('deleteOrder', id);
        },
        validateOrder(id: string){
            store.dispatch('validateOrder', id);
            this.$router.go(0);
        },
        refuseOrder(id: string){
            store.dispatch('refuseOrder', id);
            this.$router.go(0);
        },
        showAlert() {
            this.alert = true;
        },
    },
    mounted(){
        store.dispatch('fetchOrders')
    },

});

</script>

<style></style>