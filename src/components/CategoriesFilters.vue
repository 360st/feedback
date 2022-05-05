<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useData } from '../stores/data';

const { getFilterValue } = useData()
const { categories }  = storeToRefs(useData())
const filterValue = ref(null)


const getValueFilterElement = (value) => {
    filterValue.value = value
    getFilterValue(value)
}
</script>
<template>
    <div class="bg-custom-white order-2 w-1/2 p-4 pt-6 border-l-2 border-custom-light-blue lg:border-none lg:order-none lg:mb-6 lg:w-auto lg:mr-6 lg:rounded-lg">
        <ul>
            <li :class="{active: filterValue === null ? index === 0 : filterValue === value }" class="rounded-lg bg-custom-light-blue inline-block text-custom-violet p-2 pl-2 pr-2 mr-2 mb-2 cursor-pointer hover:bg-custom-violet hover:text-custom-white transition-all capitalize lg:pr-4 lg:pl-4" @click="getValueFilterElement(value)" v-for="(value, index) in categories" :key="value">
                {{ value }}
            </li>
        </ul>
    </div>
</template>
<style scoped>
 .active {
     background: #4661e6 !important;
     color: #fff;
 }
</style>