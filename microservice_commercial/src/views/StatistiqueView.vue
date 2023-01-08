<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import counters from '../components/widget/counters.vue'
</script>

<template>

<div class="container">
    <div class="row">
        <div class="columns-3">
            <counters title="commandes" query="command"/>
        </div>
        <div class="columns-3">
            <counters title="nombre de restaurateur" query="command"/>
        </div>
        <div class="columns-3">
            <counters title="test" query="command"/>
        </div>
        <div class="columns-3">
            <counters title="test" query="command"/>
        </div>
    </div>
    <div class="row">
        <div class="columns-3">
            <counters title="commandes" query="command"/>
        </div>
        <div class="columns-3">
            <counters title="test" query="command"/>
        </div>
        <div class="columns-3">
            <counters title="test" query="command"/>
        </div>
        <div class="columns-3">
            <counters title="test" query="command"/>
        </div>
    </div>
</div>

</template>

<style scoped>

.widget {
  width: 100%;
  padding: 1rem;
  height: 100%;
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
