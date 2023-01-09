<template>
    <div class="container">
        <div class="box">
            <form @submit.prevent="createNewUser">
            
                <h3>S'inscrire</h3>
                
                <div class="form-group">
                    <label>Username</label>
                    <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    v-model="form.username"
                    id="username"
                    name="username"
                    />
                </div>

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
            
                <div class="form-group">
                    <label>Mot de passe</label>
                    <input
                    type="password"
                    class="form-control"
                    placeholder="Mot de passe"
                    v-model="form.password"
                    id="password"
                    name="password"
                    />
                </div>

                <div class="form-group">
                    <label>Confirmer le mot de passe</label>
                    <input
                    type="password"
                    class="form-control"
                    placeholder="Confirmer le mot de passe"
                    v-model="form.password2"
                    id="password2"
                    name="password2"
                    />
                </div>

                <div class="form-group">
                    <label>Referal code</label>
                    <input
                    type="text"
                    class="form-control"
                    placeholder="referal"
                    v-model="form.referal_by"
                    id="referal"
                    name="referal"
                    />
                </div>

                <div class="form-group">
                    <label>Role</label>
                    <select class="form-control" v-model="form.role" id="role" name="role">
                        <option value="client">Client</option>
                        <option value="restaurateur">Restaurateur</option>
                        <option value="livreur">Livreur</option>
                    </select>
                </div>
            
                <button class="btn btn-primary btn-block" type="submit">Se connecter</button>
            
                <p class="forgot-password text-right text-center">
                    <router-link to="forgot">Mot de passe oublié ?</router-link>
                </p>
            </form>
        </div>
    </div>
</template>


<script lang="ts">
import axios from 'axios';
export default {
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
        referal_by: '',
        role: '',
      },
    };
  },
  methods: {
    async createNewUser() {
      try {
        /* send to api http://localhost:3000/users data nom and prenom as json in body with post method */
        if (this.form.password !== this.form.password2) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
        var data = {
            first_name: this.form.first_name,
            last_name: this.form.last_name,
            username: this.form.username,
            email: this.form.email,
            password: this.form.password,
            referal_by: this.form.referal_by,
            role: this.form.role,
        }
        const response = await axios.post('http://localhost:3000/api/register', data);
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
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
.text-center {
    text-align: center;
}
</style>