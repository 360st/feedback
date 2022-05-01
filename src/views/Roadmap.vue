<script setup>
import { RouterLink } from 'vue-router';
import { useData } from '../stores/data';
import { storeToRefs } from 'pinia';
import Button from '../components/buttons/Button.vue';
import CurrentRoadmap from '../components/CurrentRoadmap.vue';

const { filterByStatus } = storeToRefs(useData())


</script>
<template>
    <div class="bg-custom-navy md:rounded-xl p-3 flex items-center lg:p-4 lg:pl-8 lg:pr-8 mb-8">
        <div class="">
            <router-link class="font-bold flex items-center" :to="{name: 'home'}"><img class="mr-2" src="@/assets/shared/icon-arrow-left.svg" /> <span class="text-custom-white" >Go back</span></router-link>
            <span class="hidden text-custom-white font-bold text-xl mr-10 md:inline">Roadmap</span>
        </div>
        <router-link class="ml-auto" to="/add"> <Button msg="+ Add Feedback" /> </router-link>
    </div>
    <div class="grid grid-cols-12">
        <div class="col-span-4 mr-6">
            <h3 class="text-lg font-bold ml-4">Planned ({{filterByStatus('planned').length}})</h3>
            <p class="mb-6 ml-4">Ideas prioritized for research </p>
            <CurrentRoadmap v-for="comment in filterByStatus('planned')" :key="comment.id" :comment = comment border="border-custom-orange" bg="bg-custom-orange" />
        </div>
        <div class="col-span-4 mr-6">
            <h3 class="text-lg font-bold ml-4">In-Progress ({{filterByStatus('in-progress').length}})</h3>
            <p class="mb-6 ml-4">Currently being developed</p>
            <CurrentRoadmap v-for="comment in filterByStatus('in-progress')" :key="comment.id" :comment = comment border="border-custom-purple" bg="bg-custom-purple" />          
        </div>
        <div class="col-span-4">
            <h3 class="text-lg font-bold ml-4">Live ({{filterByStatus('live').length}})</h3>
            <p class="mb-6 ml-4">Released features</p>
            <CurrentRoadmap v-for="comment in filterByStatus('live')" :key="comment.id" :comment = comment border="border-custom-blue" bg="bg-custom-blue" />           
        </div>
    </div>
</template>