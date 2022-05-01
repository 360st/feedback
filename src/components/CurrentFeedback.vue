<script setup>
import { computed, ref, watchEffect } from '@vue/runtime-core';
import { RouterLink } from 'vue-router';
import UpVotesButton from './buttons/UpVotesButton.vue'

const props = defineProps({
    comment: {
        type: Object,
    },
})
const emit = defineEmits(['sumLengthOfComments'])

const replyLength = ref(0)



const test = props.comment.comments.map(e => {
    if(e.replies)
       return replyLength.value += e.replies.length

})


const sumLengthOfComments = computed(() => props.comment.comments.length + replyLength.value)

emit('sumLengthOfComments', sumLengthOfComments.value)

</script>
<template>
    <div class="grid grid-cols-12">
        <div class="col-span-1">
            <UpVotesButton :upVotesValue="props.comment.upvotes" :commentId="props.comment.id" />
        </div>
        <div class="col-span-10">
            <h2 class="font-bold text-lg mb-1">
                <router-link :to="{name: 'CommentWrapper', params: {id: props.comment.id}}">{{ props.comment.title }}</router-link>
            </h2>
            <p class="text-base mb-3">{{ props.comment.description }}</p>
            <ul>
                <li class="rounded-lg bg-custom-light-blue inline-block text-custom-violet p-2 pl-4 pr-4 mr-2 mb-2 font-bold capitalize">
                    {{ props.comment.category }}
                </li>
            </ul>
        </div>
        <div class="col-span-1 flex items-center">
            <span class="mr-2"><img src="@/assets/shared/icon-comments.svg" /></span>
            <span class="font-bold">{{ props.comment.comments ? sumLengthOfComments : "0"}}</span>
        </div>
    </div>
</template>