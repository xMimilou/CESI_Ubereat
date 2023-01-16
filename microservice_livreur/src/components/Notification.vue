<template>
  <div class="notification" v-if="showNotification">
      <div class="notification__content">
          <div class="notification__content__title">
              <h3> Nouvelle commande disponible </h3>
              <button class="notification__content__title__close" @click="close">X</button>
          </div>
      </div>
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
      notificationMessage: '',
      title: '',
      token: localStorage.getItem("token"),
      count:''
    }
  },
  mounted() {
    setInterval(() => {
        this.getData();
    }, 10000);
    this.getData();
  },methods: {
  close()
    {
      this.showNotification = false;
    },
    async getData() {
      try {
        const response = await axios.post(
          "http://localhost:5502/commandes/count",
          {},
          {
            headers: {
              "auth-token": this.token,
            },
          }
        );

        if(this.count != response.data)
        {
          this.showNotification = true;
          this.count = response.data;
          console.log(this.count);
        }
      } catch (error) {
        console.error(error);
      }
    }
}
}
</script>


<style scoped>
/* display notification at right top with appearing animation and desepear animation */
.notification {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px #ccc;
    animation: appear 0.5s ease-in-out;
    z-index: 999;
}

.notification__content {
    padding: 10px;
}

.notification__content__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.notification__content__title__close {
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.notification__content__body {
    margin-top: 10px;
}

@keyframes appear {
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(0);
    }
}

@keyframes disappear {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(100%);
    }
}



</style>

