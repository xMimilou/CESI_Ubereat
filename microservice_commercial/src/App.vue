<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/statistique">Statistique</RouterLink>
      </nav>
      <nav class="end">
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </nav>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  height: 50px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  display: flex;
}
nav.end{
  justify-content: flex-end;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
nav a:first-of-type {
  border: 0;
}
@media (min-width: 1024px) {
  header {
    float: left;
    width: 100%;
  }
  .logo {
    margin: 0 2rem 0 0;
  }
  header .wrapper {
    width: 100%;
  }
  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0rem;
  }
}
 /* Transition appear text from bottom */
</style>