<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card_title">
        <!-- get param query and display it-->
        <h3>{{ query }}</h3>
      </div>
      <div class="card_content">
        <div class="search_bar">
            <input type="text" placeholder="Search.." />
        </div>
        <hr/>
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>created_at</th>
                    <th>updated_at</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="list in lists">
                    <td>{{ list.username }}</td>
                    <td>{{ list.last_name }}</td>
                    <td>{{ list.first_name }}</td>
                    <td>{{ list.email }}</td>
                    <td>{{ list.created_at }}</td>
                    <td>{{ list.updated_at }}</td>
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
        <!-- display page next and before if exist and display page number and current page-->
        <div class="pagination">
            <a v-if="current_page > 1" :href="'/display/' + query + '/' + (parseInt(current_page) - 1)"><button type="button" class="btn pagination">&lt;</button></a>
            <span class="display_page">Page {{ current_page }} of {{ total_pages }}</span>
            <a v-if="current_page < total_pages" :href="'/display/' + query + '/' + (parseInt(current_page) + 1)"><button type="button" class="btn pagination">&gt;</button></a>
            
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
export default {
  name: "usercard",
  data() {
    return {
      // define variable
      lists: [],
      query: this.$route.params.query,
      total_pages: '',
      current_page: this.$route.params.page,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      var token = localStorage.getItem("token");
      var request = "http://localhost:3001/commercial/get/"+ this.$route.params.query +"/"+ this.$route.params.page;
      axios
        .post(request, {}, { headers: { "auth-token": token } })
        .then((response) => {
            this.total_pages = response.data.pages;
            this.lists = response.data.result2;
            console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>

.pagination{
    text-align: center;
    color: hsla(160, 100%, 37%, 1) !important;
    margin-top: 5px;
}

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

.card {
    /* create card with box-shadow with width 80% and height auto */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    width: 80%;
    height: auto;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 5px;

}


/* always display table header */
table {
  width: 100%;
  
  border-collapse: collapse;
  text-align: center;
  table-layout: fixed;
  margin-top:5px;
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

.page{
    text-align: center;
    margin-top: 10px;
}

.display_page{
    color: black;
    margin-left: 2px;
    margin-right: 2px;
}

</style>