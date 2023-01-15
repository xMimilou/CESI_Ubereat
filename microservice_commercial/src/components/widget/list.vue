
<template>

  <div class="counters">
    <div class="counters__title">
      <h3>{{ title }}</h3>
    </div>
    <div class="counters__content">
      <div class="list">
        <table>
            <thead>
                <tr>
                    <th v-for="item in heading">{{ item }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="list in lists">
                    <td v-for="element in list">{{ element }}</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import axios from 'axios';
export default{
    name: "list",
    props: {
        title: {
            type: String,
            required: true
        },
        entete: {
            type: String,
            required: true
        },
        query: {
          type: String,
          required: true
        },
    },
    data() {
        return {
            heading : [

            ],
            lists: [],
            listlength: 0,
            headinglength: 0
        }
    },
    mounted() {
        //this.getCount()
        this.fetchHeader()
        this.getList()
    },
    methods: {
        fetchHeader(){
            this.heading = this.entete.split(',')
            this.headinglength = this.heading.length
            
        },
        getList() {
          var token = localStorage.getItem('token');
          var request = 'http://localhost:3001' + this.query
          axios.post(request, {}, { headers: { 'auth-token': token } }).then((response) => {
            this.lists = response.data
            this.listlength = this.lists.length
            
          }).catch((error) => {
            console.log(error)
          })
        
        }
    }
}

</script>

<style scoped>

.list{
    width: 100%;
    margin: 5px;
}

table{
    width: 100%;
    border-collapse: collapse;
    text-align: center;
}

table th, table td{
    padding: 5px;
}

table tr:nth-child(even) {
    background-color: hsla(160, 100%, 37%, 0.2);
}
table tr:hover{
    background-color: hsla(0, 0%, 59%, 0.2);
}
th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: hsla(160, 100%, 37%, 1);
    color: white;
}


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
  margin-left: 5px;
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



</style>

