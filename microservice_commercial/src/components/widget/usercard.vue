
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
              <!-- for i in range list.lenght-->
              <td>{{ list.first_name }}</td>
              <td>{{ list.last_name }}</td>
              <td>{{ list.username }}</td>
              <td>{{ list.email }}</td>
              <td>{{ list.role }}</td>
              <td>{{ list.created_at }}</td>
              <td>
                <!-- make a button -->
                <a :href="'/update/' + list.iduser"><button type="button" class="btn btn-primary">Update</button></a>
              </td>
              <td>
                <!-- make a button -->
                <a :href="'/delete/' + list.iduser"><button type="button" class="btn btn-danger">Delete</button></a>
              </td>
            </tr>
          </tbody>
        </table>
        <p style="text-align: end;"><a :href="'/display/' + displayall + '/1'">Display All >>></a></p>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import axios from "axios";

export default {
  name: "list",
  props: {
    title: {
      type: String,
      required: true,
    },
    entete: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    displayall: {
      type: String,
      required: true,
      default: "",

    }
  },
  data() {
    return {
      heading: [],
      lists: [] as any[],
      listlength: 0,
      headinglength: 0,
    };
  },
  mounted() {
    //this.getCount()
    this.fetchHeader();
    this.getList();
  },
  methods: {
    fetchHeader() {
      this.heading = this.entete.split(",");
      console.log(this.heading);
      this.headinglength = this.heading.length;
    },
    getList() {
      var token = localStorage.getItem("token");
      var request = "http://localhost" + this.query;
      axios
        .get(request, { headers: { "auth-token": token } })
        .then((response) => {
          // for each array add 2 new element like update : <a href="/edit/{{id}}">Edit</a> and delete : <a href="/delete/{{id}}">Delete</a>
          this.lists = response.data;
          console.log(this.lists.length);
          console.log(this.lists);
          for (var i = 0; i < this.lists.length; i++) {}
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

  <style scoped>
.btn {
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 4px 2px;
  cursor: pointer;
}

.btn-primary {
  background-color: rgb(255, 136, 0);
}

.btn-danger {
  background-color: rgb(255, 0, 0);
}

.btn-primary:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.btn-danger:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.counters {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

.counters__title {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

.counters__content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin: 5px;
}

.list {
  width: 100%;
  margin: 5px;
}

/* always display table header */
table {
  width: 100%;
  
  border-collapse: collapse;
  text-align: center;
  table-layout: fixed;
}

/* don't display table if go outside the .counter-content */

/* make a scrool bar in table body */
table tbody {
  overflow: scroll;
}


table th,
table td {
  padding: 5px;
}

table tr:nth-child(even) {
  background-color: hsla(160, 100%, 37%, 0.2);
}
table tr:hover {
  background-color: hsla(0, 0%, 59%, 0.2);
}
th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
}



/* counter */

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


.counters {
  width: 100%;
  height: 440px;
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
  /* add vertical scrool bar */
  
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
  
  