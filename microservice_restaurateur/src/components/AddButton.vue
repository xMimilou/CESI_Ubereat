<template>

    <v-btn
        prepend-icon="$add"
        color=""
        variant="elevated"
        >
        {{ buttonText }}
    </v-btn>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data(){
        return {
            
        }
    },
    props: {
        buttonText: {
            type: String,
            default: 'Add Item',
        },
    }
});

</script>
