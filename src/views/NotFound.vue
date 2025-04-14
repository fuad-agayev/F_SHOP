<template>
  <div class="min-h-[70vh] flex flex-col items-center justify-center">
    <h1 class="text-9xl text-gray-200 font-bold">404</h1>
    <h2 class="text-2xl text-gray-600 font-semibold mt-4">This page not found</h2>
    <p class="text-gray-500 mt-2">This page you're looking for doesn't exist or has been moved</p>
   <RouterLink to="/" class="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors">
      Return To Home
   </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>

</style>