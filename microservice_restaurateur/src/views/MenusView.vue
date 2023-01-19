<template>
    <MenuForm></MenuForm>
    <Products product-type="menu" :products="menus"></Products>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Products from '@/components/Products.vue';
import MenuForm from '@/components/MenuForm.vue';

import store from '@/store';

export default defineComponent({
    name:'MenusView',
    components: {
        Products,
        MenuForm
    },
    computed: {
        menus(){
            return store.state.menus;
        },
    },
    mounted(){
        store.dispatch('fetchMenus')
    },

});

</script>

<style></style>