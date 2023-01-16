<template>
    <div class="container-fluid">
      <div class="card">
        <div class="card_title">
          <!-- get param query and display it-->
          <h3>{{ form.username }}</h3>
        </div>
        <div class="card_content">
          <form @submit.prevent="createNewUser">
          <div class="row">
              <div class="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nom"
                  v-model="form.first_name"
                  id="first_name"
                  name="first_name"
                />
              </div>
              <div class="form-group">
                <label>Prénom</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Prénom"
                  v-model="form.last_name"
                  id="last_name"
                  name="last_name"
                />
              </div>
          </div>
          <div class="row">
            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                class="form-control"
                placeholder="Email"
                v-model="form.email"
                id="email"
                name="email"
              />
            </div>
  
          </div>
        
          <div class="row">
        <button class="btn btn-primary btn-block" type="submit">
          Modifier
        </button>

        <!-- add button to delete user  on click redirect to /delete-->
        <router-link :to="'/delete'">
          <button class="btn btn-danger btn-block" type="button">
            Supprimer
          </button>
        </router-link>
        </div>
  
        </form>
  
  
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  
  export default {
    name: "adduser",
    data() {
      return {
        // define variable
        title: "",
        form: {
          first_name: "",
          last_name: "",
          username: "",
          email: "",
        },
      };
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        var token = localStorage.getItem("token");
        var request = "http://localhost:3000/api/user";
        axios
          .get(request, { headers: { "auth-token": token } })
          .then((response) => {
              this.form = response.data[0];
          })
          .catch((error) => {
            console.log(error);
          });
      },
      async createNewUser() {
        try {
          /* send to api http://localhost:3000/users data nom and prenom as json in body with post method */
          var data = {
            first_name: this.form.first_name,
            last_name: this.form.last_name,
            email: this.form.email,
          };
          const response = await axios.put(
            "http://localhost:3000/api/update",
            data, { headers: { "auth-token": localStorage.getItem("token") } }
          );
          this.$router.push("/profile");
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  
  .row{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 100%;
  }
  
  
  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 340px;
    background: var(--color-widget);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 80%;
    flex-direction: column;
    margin: 0 auto;
  }
  
  .card__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
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
  
  .form-group {
    margin-bottom: 0.5rem;
    width: 100%;
  }
  .form-control {
    border: 1px solid #ced4da;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    width: 100%;
  }
  
  
  .btn {
    background: hsla(160, 100%, 37%, 1);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    /* align item center of the line */
    display: flex;
    justify-content: center;
    align-items: center;
    /* align table center */
    /* display grid border */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  </style>