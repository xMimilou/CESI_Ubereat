<template>
  <div>
    <notification v-if="showNotification" :message="notificationMessage" />
  </div>
</template>
<script lang="ts">
import axios from 'axios';

type Order = {
  seen: boolean;
  // Ajoutez ici les autres propriétés de votre objet Order
}
let source: any;

export default {
  name: 'Notification',
  data() {
    return {
      showNotification: false,
      notificationMessage: ''
    }
  },
  created() {
    source = axios.CancelToken.source();

    const checkForNewOrders = () => {
      axios.get('http://localhost:3000/orders', {
        cancelToken: source.token
      }).then(response => {
        const newOrderReceived = response.data.some((order: Order) => !order.seen);
        if (newOrderReceived) {
          this.showNotification = true;
          this.notificationMessage = 'Nouvelle commande reçue!';
          setTimeout(() => {
            this.showNotification = false;
          }, 3000);
        }
      }).catch(error => {
        console.log(error);
      });
    }
    console.log('Livreur created');
    checkForNewOrders();
    setInterval(checkForNewOrders, 5000);
  },
  beforeDestroy() {
    source.cancel();
  }
};
</script>
