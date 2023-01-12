<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import userlist from "../components/widget/usercard.vue";
import add_user_formVue from "@/components/widget/add_user_form.vue";
import axios from "axios";
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="columns-6">
        <userlist
          title="Clients"
          query="/administration/list/clients"
          entete="nom,prenom,username,email,role,created,update,delete"
          displayall="client"
          :limit="5"
        />
      </div>
      <div class="columns-6">
        <userlist
          title="Restaurateur"
          query="/administration/list/restaurateur"
          entete="nom,prenom,username,email,role,created,update,delete"
          displayall="restaurateur"
          :limit="5"
        />
      </div>
    </div>
    <div class="row">
      <div class="columns-6">
        <userlist
          title="Livreur"
          query="/administration/list/livreur"
          entete="nom,prenom,username,email,role,created,update,delete"
          displayall="livreur"
          :limit="5"
        />
      </div>
      <div class="columns-6">
        <add_user_formVue />
      </div>
    </div>
  </div>
</template>



<style scoped>
.columns-6 {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
}

.widget {
  width: 100%;
  padding: 1rem;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.row {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

/* add vertical scrool in columns-6 */
</style>
