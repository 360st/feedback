<script setup>
  import TopNavbar from '../components/TopNavbar.vue';
  import SidebarWrapper from '../components/SidebarWrapper.vue';
  import FeedbacksWrapper from '../components/FeedbacksWrapper.vue';
</script>

<template>
  <main>
    <div class="grid grid-cols-12">
      <div class="col-span-12 lg:col-span-3">
        <SidebarWrapper />
      </div>
      <div class="col-span-12 lg:col-span-9">
        <TopNavbar />
        <FeedbacksWrapper />
      </div>
    </div>
  </main>
</template>
