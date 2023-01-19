<template>
    <div class="container">
        <div class="box">
            <form @submit.prevent="LoginUser">
            
                <h3>Se connecter</h3>
            
                <div class="form-group">
                    <label>Username</label>
                    <input
                    type="username"
                    class="form-control"
                    placeholder="username"
                    v-model="form.username"
                    />
                </div>
            
                <div class="form-group">
                    <label>Mot de passe</label>
                    <input
                    type="password"
                    class="form-control"
                    placeholder="Mot de passe"
                    v-model="form.password"
                    />
                </div>
            
                <button class="btn btn-primary btn-block">Se connecter</button>
            
                <p class="forgot-password text-center">
                    <router-link to="forgot">Mot de passe oublié ?</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { useStore } from "vuex";
import { defineComponent } from "vue";

// import localStorage

export default defineComponent({
    data(){
        return{
            form:{
                username: '',
                password: ''
            }
        };
    },
    setup() {
        const store = useStore();
        return { store };
    },
    methods:{
        refreshPage() {
            location.reload()
        },
        async LoginUser(){

            
            var data = {
                username: this.form.username,
                password: this.form.password
            }
            this.LogoutUser();
            const response = await axios.post('http://localhost/auth/login', data);
            // get jwt token in response and store it in local storage
            const searchParams = new URLSearchParams();
            searchParams.set('token', response.data.token);
            searchParams.set('username', response.data.username);
            searchParams.set('role', response.data.role);

            if(response.data.role == "livreur")
            {
                // redirect = :8000
                const redirect_page = "http://localhost:8002";

                // go on another website
                window.location.href = redirect_page+ '?' + searchParams.toString();
            }
            else if(response.data.role == "commercial")
            {
                // redirect = :8000
                const redirect_page = "http://localhost:8000";

                // go on another website
                window.location.href = redirect_page+ '?' + searchParams.toString();
            }
            else if(response.data.role == "restaurant")
            {
                // redirect = :8000
                const redirect_page = "http://localhost:8003";

                // go on another website
                window.location.href = redirect_page+ '?' + searchParams.toString();
            }
            else if(response.data.role == "client")
            {
                // redirect = :8000
                const redirect_page = "http://localhost:8001";

                // go on another website
                window.location.href = redirect_page+ '?' + searchParams.toString(); 
            }

        },
        LogoutUser(){
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
        },

    }

})


</script>


<style>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 50px);
}
.box {
    background: rgb(255, 255, 255);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 400px;
}
.form-group {
    margin-bottom: 1rem;
    width: 100%;
}
.form-control {
    border: 1px solid #ced4da;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    width: 100%;
}
h3{
    text-align: center;
    margin-bottom: 1rem;
    color : hsla(160, 100%, 37%, 1);
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
    margin-left: auto;
    margin-right: auto;
    /* display grid border */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>


