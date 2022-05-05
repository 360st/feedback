<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>
<template>
    <div class="bg-custom-white order-1 w-1/2 p-4 pb-5 lg:mb-6 lg:order-none lg:w-auto lg:rounded-xl lg:mr-6">
        <div class="flex items-center mb-4">
            <h3 class="text-custom-navy text-lg font-bold">Roadmap</h3>
            <router-link :to="{name: 'roadmap'}" class="text-custom-violet underline ml-auto ">View</router-link>           
        </div>
        <ul>
            <li class="flex items-center">
                <span class="mr-4 bg-custom-orange w-2 h-2 rounded-full"></span><span class="text-base">Planned</span><span class="ml-auto font-bold">3</span>
            </li>
            <li class="flex items-center">
                <span class="mr-4 bg-custom-purple w-2 h-2 rounded-full"></span><span class="text-base">In-Progress</span><span class="ml-auto font-bold">3</span>
            </li>
            <li class="flex items-center">
                <span class="mr-4 bg-custom-blue w-2 h-2 rounded-full"></span><span class="text-base">Live</span><span class="ml-auto font-bold">1</span>
            </li>                        
        </ul>
    </div>
</template>