<script setup>
import Button from './buttons/Button.vue';
</script>
<template>
    <div class="flex justify-center items-center flex-col p-8" >
        <img src="@/assets/suggestions/illustration-empty.svg" />
        <h3 class="font-bold text-lg m-4">There is no Ui feedback yet.</h3>
        <p class="mb-4 max-w-lg text-center">Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app. </p>
        <Button msg="+ Add Feedback" />
    </div>
</template>