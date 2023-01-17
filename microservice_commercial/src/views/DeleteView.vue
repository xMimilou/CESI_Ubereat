<template>
    <p>test</p>
</template>

<script lang="ts">
import axios from 'axios';
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
      var request = 'http://localhost/admin/delete/' + this.$route.params.id
      axios.delete(request, { headers: { 'auth-token': token } }).then((response) => {
        this.$router.push("/users");
      }).catch((error) => {
        console.log(error)
      })
     
  }
}
</script>