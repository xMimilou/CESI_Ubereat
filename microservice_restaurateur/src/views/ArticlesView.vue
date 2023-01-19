<template>
    <div @click="logHello" class="pl-6 pt-9 ">
        <Form ></Form>
    </div>
    
    <Products product-type="article" :products="products"></Products>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AddButton from '@/components/AddButton.vue';
import Form from '@/components/Form.vue';

import Products from '@/components/Products.vue';

import { getArticles } from '@/utils/helpers';

import store from '@/store';


interface FormData {
    name:string,
    quantity?:number,
    price:number
}

export default defineComponent({
    name:'ArticlesView',
    data(){
        return {
            showForm: false,
            name: '',
            quantity: 0,
            price: 0,
        }
    },
    methods: {
        logHello(){
            console.log('HELLO');
        },
        onSubmit(data: FormData){
            console.log(data)
        },
    },
    computed: {
        products(){
            return store.state.products
        },
    },
    mounted(){
        store.dispatch('fetchProducts')
    },
    components: {
        Products,
        AddButton,
        Form
    }
});

</script>


<style></style>