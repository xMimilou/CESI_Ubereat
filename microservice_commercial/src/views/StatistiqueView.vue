<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import counters from '../components/widget/counters.vue'
import graph from '../components/widget/graph.vue'
import list from '../components/widget/list.vue'
import axios from 'axios'


</script>

<template>

<div class="container">
    <div class="row">
        <div class="columns-3">
            <counters title="nombre de client" query="/commercial/total/client"/>
        </div>
        <div class="columns-3">
            <counters title="nombre de restaurateur" query="/commercial/total/restaurateur"/>
        </div>
        <div class="columns-3">
            <counters title="nombre de livreur" query="/commercial/total/livreur"/>
        </div>
        <div class="columns-3">
            <counters title="nombre total de commandes" query="/commandes/count/commandes"/>
        </div>
    </div>
    <div class="row">
        <div class="columns-3">
            <counters title="Chiffre d'affaire" units="€" query="/commandes/count/CA"/>
        </div>
        <div class="columns-3">
            <counters title="Nombre de nouveau utilisateur" query="/commercial/new/users"/>
        </div>
        <div class="columns-3">
            <counters title="Nombre total d'utilisateur" query="/commercial/total/users"/>
        </div>
        <div class="columns-3">
            <counters title="Commandes par jours" query="/commandes/count/commandes/today"/>
        </div>
    </div>
    <div class="row">
        <div class="columns-12">
            <graph title="Commandes par minutes" query="/commandes/graph/commandes/minutes"/>
        </div>
    </div>
    <div class="row">
        <!-- Display list of last 5 new poeple col-6 -->
        <div class="columns-6">
            <list title="Derniers clients" query="/commercial/list/lastuser" entete="nom,prenom,username,email,role,created" :limit="5"/>
        </div>
        <!-- Top 5 des clients avec le plus de commandes-->
        <div class="columns-6">
            <list title="Top 5 des clients" query="/commandes/list/top/client" entete="username,depense" :limit="5"/>
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

.columns-12 {
    width: 100%;
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

.columns-3 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
}


</style>
