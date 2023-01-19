<template>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Total Revenue</v-card-title>
            <v-card-text>{{ totalRevenue }}</v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>Number of Orders</v-card-title>
            <v-card-text>{{ numberOfOrders }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Top Selling Menu Item</v-card-title>
            <v-card-text>{{ topSellingMenuItem }}</v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>Popular Delivery Location</v-card-title>
            <v-card-text>{{ popularDeliveryLocation }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Most Visited Restaurant</v-card-title>
            <v-card-text>{{ mostVisitedRestaurant }}</v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>Average Order Value</v-card-title>
            <v-card-text>{{ averageOrderValue }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>


<script lang="ts">

import axios from 'axios';
// import {Menu, Restaurant} from '@/utils/interfaces';
import {getOrders, getRestaurants} from '@/utils/helpers';

export default {
  data: () => ({
    totalRevenue: 0,
    numberOfOrders: 0,
    topSellingMenuItem: '',
    popularDeliveryLocation: '',
    mostVisitedRestaurant: '',
    averageOrderValue: 0
  }),
/*
  created() {
    getOrders.then(response => {
          // calculate total revenue
          this.totalRevenue = response.reduce((acc: any, order: any) => acc + order.order.total_cost, 0);
          // calculate number of orders
          this.numberOfOrders = response.length;
          // calculate top selling menu item
          let menuItemCount = {};
          response.forEach((order: any) => {
            order.order.menus.forEach((menu: any) => {
              menuItemCount[menu.name] = menuItemCount[menu.name] ? menuItemCount[menu.name] + 1 : 1;
            });
          });
          this.topSellingMenuItem = Object.keys(menuItemCount).reduce((a, b) => menuItemCount[a] > menuItemCount[b] ? a : b);
          // calculate popular delivery location
          let deliveryCount = {};
          response.forEach((order: any) => {
            deliveryCount[order.order.delivery_person.delivery_location] = deliveryCount[order.order.delivery_person.delivery_location] ? deliveryCount[order.order.delivery_person.delivery_location] + 1 : 1;
          });
          this.popularDeliveryLocation = Object.keys(deliveryCount).reduce((a, b) => deliveryCount[a] > deliveryCount[b] ? a : b);
      })
      .catch((error: any) => {
          console.log(error)
      });

      getRestaurants.then((response: any) => {
          // calculate most visited restaurant
          let restaurantCount = {};
          response.forEach((restaurant: any) => {
            restaurantCount[restaurant.name] = restaurantCount[restaurant.name] ? restaurantCount[restaurant.name] + 1 : 1;
          });
          this.mostVisitedRestaurant = Object.keys(restaurantCount).reduce((a, b) => restaurantCount[a] > restaurantCount[b] ? a : b);
          // calculate average order value
          axios.get('api/restorer/orders')
            .then((response: any) => {
                this.averageOrderValue = this.totalRevenue / this.numberOfOrders;
            })
            .catch((error: any) => {
                console.log(error)
            });
      })
      .catch((error: any) => {
          console.log(error)
      });
  }
  */

}

</script>