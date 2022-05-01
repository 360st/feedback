<script setup>
import { RouterLink } from 'vue-router';
import UpVotesButton from './buttons/UpVotesButton.vue'

const props = defineProps({
    comment: Object,
    border: String,
    bg: String
})

</script>
<template>
    <section class="bg-custom-white rounded-xl mb-4 p-4 border-t-4" :class="props.border">
        <div class="mb-2 flex items-center">   
            <span class="mr-4 w-2 h-2 rounded-full" :class="props.bg"></span><span class="capitalize">{{props.comment.status}}</span>
        </div>
        <h2 class="font-bold text-lg mb-2"><router-link :to="{name: 'CommentWrapper', params: {id: props.comment.id}}">{{ props.comment.title }}</router-link></h2>
        <p class="mb-2">{{ props.comment.description }}</p>
        <ul>
            <li class="rounded-lg bg-custom-light-blue inline-block text-custom-violet p-2 pl-4 pr-4 mr-2 capitalize font-bold">
                {{ props.comment.category }}
            </li>
        </ul>
        <div class="flex mt-4">
            <UpVotesButton :upVotesValue="props.comment.upvotes" :commentId="props.comment.id" />
            <div class="flex items-center ml-auto">
                <span class="mr-2"><img src="@/assets/shared/icon-comments.svg" /></span>
                <span class="font-bold">{{ props.comment.comments ? props.comment.comments.length : "0"}}</span>
            </div>
        </div>
    </section>    
</template>