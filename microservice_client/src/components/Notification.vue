<template>
  <div class="notification" v-if="showNotification">
    <div class="notification__content">
      <div class="notification__content__title">
        <p>Commande en cours d'acheminement</p>
        <button
          class="notification__content__title__close"
          @click="close"
        >Close</button>
      </div>
    </div>
  </div>
</template>
  <script lang="ts">
import axios from "axios";
import { mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent ({
  name: "Notification",

  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      showNotification: false,
      notificationMessage: "",
      title: "",
      count: -1,
    };
  },
  mounted() {
    setInterval(() => {
      this.getData();
    }, 10000);
    this.getData();
  },
  methods: {
    close() {
      this.showNotification = false;
    },
    async getData() {
      try {
        const response = await axios.post(
          "http://localhost:5502/commandes/count/username",
          { username: this.user.username },
          { headers: { "auth-token": localStorage.getItem("token") } }
        );
        console.log(this.count + " " + response.data);

        if (this.count !== -1 && this.count !== response.data) {
          this.showNotification = true;
          this.count = response.data;
        } else if (this.count === -1) {
          this.count = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
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
  z-index: 10000;
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
  