<script setup lang="ts">
defineProps<{
  title: string
}>()
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
export default {
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Time', 'Nombre de ventes'],
        ['10:00', 5],
        ['10:01', 10],
        ['10:02', 11],
        ['10:03', 6],
        ['10:04', 7],
        ['10:05', 60],
        ['10:06', 30],
        ['10:07', 20],
        ['10:08', 1],
        ['10:09', 60],


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