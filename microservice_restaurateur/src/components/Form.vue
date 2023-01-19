<template>

    <v-row justify="start">
      <v-dialog
        v-model="dialog"
        persistent
      >
        <template v-slot:activator="{ props }">
          <!-- <v-btn
            color="primary"
            v-bind="props"
          >
            ADD ARTICLE
          </v-btn> -->
          <AddButton buttonText="Add Article" v-if="mode === 'add'" v-bind="props"></AddButton>
          <!-- <v-icon
            v-if="mode === 'update'"
            color="blue"
            icon="$update"
            
          >
          </v-icon> -->
        </template>

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
    </v-row>
</template>


<script lang="ts">
    import { defineComponent } from 'vue';
    import AddButton from '@/components/AddButton.vue'

    // import {postArticle} from '@/utils/helpers';
    import store from '@/store'

    export default defineComponent({
      data(){
        return {
            dialog: false,
            name: '',
            type: '',
            quantity: 0,
            price: 0
        }
      },
      props: {
        mode: {type: String, default: 'add'}
      },
      components: {
        AddButton
      },
      methods: {
        async onSave (){
          this.dialog = false;
          console.log(this.name);
          store.dispatch('createProduct', {
            name: this.name, 
            type: this.type, 
            quantity: this.quantity, 
            price: this.price});
        },
        onClose(){
          this.dialog = false
        }
      }
    })

</script>
