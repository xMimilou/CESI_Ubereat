<template>
    <div class="notification" v-if="display">
        <div class="notification__content">
            <div class="notification__content__title">
                <h3>{{ title }}</h3>
                <button class="notification__content__title__close" @click="close">X</button>
            </div>
            <div class="notification__content__body">
                <p>{{ body }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
    name: "notification",
    data() {
        return {
            display: false,
            title: '',
            body: ''
        }
    },
    // make async mounted() and call getNotification() method and call it every 10 seconds
    mounted() {
        this.getNotification()
        setInterval(this.getNotification, 10000)
    },
    methods: {
        // query http://localhost:3001/commercial/notification
        async getNotification() {
            var token = localStorage.getItem('token');
            var username = localStorage.getItem('username');
            var status = ''
            if (localStorage.getItem('notification_status')) {
                status = localStorage.getItem('notification_status')
            }
            else {
                status = ''
                console.log("no status")
            }
            var request = 'http://localhost:3001/commandes/notification'
            axios.post(request, {}, { headers: { 'auth-token': token, 'username': username, "status": status } }).then((response) => {
                if (response.data.status != "no change") {
                    this.show("Votre commandes arrive", response.data.status)
                    localStorage.setItem('notification_status', response.data.status)
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        close() {
            this.display = false
        },
        show(title: string, body: string) {
            this.title = title
            this.body = body
            this.display = true
            setTimeout(() => {
                this.display = false
            }, 10000)
        }
    }
})

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
