<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue';
import { useData } from '../stores/data'
import CurrentFeedback from './CurrentFeedback.vue'
import TheNoSearchResultsFound from './TheNoSearchResultsFound.vue';

const { filterByCategory, filterByStatus, filterValue } = storeToRefs(useData())

const empty = {value: false}
const currentValue = computed(()=> {

    if(filterValue.value === 'all')
        return  filterByStatus.value('suggestion')

    else if(filterByCategory.value(filterValue.value) == false)
        return empty

    else 
        return filterByCategory.value(filterValue.value)

})

</script>
<template>
    <section class="bg-custom-white rounded-xl m-6 p-4 lg:m-0 lg:mb-6" v-for="comment in currentValue" :key="comment.id">
        <TheNoSearchResultsFound v-if="comment == false" />
        <CurrentFeedback v-else :comment = comment />
    </section>
</template>