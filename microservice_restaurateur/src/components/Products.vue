<template>
    <v-row class="pa-12  ">
        <v-col cols="10" offset="1">
            <v-row>
                <v-col cols="4" v-for="product in products">
                    <Product :productType='productType' :product="product" :key="product._id"></Product>

                    <!-- <RouterLink v-bind:to="{ name:'detail', params: { product: JSON.stringify(product) } }" >
                        <Product :product="product" :key="product.product_id"></Product>
                    </RouterLink> -->
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import Product from '@/components/Product.vue';
    import { RouterLink } from 'vue-router';

    import {Product as Interface_Product} from '@/utils/interfaces';

    
    export default defineComponent({
        data(){
            return {
                // products,
            }
        },
        props: {
            products: Array as PropType<Interface_Product[]>,
            productType: {
                type: String,
                required: true
            }
        },
        components: {
            Product
        }
    })
</script>

<style>
    .justify-content-center {
        justify-content: center;
    }
</style>