<template>
    <p>test</p>
</template>

<script lang="ts">
import axios from 'axios';
// delete user by query the api http://localhost:3001/commercial/delete/:id with jwt token
export default{
  name: "delete",
  data() {
    return {
      count: 'No data'
    }
  },
  mounted(){
    var token = localStorage.getItem('token');
      console.log(token)
      var request = 'http://localhost:3001/commercial/delete/' + this.$route.params.id
      axios.post(request, {}, { headers: { 'auth-token': token } }).then((response) => {
        this.$router.push("/users");
      }).catch((error) => {
        console.log(error)
      })
     
  }
}
</script>