<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'

// if params in urls is not empty and equal to token, username, role store it in local storage
const params = new URLSearchParams(window.location.search);
if (params.get('token') != null && params.get('username') != null && params.get('role') != null) {
    localStorage.setItem('token', params.get('token'));
    localStorage.setItem('username', params.get('username'));
    localStorage.setItem('role', params.get('role'));

    // redirect to home page
    window.location.href = "http://localhost:8002";
}


</script>

<template>
</template>
