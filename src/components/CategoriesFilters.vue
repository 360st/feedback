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
    <div class="bg-custom-white rounded-lg mr-6 p-4 pt-6 mb-6">
        <ul>
            <li :class="{active: filterValue === null ? index === 0 : filterValue === value }" class="rounded-lg bg-custom-light-blue inline-block text-custom-violet p-2 pl-4 pr-4 mr-2 mb-2 cursor-pointer hover:bg-custom-violet hover:text-custom-white transition-all capitalize" @click="getValueFilterElement(value)" v-for="(value, index) in categories" :key="value">
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