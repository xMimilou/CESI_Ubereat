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
                </tr>
            </thead>
        </table>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "usercard",
  data() {
    return {
      // define variable
      lists: [],
      query: this.$route.params.query,
    };
  },
  async mounted() {
    // call function
    this.getUsers();
  },
  methods: {
    // define function
    async getUsers() {
      // get data from api
      //const response = await axios.get(
        //"http://localhost:3000/api/users/" + this.query
      //);
      // set data to variable
      //this.lists = response.data;
    },
  },
};
</script>

<style scoped>
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
</style>