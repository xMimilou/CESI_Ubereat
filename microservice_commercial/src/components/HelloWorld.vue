<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  top: -10px;
}
h3 {
  font-size: 1.2rem;
}
/* align item verticaly center */
.greetings {
  z-index: -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40vh;
  font-size: 50px;
  transform: translateY(150px);
  animation: fadein 2s;
}
  /* Transition appear text from bottom */
  @keyframes fadein {
    from {
      opacity: 0;
      transform: translate3d(0, 150%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 150px, 0);
    }
  }
.greetings h1,
.greetings h3 {
  text-align: center;
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
}
</style>