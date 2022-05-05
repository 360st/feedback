<script setup>
import { ref } from 'vue';
import { useData } from '../stores/data';
import Button from './buttons/Button.vue';

const props = defineProps({
    index: Number,
    replyingTo: String,
    commentsIndex: Number,
})

const { addComment } = useData()
const emit = defineEmits(['value'])
const text = ref('')

const add = () => {
    addComment(parseInt(props.index), props.commentsIndex, props.replyingTo, text.value)
    text.value = ''
    emit('value', false)
}

</script>
<template>
    <section class="bg-custom-white rounded-xl mb-6 p-4" :class="{'pl-14': props.replyingTo}">
        <h3 v-if="!props.replyingTo" class="font-bold text-lg mb-6">Add Comment</h3>
        <form @submit.prevent="add">
            <textarea v-model="text" class="bg-custom-light-blue rounded-lg p-4 w-full mb-4" placeholder="Type your comments here" maxlength="250" required></textarea>
            <div class="flex items-center">
                <span class="text-xs">{{ text.length }}/250</span>
                <Button class="float-right ml-auto" :msg="!props.replyingTo ? 'Post Comment' : 'Reply Comment'" />
            </div>
        </form>
    </section>
</template>