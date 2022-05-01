<script setup>
import TheTitleSidebar from './TheTitleSidebar.vue';
import CategoriesFilters from './CategoriesFilters.vue';
import TheRoadmapSidebar from './TheRoadmapSidebar.vue';

</script>
<template>
    <div class="flex lg:flex-col">
        <TheTitleSidebar class="w-1/3 lg:w-auto"  />
        <CategoriesFilters class="w-1/3 lg:w-auto" />
        <TheRoadmapSidebar class="w-1/3 lg:w-auto" />
    </div>
</template>