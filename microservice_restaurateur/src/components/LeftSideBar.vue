<template>
    <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
    >
        <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="Romaric DEMBELE"
        nav
        >
        <template v-slot:append>
            <v-btn
            variant="text"
            icon="$chevronLeft"
            @click.stop="rail = !rail"
            ></v-btn>
        </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>

            <!-- <RouterLink to='/' style="text-decoration: none; color: inherit;">
                <v-list-item prepend-icon="$homeCity" title="Home" value="home"></v-list-item>
            </RouterLink>

            <RouterLink to='/account' style="text-decoration: none; color: inherit;">
                <v-list-item prepend-icon="$account" title="My Account" value="account"></v-list-item>
            </RouterLink> -->

            <RouterLink to='/articles' style="text-decoration: none; color: inherit;">
                <v-list-item prepend-icon="$articles" title="Articles" value="article"></v-list-item>
            </RouterLink>

            <RouterLink to='/menus' style="text-decoration: none; color: inherit;">
                <v-list-item prepend-icon="$menus" title="Menus" value="menu"></v-list-item>
            </RouterLink>

            <RouterLink to='/orders' style="text-decoration: none; color: inherit;">
                <v-list-item prepend-icon="$orders" title="Orders" value="orders"></v-list-item>
            </RouterLink>

            <!-- <RouterLink to='/deliveries' style="text-decoration: none; color: inherit;">
                <v-list-item prepend-icon="$deliveries" title="Deliveries" value="deliveries"></v-list-item>
            </RouterLink>

            <RouterLink to='/order-history' style="text-decoration: none; color: inherit;">
                <v-list-item prepend-icon="$ordersHistory" title="Orders History" value="ordersHistory"></v-list-item>
            </RouterLink> -->

            <RouterLink to='/statistics' style="text-decoration: none; color: inherit;">
                <v-list-item prepend-icon="$statistics" title="Statistics" value="statistics"></v-list-item>
            </RouterLink> 

            <!-- <RouterLink to='/notification-center' style="text-decoration: none; color: inherit;">
                <v-list-item prepend-icon="$notifications" title="Notifications" value="notifications"></v-list-item>
            </RouterLink> -->
        
        </v-list>
    </v-navigation-drawer>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name:'SideBar',
    data () {
    return {
      drawer: true,
    //   items: [
    //     { title: 'Home', icon: 'mdi-home-city' },
    //     { title: 'My Account', icon: 'mdi-account' },
    //     { title: 'Users', icon: 'mdi-account-group-outline' },
    //   ],
      rail: true,
      elements: [
        { id: 1, name: 'Articles', actions: [ 'Dishes', 'Side Dishes', 'Drinks', 'Sauce' ] },
        { id: 2, name: 'Menus', actions: [ 'action1', 'action2' ] },
        { id: 3, name: 'Orders', actions: [ 'Dishes', 'Side Dishes', 'Drinks', 'Sauce' ] },
        { id: 4, name: 'Deliveries', actions: [ 'action1', 'action2' ] },
        { id: 5, name: 'Orders History', actions: [ 'Dishes', 'Side Dishes', 'Drinks', 'Sauce' ] },
        { id: 6, name: 'Statistics', actions: [ 'action1', 'action2' ] },
        { id: 7, name: 'Notifications', actions: [ 'Dishes', 'Side Dishes', 'Drinks', 'Sauce' ] },
      ],
    }
  },
});

</script>

<style></style>