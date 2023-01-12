<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Notification from '../components/Notification.vue';
  import counters from '../components/counters.vue';
import ChoosenCommand from './ChoosenCommand.vue';

</script>

<script lang="ts">
import axios from 'axios';
export default{
  components: {
    ChoosenCommand
},data() {
    return {
      count: 10,
      Selectedtitle : []
    }
  },created() {
    this.getData();
  },methods: {
    getData() {
      axios.get('http://localhost:5500/posts')
          .then(response => {
            this.Selectedtitle = response.data;
            console.log(response.data["address"]);
            console.log(response.data);         
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