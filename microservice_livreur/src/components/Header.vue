<template>
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/orders" v-if="isLoggedIn" >Commandes</RouterLink>
        <RouterLink to="/acceptedcommands" v-if="isLoggedIn" >Commandes en cours </RouterLink>

      </nav>
      <!-- if jwt is not set -->
      <nav class="end" v-if="!isLoggedIn">
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        
      </nav>
      <!-- if jwt is set -->
      <nav class="end" v-else>
        <RouterLink to="/profile">Profile</RouterLink>
        <a v-on:click="LogoutUser" href="#">Logout</a>
      </nav>
  </header>
</template>


<script lang="ts">
import axios from 'axios'
import { onUpdated } from '@vue/runtime-core';
export default {
    name: 'App',
    data() {
        return {
            isLoggedIn: false
        };
    },
    async created() {
        this.isLoggedIn = await this.IsLoggin();
    },
    // refresh nav bar when local storage is updated
    methods:{
        refreshPage() {
            location.reload()
        },
        LogoutUser(){
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            this.$router.push('/login');
            localStorage.setItem("EtatNotifs", "false");
            this.refreshPage();
        },
        async IsLoggin(){
            var token = localStorage.getItem('token');
            if(token == null){
                return false;
            }else{
                try {
                    const response = await axios.get('http://localhost/auth/tokenCheckup', { headers: { 'auth-token': token } });
                    if (response.data.message == 'Access granted') {
                        localStorage.setItem("EtatNotifs", "true");  
                        return true;
                    } else {
                        localStorage.setItem("EtatNotifs", "false");
                        return false;
                    }
                } catch (error) {
                    console.log(error);
                    return false;
                }
            }
        }
    }
}
</script>


<style scoped>
header {
  line-height: 1.5;
  height: 50px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  display: flex;
}
nav.end{
  justify-content: flex-end;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
nav a:first-of-type {
  border: 0;
}
@media (min-width: 1024px) {
  header {
    float: left;
    width: 100%;
  }
  .logo {
    margin: 0 2rem 0 0;
  }
  header .wrapper {
    width: 100%;
  }
  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0rem;
  }
}
 /* Transition appear text from bottom */
</style>