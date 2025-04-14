<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import { useSearch } from '../composables/useSearch'
import { useCart } from '../composables/useCart'

const route = useRoute()
const { categories } = useProducts()
const { searchQuery, setSearchQuery, searchProducts } = useSearch()
const { addToCart } = useCart()

// Update search query from URL
if (route.query.q) {
  setSearchQuery(route.query.q as string)
}

const searchResults = computed(() => {
  return searchProducts(categories.value)
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Search Results</h1>
    <p class="text-gray-600 mb-8">
      Showing results for: "{{ searchQuery }}"
    </p>

    <div v-if="searchResults.length === 0" class="text-center py-12">
      <p class="text-gray-600 text-lg">No products found matching your search.</p>
      <RouterLink to="/" class="text-blue-600 hover:underline mt-4 inline-block">
        Return to Home
      </RouterLink>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in searchResults" 
           :key="product.id"
           class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <RouterLink :to="`/product/${product.id}`">
          <img :src="product.image" 
               :alt="product.name" 
               class="w-full h-48 object-cover hover:opacity-90 transition-opacity">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2 line-clamp-2">{{ product.name }}</h3>
            <p class="text-gray-600 font-bold">${{ product.price.toFixed(2) }}</p>
          </div>
        </RouterLink>
        <div class="p-4 pt-0">
          <button @click="addToCart(product)"
                  class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>