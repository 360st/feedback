<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useData } from '../stores/data';

const { filterByStatus } = storeToRefs(useData())
const arr = ['planned', 'in-progress', 'live']
</script>
<template>
    <div class="bg-custom-white order-1 w-1/2 p-4 pb-5 lg:mb-6 lg:order-none lg:w-auto lg:rounded-xl lg:mr-6">
        <div class="flex items-center mb-4">
            <h3 class="text-custom-navy text-lg font-bold">Roadmap</h3>
            <router-link :to="{name: 'roadmap'}" class="text-custom-violet underline ml-auto ">View</router-link>           
        </div>
        <ul>
            <li v-for="categorry in arr" :key="categorry" class="flex items-center">
                <span class="mr-4  w-2 h-2 rounded-full" 
                    :class="{'bg-custom-orange': categorry === 'planned', 'bg-custom-purple': categorry === 'in-progress', 'bg-custom-blue': categorry === 'live'}">
                </span>
                <span class="text-base capitalize">{{categorry}}</span>
                <span class="ml-auto font-bold">{{filterByStatus(categorry).length}}</span>
            </li>                     
        </ul>
    </div>
</template>