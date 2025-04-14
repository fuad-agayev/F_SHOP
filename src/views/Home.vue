<template>
<div class="frid grid-col gap-8">
  <div class="h-[500px]" data-aos="fade-down">
    <Carousel />
  </div>
  <div data-aos="fade-up" data-aos-delay="200">
         <h1 class="text-2xl font-bold text-gray-800 mb-6 dark:text-gray-200">Featured Products </h1>
         <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             <div v-for="(product, index) in paginatedProducts" :key="product.id" 
             class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow" :data-aos="'fade-up'" :data-aos-delay="index * 100">
                  <RouterLink :to="`/product/${product.id}`">
                    <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover hover:opacity-90 transition-opacity"/>
                    <div class="p-4">
                         <h3 class="text-lg font-semibold mb-2 text-gray-800dark:text-gray-200 line-clamp-2">{{ product.name }}</h3>
                         <p class="text-gray-600 dark:text-gray-400 font-bold">{{ product.price.toFixed(2) }}</p>
                    </div>
                  </RouterLink>
                  <div class="p-4 pt-0">
                      <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors" @click="addToCart(product)"> Add to Cart </button>
                  </div>
             </div>
         </div>
             <!--    Pagination  -->
         <div v-if="totalPages > 1" class="flex items-center justify-center space-y-2 mt-8" data-aos="fade-up" data-aos-delay="300">
              <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" 
              class="px-3 py-1 rounded-lg border"
              :class="currentPage === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-blue-600 text-blue-600 hover:bg-blue-50'">
               Previous
               </button>

               <button v-if="showPrevDots" @click="goToPage(1)" class="px-3 py-1 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50">
                1
               </button>

               <span v-if="showPrevDots" class="text-gray-500">...</span>

               <button v-for="page in pageNumbers" :key="page" @click="goToPage(page)" 
               class="px-3 py-1 rounded-lg border"
               :class="page === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-600 text-blue-600 hover:bg-blue-50'">
                  {{ page }}
               </button>
               <span v-if="showNextDots" class="text-gray-500">...</span>

               <button v-if="showNextDots" @click="goToPage(totalPages)">
                 {{ totalPages }}
               </button>

               <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="px-3 py-1 rounded-lg border"
                :class="currentPage === totalPages ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-blue-600 text-blue-600 hover:bg-blue-50'">
                      Next 
               </button>
         </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref , computed} from 'vue';
import { useProducts } from '../composables/useProducts';
import { useCart } from '../composables/useCart';
import { RouterLink } from 'vue-router';
import   Carousel from '@/components/Carousel.vue';

const { allProducts} = useProducts();
const { addToCart } = useCart();

//  pagination 
const currentPage = ref(1);
const itemsPerPage = ref(10);

const totalPages = computed(() => Math.ceil(allProducts.value.length / itemsPerPage.value))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return allProducts.value.slice(start, end)
})
const pageNumbers = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  const halfVisible  = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(currentPage.value - halfVisible, 1);
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages.value);

  if(endPage - startPage + 1 < maxVisiblePages){
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }
  for(let i = startPage; i <= endPage; i++){
    pages.push(i);
  }

  return pages;
})

const goToPage = (page: number) => {
     currentPage.value = page;
     window.scrollTo({ top: 0, behavior: 'smooth'})
  }

  const showPrevDots = computed(() => pageNumbers.value[0] > 1)
  const showNextDots = computed(() => pageNumbers.value[pageNumbers.value.length - 1] < totalPages.value)
</script>

