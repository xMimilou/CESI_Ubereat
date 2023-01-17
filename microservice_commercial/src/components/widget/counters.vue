<!-- <script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios';
defineProps<{
  title: string
  query: string
  units: string, required: false, default: ''
}>()

var myvar:string = ""



</script> -->

<template>

  <div class="counters widget" v-if="!isLoading">
    <div class="counters__title">
      <h3>{{ title }}</h3>
    </div>
    <div class="counters__content">
      <div class="counters__content__item">
        <div class="counters__content__item__text">
          <h3>{{ title }}</h3>
          <div class="display_val">
            <h1>{{ count }} {{ units }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="counters" v-else>
    <!-- display text at vertical and horizontal center-->
    <div class="text-center">
      <h1>Chargement des données</h1>
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
import axios from 'axios';
export default{
  name: "counters",
  props: {
    title: {
      type: String,
      required: true
    },
    query: {
      type: String,
      required: true
    },
    units: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      count: 'No data',
      isLoading: true
    }
  },
  async mounted() {
    setInterval(async () => {
      this.getCount()
    }, 10000)
  },
  OnSetup() {
    this.getCount()
  },
  methods: {
    getCount() {
      var token = localStorage.getItem('token');
      var request = 'http://localhost' + this.query

      axios.get(request,{ headers: { 'auth-token': token } }).then((response) => {
        this.count = response.data
        this.isLoading = false
      }).catch((error) => {
        console.log(error)
      })
     
    }
  }
}

</script>

<style scoped>

.display_val {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  font-size: 15px;
}

/* drow line after title */
.counters__title::after {
  content: "";
  display: block;
  width: 70%;
  height: 2px;
  background-color: hsla(0, 0%, 59%, 0.2);
  margin: 0 auto;
  /* vertical align center */
  margin-top: 12px;
}

.counters__title {
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
}


/* .counters__title {
  display: flex;
  flex: 1;
  width: 70%;
  margin: 20px auto;
  line-height: 1em;
  font-weight: 50px;
  font-size: 20px;
  height: 20%;
  justify-content: start;
  color: hsla(160, 100%, 37%, 1);
} */



.counters {
  width: 100%;
  height: 150px;
  max-height: 150px;
  background-color: var(--color-widget);
  border-radius: 10px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}



.counters__content {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.counters__content__item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.counters__content__item__number {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.counters__content__item__number h1 {
  font-size: 2rem;
  font-weight: 500;
  color: var(--color-text);
}

.counters__content__item__text {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.counters__content__item__text h3 {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-text);
}



.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background:  hsla(160, 100%, 37%, 1);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}



</style>

