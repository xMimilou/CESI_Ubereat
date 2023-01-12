<template>
  <div class="card">
    <div class="counters__title">
      <h3>Ajouter un utilisateur</h3>
    </div>
    <div class="card__content">
      <form @submit.prevent="createNewUser">
        <div class="row">
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
          <select
            class="form-control"
            v-model="form.role"
            id="role"
            name="role"
          >
            <option value="client">Client</option>
            <option value="restaurateur">Restaurateur</option>
            <option value="livreur">Livreur</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <button class="btn btn-primary btn-block" type="submit">
          Ajouter
        </button>

      </form>
    </div>
  </div>
</template>


<script lang="ts">
import axios from "axios";
export default {
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password2: "",
        referal_by: "",
        role: "",
      },
    };
  },
  methods: {
    async createNewUser() {
      try {
        /* send to api http://localhost:3000/users data nom and prenom as json in body with post method */
        if (this.form.password !== this.form.password2) {
          alert("Les mots de passe ne correspondent pas");
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
        };
        const response = await axios.post(
          "http://localhost:3000/api/register",
          data
        );
        console.log(response);
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style>

.row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}


.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 440px;
  background: var(--color-widget);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  flex-direction: column;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
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
  margin-left: auto;
  margin-right: auto;
  /* display grid border */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.text-center {
  text-align: center;
}

.btn:hover{
    background: hsla(160, 100%, 37%, 0.8);
}
</style>