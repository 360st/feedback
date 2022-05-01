<script setup>
import { storeToRefs } from 'pinia';
import { RouterLink , useRouter } from 'vue-router';
import { useData } from '../stores/data';
import { ref } from 'vue'
import Button from './buttons/Button.vue';

const props = defineProps({
    id: String
})

const { addEditDeleteFeedback } = useData()
const { categories, data } = storeToRefs(useData())
const router = useRouter()
const feedbackData = ref(null)
const removeFeedback = ref(false)
const statusArr = ['suggestion', 'planned', 'in-progress', 'live']


if(props.id){
    const currentEditFeadback = data.value.find(e => e.id === parseInt(props.id))
    feedbackData.value = {
        id: currentEditFeadback.id,
        title: currentEditFeadback.title,
        description: currentEditFeadback.description,
        category: currentEditFeadback.category,
        status: currentEditFeadback.status,
        upvotes: currentEditFeadback.upvotes,
        comments: currentEditFeadback.comments
    }
    console.log(feedbackData.value)
} else {
    feedbackData.value = {
        title: '',
        description: '',
        category: "",
        upvotes: 0,
        status: "suggestion",
        comments: []  
    }    
}


const add = () => {
    addEditDeleteFeedback(feedbackData.value, props.id && parseInt(props.id), removeFeedback.value)
    removeFeedback.value = false
    router.push({name: 'home'})
}

</script>
<template>

    <div class="max-w-lg m-auto">
        <router-link class="font-bold text-custom-grey flex items-center" :to="{name: 'home'}"><img class="mr-2" src="@/assets/shared/icon-arrow-left.svg" /> <span >Go back</span></router-link>
        <form @submit.prevent="add()">
            <div class="bg-custom-white rounded-xl mt-10 p-6 pt-12 relative">
                <img class="w-14 absolute -top-6" src="@/assets/shared/icon-new-feedback.svg" />
                <h2 class="font-bold text-lg mb-6">{{id ? 'Edit Feedback' : 'Create New Feedback'}}</h2>
                <p class="font-bold text-custom-navy">Feedback Title</p>
                <p class="mb-4">Add a short, descriptive headline </p>
                <input v-model="feedbackData.title" class="bg-custom-light-blue w-full rounded p-2 pt-3 pb-3 mb-6" type="text" />

                <p class="font-bold text-custom-navy">Category</p>
                <p class="mb-4">Choose a category for your feedback </p>
                <select v-model="feedbackData.category" class="mb-6 w-full p-3 bg-custom-light-blue text-custom-grey">
                    <option v-for="category in categories.slice(1)" :key="category" :value="category">{{ category }}</option>
                </select>
                <div v-show="id">
                <p class="font-bold text-custom-navy">Status</p>
                <p class="mb-4">Choose a status for your feedback </p>
                <select v-model="feedbackData.status" class="mb-6 w-full p-3 bg-custom-light-blue text-custom-grey">
                    <option v-for="status in statusArr" :key="status" :value="status">{{ status }}</option>
                </select>
                </div>
                <p class="font-bold text-custom-navy">Feedback Details</p>
                <p class="mb-4">Include any specific comments on what should be improved, added, etc. </p>
                <textarea v-model="feedbackData.description" class="bg-custom-light-blue w-full rounded h-20 p-2 mb-6"></textarea>
                
                <div class="flex justify-end">
                    <Button @click="removeFeedback = true" v-show="id" class="mr-auto" msg="Delate" color="bg-custom-red" />
                    <router-link :to="{name: 'home'}">
                        <Button class="mr-4" msg="Cancel" color="bg-custom-grey" />
                    </router-link>
                    <Button :msg="id ? 'Save Changes' : 'Add Feedback'" />
                </div>
            </div>
        </form>
    </div> 
</template>