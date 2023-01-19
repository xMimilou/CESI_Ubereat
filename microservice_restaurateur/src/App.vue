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

<script lang="ts">
  import { defineComponent } from 'vue';
  import NavBar from '@/components/NavBar.vue';
  import LeftSideBar from '@/components/LeftSideBar.vue';
  import RightSideBar from '@/components/RightSideBar.vue';
  import axios from "axios";
  import { useStore } from "vuex";

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
    },
    setup() {
    const store = useStore();

    async function created() {
      const response = await axios.get("user");
      store.dispatch("user", response.data);
    }

    return {
      created,
    };
  },
  });

</script>

<style>


</style>
