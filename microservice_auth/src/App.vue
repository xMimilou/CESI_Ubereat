<script setup lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'
import Notification from './components/Notification.vue';
</script>

<template>
  <Notification />
  <Header />
  <RouterView />
</template>


