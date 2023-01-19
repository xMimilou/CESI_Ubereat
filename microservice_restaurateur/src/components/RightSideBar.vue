<template>
    <v-navigation-drawer v-bind:style="{ 'border-style': 'none' }" location="right" :width="drawerWidth" :color="drawerColor">
        
        <v-list density="compact" nav>

            <RouterLink to='/' style="text-decoration: none; color: inherit;">
                <v-list-item prepend-icon="$homeCity" title="Dishes" value="dishes"></v-list-item>
            </RouterLink>

            <RouterLink to='/account' style="text-decoration: none; color: inherit;">
                <v-list-item prepend-icon="$account" title="Side dishes" value="sideDishes"></v-list-item>
            </RouterLink>

            <RouterLink to='/articles' style="text-decoration: none; color: inherit;">
                <v-list-item prepend-icon="$articles" title="Drinks" value="drinks"></v-list-item>
            </RouterLink>

            <RouterLink to='/menus' style="text-decoration: none; color: inherit;">
                <v-list-item prepend-icon="$menus" title="Sauce" value="sauce"></v-list-item>
            </RouterLink>

        </v-list>

    </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'RightSideBar',
    data(){
        return {
            // drawerColor: 'grey-lighten-1',
            drawerColor: 'light',
            // drawerWidth: "150",
            drawerWidth: "",
        }
    },
});



</script>

<style scoped>


</style>
