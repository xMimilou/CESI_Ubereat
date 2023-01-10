<script lang="ts">

// remove jwt token on localstorage
localStorage.removeItem('token');
// redirect to home
router.push('/');
</script>