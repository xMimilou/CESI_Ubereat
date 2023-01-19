<template>
  
  <v-btn @click="showDialog = true">Create Menu</v-btn>
  
  <v-dialog v-model="showDialog">
    <v-card>
      <v-card-title>Create a new Menu</v-card-title>
      <v-form @submit.prevent="createMenu">
        <v-text-field label="Menu Name" v-model="menu.name" required />
        <template v-for="article in articles" :key="article._id">
          <v-checkbox
            v-model="selectedArticles"
            :label="article.name"
            :value="article"
            color="primary"
          ></v-checkbox>
        </template>
        <v-text-field label="Price" v-model="menu.price" type="number" required />
        <v-file-input v-model="menu.image_url" label="Upload Image" @change="handleFileUpload"></v-file-input>
        <v-btn type="submit" color="primary">Create Menu</v-btn>
      </v-form>
    </v-card>
  </v-dialog>

</template>



<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Article, Menu } from '@/utils/interfaces';
  import store from '@/store';

  export default defineComponent({
    data() {
      return {
        showDialog: ref(false),
        menu: ref<Menu>({
          name: '',
          articles: [],
          price: 0,
          image_url: '',
        }),
        articles: ref<Article[]>([
        { name: "Article 1", type: "Type 1", quantity: 10, price: 15, _id: "1" },
        { name: "Article 2", type: "Type 2", quantity: 5, price: 20, _id: "2" },
        { name: "Article 3", type: "Type 3", quantity: 7, price: 25, _id: "3" },
      ]),
        selectedArticles: ref<Article[]>([])
      };
    },
    methods: {
      handleFileUpload(event: any) {
        // handle the file upload here, for example, by using the FileReader API
      },
      createMenu() {
        // Use the selected articles, menu name, price and image to create a menu
        console.log(this.menu);

        console.log("this.selectedArticles[0]");
        console.log(this.selectedArticles[0]);
        //console.log(this.selectedArticles[1]);
        
        console.log("this.selectedArticles");
        console.log(this.selectedArticles);
        // const articles = []
        for (let i in this.selectedArticles){
          console.log('From loop');
          console.log(i);
        }

        this.showDialog = false;

        // store.dispatch('createMenu', {
        //     name: this.selectedArticles.name,
        //     articles: menu.articles,
        //     price: this.selectedArticles.price
        // });
      },
    },
  });
</script>



  

  