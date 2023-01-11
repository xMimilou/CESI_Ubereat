<script setup lang="ts">
</script>

<template>

  <div class="counters charts">
    <div class="counters__title">
      <h3>{{ title }}</h3>
    </div>
    <div class="counters__content">
        <GChart
            type="ColumnChart"
            :data="chartData"
            
            :options="chartOptions"
            
        />
    </div>
  </div>

</template>

<script lang="ts">
import { GChart } from 'vue-google-charts'
import axios from 'axios';
export default {
  name: "graph",
  props: {
    title: {
      type: String,
      required: true
    },
    query: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Time', 'Nombre de ventes'],
        ['00:00', 0]


      ],
      chartOptions: {
        chart: {
          title: 'Ventes sur les 10 minutes',
          subtitle: 'Totals des ventes par minutes',
        },
        /* make width 100% */
        width: '100%',
        // change color
        colors: ['#00bd7e'],
      }
    }
  },
  components: {
    GChart
  }, // make async function reload every 10 secondes
  async mounted() {
    setInterval(async () => {
      this.getChart()
    }, 10000)
  },
  Onsetup() {
      this.getChart()
  },
  methods: {
    getChart() {
      var token = localStorage.getItem('token');
      var request = 'http://localhost:3001' + this.query
      axios.post(request, {}, { headers: { 'auth-token': token } }).then((response) => {
        this.chartData = response.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }

}
</script>

<style scoped>
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

.v-sheet--offset {
    top: -24px;
    position: relative;
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

.charts{
    padding: 10px;
}

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

.counters__content > * {
    width: 100%;
}

</style>