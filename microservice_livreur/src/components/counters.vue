<template>

    <div class="counters widget">
        <div class="counters__title">
          <h3>{{title}}</h3>
        </div>
        <div class="counters__content">
        <div class="counters__content__item">
            <div class="counters__content__item__text">
              <h3>{{ distance }}</h3>
              <h3>{{ cost }}</h3>
            <div class="display_val">
                <router-link @click="onSubmit(title)" :to="'/choosencommand'" class="button">Accepter</router-link>
                <ChoosenCommandVue v-bind:title="title" />
                <a class="button" >Refuser</a>
            </div>
            </div>
        </div>
        </div>
    </div>

</template>
<script lang="ts">
import Vue from 'vue';
import counters from './counters.vue'
import ChoosenCommandVue from '@/views/ChoosenCommand.vue';


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
        distance: {
            type: String,
            required: true
        },
        cost: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            count: 10,
            Selectedtitle : ""
        };
    },
    mounted() {
        //this.getCount()
    },
    methods: {
        getCount() {
            fetch(`http://localhost:3000/${this.query}`)
                .then(res => res.json())
                .then(data => {
                this.count = data.length;
            });
        },
        onSubmit(title: string) {
          //console.log(title);
          this.$emit('submitEvent', title);
          

        }
    },
    components: { ChoosenCommandVue }
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
  height: 300px;
  max-height: 300px;
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
  align-items: center;
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


.button {
        padding: 10px 50px;
        margin: 10px 4px;
        color: hsla(160, 100%, 37%, 1);
        font-family: sans-serif;
        text-transform: uppercase;
        text-align: center;
        position: relative;
        text-decoration: none;
        display: inline-block;
      }


.button {
  border: 1px solid transparent;
  -webkit-transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
}
.button::before {
  content: "";
  position: absolute;
  left: 0px;
  bottom: 0px;
  z-index: -1;
  width: 0%;
  height: 1px;
  background: #00ff40;
  box-shadow: inset 0px 0px 0px #b6cdef;
  display: block;
  -webkit-transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
}
.button:hover::before {
  width: 100%;
}
.button::after {
  content: "";
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: -1;
  width: 0%;
  height: 1px;
  background: #a9c1e8;
  -webkit-transition: all 0.4s cubic-bezier(0.7, 0.25, 0, 1);
  transition: all 0.4s cubic-bezier(0.7, 0.25, 0, 1);
}
.button:hover::after {
  width: 100%;
}
.button:hover {
  border-left: 1px solid #b6cdef;
  border-right: 1px solid #6098ff;
}
</style>