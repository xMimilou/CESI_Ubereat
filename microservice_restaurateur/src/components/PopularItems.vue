<!-- <template>
    <div>
      <canvas ref="chart" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Chart from 'chart.js';
  import { getOrders } from '@/utils/helpers';
  
  interface Item {
    name: string;
    count: number;
  }
  
  export default defineComponent({
    name: 'PopularMenuItems',
    data() {
      return {
        items: [] as Item[],
        orders: [],
      }
    },
    mounted() {

        getOrders().then((orders) => {
            const menuItems: { [key: string]: number } = {};
            orders.forEach((order: any) => {
            order.menus.forEach((menu: any) => {
              if (menuItems[menu.name]) {
                menuItems[menu.name]++;
              } else {
                menuItems[menu.name] = 1;
              }
            });
            });
            this.items = Object.entries(menuItems)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 10);
    
            const ctx = this.$refs.chart as HTMLCanvasElement;
            Chart(ctx, {
                type: 'bar',
                data: {
                labels: this.items.map(item => item.name),
                datasets: [{
                    data: this.items.map(item => item.count),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                }]
                },
                options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
                }
            });
        })
        .catch((err) => console.log(err))
    }
  });
  </script>
   -->