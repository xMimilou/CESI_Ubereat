<template>

  <v-app>
    <v-app-bar app>
      <NavBar></NavBar>
    </v-app-bar>

    <LeftSideBar></LeftSideBar>

    <v-main>
      <router-view/>
    </v-main>

    <!-- <RightSideBar ></RightSideBar> -->

    <v-footer app></v-footer>
  </v-app>
  
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue';
  import NavBar from '@/components/NavBar.vue';
  import LeftSideBar from '@/components/LeftSideBar.vue';
  import RightSideBar from '@/components/RightSideBar.vue'

  defineComponent({
    data(){
      return {
        displayValue: "none"
      }
    },
    components: {
      NavBar,
      LeftSideBar,
      RightSideBar
    }
  });

</script>

<style>


</style>
