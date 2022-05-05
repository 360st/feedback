<script setup>
import { storeToRefs } from 'pinia';
import { useData } from '../stores/data';
import { ref, watchEffect } from 'vue'
import CurrentFeedback from './CurrentFeedback.vue';
import Button from './buttons/Button.vue';
import AddComment from './AddComment.vue'

const props = defineProps({
    id: String
})

const { removeComment } = useData()
const { data, currentUser } = storeToRefs(useData())
const currentcomment = data.value.find(e => e.id === parseInt(props.id))
const index = data.value.findIndex(e => e.id === parseInt(props.id))

const replyParent = ref(null)
const replyChildren = ref(null)
const replyChildrenCheck = ref(null)


</script>
<template>

<div class="p-6 m-auto max-w-3xl lg:p-0">
    <div class="p-3 flex items-center lg:p-4 lg:pl-0 lg:pr-0 mb-8">
        <div class="">
            <p class="font-bold flex items-center cursor-pointer"
                onclick="history.back()">
                <img class="mr-2" src="@/assets/shared/icon-arrow-left.svg" /> 
                <span >Go back</span>
            </p>
        </div>
        <router-link class="ml-auto" :to="{name: 'editFeedback'}"> 
            <Button class="shadow" msg="Edit Feedback" color="bg-custom-violet"/> 
        </router-link>
    </div>
    <section class="bg-custom-white rounded-xl mb-6 p-4">
        <CurrentFeedback :comment = currentcomment />
    </section>
    <section class="bg-custom-white rounded-xl mb-6 p-4">
        <h3 class="font-bold text-lg mb-6">
           {{currentcomment.commentsLenght}} Comments
        </h3>

        <div class="grid grid-cols-12 mb-6 pb-6 border-b-2 border-b-custom-light-blue last:border-b-0 last:mb-0 " 
            v-for="(comment, commentsIndex) in currentcomment.comments" :key="comment.id">
            <div class="col-span-2 lg:col-span-1">
                <img class="rounded-full w-9" :src="`/src/assets/${comment.user.image}`" />
            </div>
            <div class="col-span-8 lg:col-span-10">
                <p class="font-bold">{{ comment.user.name }}</p>
                <p class="mb-4">@{{ comment.user.username }}</p>
                <p class="text-custom-grey">{{ comment.content }}</p>
            </div>
            <div class="col-span-2 lg:col-span-1 text-center">
                <p class="font-bold text-custom-violet text-xs cursor-pointer"
                    @click="replyParent = comment.id, replyChildren = null">
                    Reply
                </p>
                <img v-if="currentUser.username === comment.user.username" 
                    @click="removeComment(index, commentsIndex)" 
                    class="pointer cursor-pointer w-3 opacity-60 mt-8 inline" src="@/assets/delete.png" />
            </div> 
            <Transition name="nested">
                <div v-if="replyParent === comment.id" class="col-span-12">
                    <AddComment :index="index" :commentsIndex="commentsIndex" :replyingTo="comment.user.username" @value="replyParent = null" />
                </div>
            </Transition>

            <div class="col-span-12" v-for="(replies, repliesIndex) in comment.replies" :key="replies.id">
                <div class="grid grid-cols-12 mb-6 pb-6 mt-6 ml-8 pl-8 border-custom-light-blue border-l-2 last:border-b-0 last:mb-0">
                    <div class="col-span-1">
                        <img class="rounded-full w-9" :src="`/src/assets/${replies.user.image}`" />
                    </div>
                    <div class="col-span-10">
                        <p class="font-bold">{{ replies.user.name }}</p>
                        <p class="mb-4">@{{ replies.user.username }}</p>
                        <p class="text-custom-grey"><span class="text-custom-purple font-bold">@{{replies.replyingTo}}</span> {{ replies.content }}</p>
                    </div>
                    <div class="col-span-1 text-center">
                        <p class="font-bold text-custom-violet text-xs cursor-pointer" 
                            @click="replyChildren = replies.id, replyChildrenCheck = repliesIndex, replyParent = null">
                            Reply
                        </p>
                        <img v-if="currentUser.username === replies.user.username" 
                           @click="removeComment(index, commentsIndex, repliesIndex)" 
                            class="pointer cursor-pointer w-3 opacity-60 mt-8 inline" src="@/assets/delete.png" />
                    </div> 
                </div>
                <Transition name="nested">
                    <div v-if="replyChildren === replies.id && replyChildrenCheck === repliesIndex">  
                        <AddComment :index="index" :commentsIndex="commentsIndex" :replyingTo="replies.user.username" @value="replyChildren = null" />
                    </div>
                </Transition>
            </div>
        </div>
    </section>
    <AddComment :index="index" />
</div>    
</template>
