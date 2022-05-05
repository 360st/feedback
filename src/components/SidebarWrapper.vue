<script setup>
import TheTitleSidebar from './TheTitleSidebar.vue';
import CategoriesFilters from './CategoriesFilters.vue';
import TheRoadmapSidebar from './TheRoadmapSidebar.vue';

</script>
<template>
    <div class="flex flex-col">
        <TheTitleSidebar  />
        <div class="flex lg:block">
            <CategoriesFilters  />
            <TheRoadmapSidebar  />
        </div>
    </div>
</template>