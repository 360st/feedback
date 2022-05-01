<script setup>
import { ref } from 'vue'
import { useData } from '../stores/data';
import { storeToRefs } from 'pinia';
import Button from './buttons/Button.vue';
 
const { sortByNumbers } = useData()
const { filterByStatus, valueOfSortByNumbers } = storeToRefs(useData())

const sortsArr = ['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments']
const boleanValue = ref(false)

const getValue = (value) => {
    boleanValue.value = false
    sortByNumbers(value)
}

</script>
<template>
    <nav class="bg-custom-navy md:rounded-xl p-3 flex items-center lg:p-4 lg:pl-8 lg:pr-8 mb-6">
        <img class="hidden mr-6 md:inline" src="@/assets/suggestions/icon-suggestions.svg" />
        <span class="hidden text-custom-white font-bold text-xl mr-10 md:inline">{{ filterByStatus('suggestion').length }} Suggestion</span>
        <div class="flex relative">
            <span class="text-custom-white mr-2">Sort By:</span>
            <span class="text-custom-white cursor-pointer font-bold" @click="boleanValue = !boleanValue">{{ valueOfSortByNumbers === '' ? sortsArr[0] : valueOfSortByNumbers }} <img :class="{'rotate-180': boleanValue}" class="inline-block transition-all" src="@/assets/shared/icon-arrow-down.svg" /></span>
            <Transition name="nested">
                <ul v-if="boleanValue" class="text-custom-navy rounded-xl bg-custom-white absolute shadow-xl top-7 left-5 overflow-hidden">
                    <li class="p-2.5 pr-6 pl-6 text-base cursor-pointer w-48 border-b border-[#e2e3ea] last:border-b-0 last:pb-3 hover:bg-custom-light-blue transition ease-out duration-500" @click="getValue(value)" v-for="value in sortsArr" :key="value">{{ value }}</li>
                </ul>
            </Transition>
        </div>
        <router-link class="ml-auto" :to="{name: 'addFeedback'}"> <Button msg="+ Add Feedback" /> </router-link>
    </nav>
</template>
<style>
.nested-enter-active, .nested-leave-active {
	transition: all 0.3s ease-in-out;
}
.nested-leave-active {
  transition-delay: 0.15s;
}
.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>