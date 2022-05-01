<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useData } from './stores/data'

const { loadData, loadCategory } = useData()
loadData()
loadCategory()
</script>

<template>
  <div class="container mx-auto max-w-[1110px] md:p-4 md:mt-4 font-Roboto text-sm" >
    <RouterView />
  </div>
</template>

<style>
  body {
    background: #f2f4ff;
  }
  h1, h2, h3, h4 {
    color: #373e68
  }
  p, span, li {
    color: #647196;
  }
</style>