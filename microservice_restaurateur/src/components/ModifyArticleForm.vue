<template>
    <v-dialog
    v-model="dialog"
    persistent
    >


        <v-card>
            <v-card-title>
                <span class="text-h5">Article</span>
            </v-card-title>


            <v-card-text>
                <v-container>

                <v-row>
                    <v-col
                    cols="12"
                    >
                    <v-text-field
                        label="Name*"
                        required
                        v-model="name"
                    ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                    cols="12"
                    >
                    <v-text-field
                        label="Type*"
                        required
                        v-model="type"
                    ></v-text-field>
                    </v-col>
                </v-row>                
                    
                <v-row>
                    <v-col cols="12">
                    <v-text-field
                        label="Quantity*"
                        required
                        v-model="quantity"
                    ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                    <v-text-field
                        label="Price*"
                        required
                        v-model="price"
                    ></v-text-field>
                    </v-col>
                </v-row>

                </v-container>
                
                <small>*indicates required field</small>
            </v-card-text>


            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="blue-darken-1"
                variant="text"
                @click="onClose"
                >
                    Close
                </v-btn>
                <v-btn
                color="blue-darken-1"
                variant="text"
                @click="onSave"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    data(){
        return {
            //
        }
    },
    methods: {
        onSave(){

        },
        onClose(){
            
        }
    }
});


</script>
