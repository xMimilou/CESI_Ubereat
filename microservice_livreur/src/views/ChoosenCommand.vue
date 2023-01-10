


<script lang="ts">
import counters from "../components/counters.vue"

export default {
    name: "ChoosenCommand",
    props: ['title'],
    data() {
        return {
           title: ""
        }
    },
    methods: {
        onSubmitEvent(title : string) {
            console.log(title);
            console.log("test");
        }
    }
}

</script>

<template>
   <counters @submitEvent="onSubmitEvent"></counters>
</template>

