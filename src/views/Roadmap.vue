<script setup>
import { RouterLink } from 'vue-router';
import { useData } from '../stores/data';
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import Button from '../components/buttons/Button.vue';
import CurrentRoadmap from '../components/CurrentRoadmap.vue';

const { filterByStatus } = storeToRefs(useData())

const arr2 = [
    {
        id: 1,
        name: 'planned',
        color: '#f59f86'
    },
    {
        id: 2,
        name: 'in-progress',
        color: '#ae1feb'
    },
    {
        id:3,
        name: 'live',
        color: '#62bcfb'
    }
]
const name = ref('planned')
const color = ref('#f59f86')
const screenWidth = ref(window.innerWidth);

const change = (categorry) => {
    name.value = categorry.name
    color.value = categorry.color
}

</script>
<template>
    <div class="bg-custom-navy md:rounded-xl p-3 flex items-center lg:p-4 lg:pl-8 lg:pr-8 lg:mb-8">
        <div class="">
            <router-link class="font-bold flex items-center" :to="{name: 'home'}"><img class="mr-2" src="@/assets/shared/icon-arrow-left.svg" /> <span class="text-custom-white" >Go back</span></router-link>
            <span class="hidden text-custom-white font-bold text-xl mr-10 md:inline">Roadmap</span>
        </div>
        <router-link class="ml-auto" to="/add"> <Button msg="+ Add Feedback" /> </router-link>
    </div>
    <div class="bg-custom-white shadow lg:hidden">
        <ul class="flex text-center">
            <li :class="{'active': name === categorry.name, color: name === categorry.name}" 
                @click="change(categorry)" v-for="categorry in arr2" :key="categorry.id" 
                class="w-1/3 pt-4 pb-4 font-bold cursor-pointer text-custom-light-grey capitalize border-b-2 border-custom-white" >
                {{categorry.name}} ({{filterByStatus(categorry.name).length}})
            </li>
        </ul>
    </div>
    <div class="p-6 grid grid-cols-12">
        <TransitionGroup name="nested">
            <div v-if="screenWidth < 1024 ? name === arr2[0].name : arr2[0].name === arr2[0].name" class="col-span-12 lg:col-span-4 lg:mr-6">
                <h3 class="text-lg font-bold">Planned ({{filterByStatus('planned').length}})</h3>
                <p class="mb-6">Ideas prioritized for research </p>
                <CurrentRoadmap v-for="comment in filterByStatus('planned')" :key="comment.id" :comment = comment border="border-custom-orange" bg="bg-custom-orange" />
            </div>
         
            <div v-if="screenWidth < 1024 ? name === arr2[1].name : arr2[1].name === arr2[1].name" class="col-span-12 lg:col-span-4 lg:mr-6">
                <h3 class="text-lg font-bold">In-Progress ({{filterByStatus('in-progress').length}})</h3>
                <p class="mb-6">Currently being developed</p>
                <CurrentRoadmap v-for="comment in filterByStatus('in-progress')" :key="comment.id" :comment = comment border="border-custom-purple" bg="bg-custom-purple" />          
            </div>
 
            <div v-if="screenWidth < 1024 ? name === arr2[2].name : arr2[2].name === arr2[2].name" class="col-span-12 lg:col-span-4">
                <h3 class="text-lg font-bold">Live ({{filterByStatus('live').length}})</h3>
                <p class="mb-6">Released features</p>
                <CurrentRoadmap v-for="comment in filterByStatus('live')" :key="comment.id" :comment = comment border="border-custom-blue" bg="bg-custom-blue" />           
            </div>
        </TransitionGroup> 
    </div>
</template>
<style scoped>
    .active {
        color: #373e68 !important;
        border-bottom: 2px solid v-bind('color');
        transition: all 0.3s ease-in-out;
    }
</style>