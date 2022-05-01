<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    msg: String,
    color: {
        type: String,
        default: "bg-custom-purple"
    }
})

</script>
<template>
    <button class="text-center shadow-lg text-custom-white p-2 pr-3 pl-3 rounded-xl font-bold lg:p-3 lg:pr-6 lg:pl-6" :class="color">
       {{ props.msg }}
    </button>
</template>