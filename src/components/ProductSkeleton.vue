<template>
  <div class="bg-white rounded-lg shadow-md p-8">
   <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
       <!--   Image gallery skeleton  -->
          <div class="space-x-4">
              <!--   main image skeleton  -->
                 <div class="relative overflow-hidden">
                       <div class="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
                       <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-wave"></div>
                 </div>
                 <!--   Thumbnail  gallery skeleton   -->
                 <div class="grid grid-cols-5 gap-2">
                       <div v-for="i in 5" :key="i" class="relative overflow-hidden aspect-square">
                            <div class="animate-pulse bg-gray-200 w-full h-full rounded-lg"></div>
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-wave"></div>
                       </div>
                 </div>
          </div>
          <div class="space-y-6">
            <!--   title skeleton  -->
               <div class="space-y-3">
                   <div class="relative overflow-hidden">
                       <div class="animate-pulse bg-gray-200 h-8 w-3/4 rounded"></div>
                       <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-wave"></div>
                   </div>
                   <div class="">
                    <div class="animate-pulse bg-gray-200 h-8 w-1/2 rounded"></div>
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-wave"></div>
                   </div>                  
               </div>
               <!--   Price skeleton  -->
                  <div class="relative overflow-hidden">
                    <div class="animate-pulse bg-gray-200 h-8 w-1/3 rounded"></div>
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-wave"></div>
                  </div>
                  <!--   Descriptions skeleton   -->
                     <div class="space-y-2">
                            <div class="relative overflow-hidden" v-for="i in 3" :key="i">
                                 <div class="animate-pulse bg-gray-200 h-4 rounded" :class="{ 'w-full' : i === 1, 'w-3/4': i === 2, 'w-1/2': i === 3 }"></div>
                                 <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-wave"></div>
                            </div>
                     </div>
                     <!--   Button skeleton  -->
                        <div class="relative overflow-hidden mt-8">
                            <div class="animate-pulse bg-gray-200 h-14 w-full rounded-lg"></div>
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-wave"></div>
                        </div>
          </div>
   </div>
  </div>
</template>

<script setup lang="ts">
   // no more here 
</script>

<style scoped>
.skeleton-wave {
  animation: wave 2s infinite linear;
}

@keyframes wave {
    0%{
     transform: translateX(-100%);
    }
    50%, 100% {
      transform: translateX(100%);
    }
  
}
</style>