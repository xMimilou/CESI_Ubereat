<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Notification from '../components/Notification.vue';
  import counters from '../components/counters.vue';
import ChoosenCommand from './ChoosenCommand.vue';

</script>

<script lang="ts">
export default{
  components: {
    ChoosenCommand
},data() {
    return {
      count: 10,
      dataImported: [{
        title: "Macdo",
        query: "command",
        distance: "40 km",
        cost: "10€"
      },{
        title: "Macdccveo",
        query: "command",
        distance: "20 km",
        cost: "5€"}]
    }
  }
}
</script>

<template>
  <h1> Requêtes en cours </h1>
  <div class="container">
    <div class="columns-3" v-for="item in dataImported" :key="item.title">
      <counters :title="item.title" :distance='item.distance' :cost='item.cost' query="command"/>
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