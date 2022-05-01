<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    upVotesValue: Number,
    commentId: Number
})

const checkIfClicked = ref(false)
const upVotesValue = ref(props.upVotesValue)
const dataFromLocalStorage = computed(() => JSON.parse(localStorage.getItem(props.commentId)))

if(dataFromLocalStorage.value !== null){
    checkIfClicked.value = dataFromLocalStorage.value.key
    upVotesValue.value = dataFromLocalStorage.value.value
}

const Upvote = () => {
    
    if(checkIfClicked.value == false){
        upVotesValue.value ++
        checkIfClicked.value = true
        const dataToLocalStorage = ref({
            key: checkIfClicked.value,
            value: upVotesValue.value
        })
        localStorage.setItem(props.commentId, JSON.stringify(dataToLocalStorage.value))
        
    } else if(checkIfClicked.value == true) {
        upVotesValue.value --
        checkIfClicked.value = false
        const dataToLocalStorage = ref({
            key: checkIfClicked.value,
            value: upVotesValue.value
        })
        localStorage.setItem(props.commentId, JSON.stringify(dataToLocalStorage.value))
    }
}
</script>
<template>
    <button @click="Upvote" :class="{'bg-custom-violet': checkIfClicked == true}" class="rounded-lg bg-custom-light-blue p-3 pb-2 font-bold  flex flex-col items-center"><svg class="mb-2" width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path :class="{'stroke-white': checkIfClicked == true}" d="M1 6l4-4 4 4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd"/></svg> <span :class="{'text-custom-white': checkIfClicked == true}" class="text-custom-navy text-xs">{{ upVotesValue }}</span></button>
</template>
<style scoped>
    .stroke-white {
        stroke: white !important;
    }
</style>