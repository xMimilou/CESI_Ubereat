<template>
    <v-hover v-slot="{isHovering, props}">
        <v-card
            class="mx-auto"
            max-width="344"
            :elevation="isHovering ? 16 : 2"
            :class="{ 'on-hover': isHovering }"
            v-bind="props"
        >
            <v-img
                :src="product.image_url"
                height="200px"
                cover
            ></v-img>
        
            <v-card-title>
                {{ product.name }}
            </v-card-title>
        
            <v-card-subtitle>
                Quantity: {{ product.quantity }}
            </v-card-subtitle>

            <v-card-subtitle>
                Price: {{ product.price }}
            </v-card-subtitle>
        
            <v-card-actions class="d-flex justify-end">
                <v-icon
                    class="mr-2"
                    color="red"
                    icon="$delete"
                    @click="deleteFn(product._id)"
                >
                </v-icon>
                <v-icon
                    color="blue"
                    icon="$update"
                    @click="updateProduct(product._id)"
                >
                </v-icon>
                <Form mode="update"></Form>
            </v-card-actions>
        </v-card>
    </v-hover>

</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import type { PropType } from 'vue';
    import {Product} from '@/utils/interfaces';

    import {deleteArticle} from '@/utils/helpers';

    import store from '@/store';
    import Form from '@/components/Form.vue';

 
    export default defineComponent({
        name: 'Product',
        props: {
            product: {
                type: Object as PropType<Product>,
                default: function(){
                    return {
                        name: "",
                        image_url: '',
                        product_quantity: "00",
                        product_price: "00",
                    }
                }
            },
            productType: {
                type: String,
                required: true
            }
        },
        methods: {
            async deleteProduct(id: any){
                store.dispatch('deleteProduct', id)
            },
            async updateProduct(id: any){

            },
            async deleteMenu(id: any){
                store.dispatch('deleteMenu', id)
            },
            async deleteFn(id: any) {
                switch (this.productType){
                    case 'article':
                        await this.deleteProduct(id);
                    case 'menu':
                        await this.deleteMenu(id);
                    default:
                        return ()=>console.log('The product type is not defined')
                }
            },
        },
        computed: {
            // deleteFn(id: any) {
            //     return this.productType === 'article' ? this.deleteProduct(id) : this.deleteMenu(id);
            // },

        },
    })
</script>