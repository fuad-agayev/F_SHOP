<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import { useCart } from '../composables/useCart'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const { categories } = useProducts()
const { addToCart } = useCart()

// Find category and its parent categories
const findCategoryPath = (categoryId: number) => {
  const path: any[] = []
  
  const searchInCategories = (cats: any[], parentPath: any[] = []) => {
    for (const cat of cats) {
      const currentPath = [...parentPath, cat]
      
      if (cat.id === categoryId) {
        path.push(...currentPath)
        return true
      }
      
      if (cat.subcategories) {
        if (searchInCategories(cat.subcategories, currentPath)) return true
      }
      
      if (cat.nested_subcategories) {
        if (searchInCategories(cat.nested_subcategories, currentPath)) return true
      }
      
      if (cat.deep_subcategories) {
        if (searchInCategories(cat.deep_subcategories, currentPath)) return true
      }
    }
    return false
  }
  
  searchInCategories(categories.value || [])
  return path
}

const categoryPath = computed(() => {
  const categoryId = parseInt(route.params.id as string)
  return findCategoryPath(categoryId)
})

const category = computed(() => {
  return categoryPath.value[categoryPath.value.length - 1]
})

const products = computed(() => {
  return category.value?.products || []
})

const subcategories = computed(() => {
  return category.value?.subcategories || []
})

const nestedSubcategories = computed(() => {
  return category.value?.nested_subcategories || []
})

const deepSubcategories = computed(() => {
  return category.value?.deep_subcategories || []
})
</script>

<template>
  <div v-if="category">
    <!-- Breadcrumb Navigation -->
    <nav class="mb-6">
      <ol class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <li>
          <RouterLink to="/" class="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </RouterLink>
        </li>
        <li v-for="(cat, index) in categoryPath" :key="cat.id">
          <div class="flex items-center space-x-2">
            <ChevronRightIcon class="w-4 h-4" />
            <RouterLink 
              :to="`/category/${cat.id}`"
              :class="[
                'hover:text-blue-600 dark:hover:text-blue-400',
                index === categoryPath.length - 1 ? 'font-semibold text-gray-800 dark:text-gray-200' : ''
              ]"
            >
              {{ cat.name }}
            </RouterLink>
          </div>
        </li>
      </ol>
    </nav>

    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-red-500">{{ category.name }}</h1>
    
    <!-- Main Subcategories -->
    <div v-if="subcategories.length" class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Subcategories</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RouterLink v-for="subcat in subcategories" 
                   :key="subcat.id"
                   :to="`/category/${subcat.id}`"
                   class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">{{ subcat.name }}</h3>
        </RouterLink>
      </div>
    </div>

    <!-- Nested Subcategories -->
    <div v-if="nestedSubcategories.length" class="mb-8">
      <h2 class="text-2xl font-semibold mb-4 dark:text-amber-400"> More Categories </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RouterLink v-for="nested in nestedSubcategories" 
                   :key="nested.id"
                   :to="`/category/${nested.id}`"
                   class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">{{ nested.name }}</h3>
        </RouterLink>
      </div>
    </div>

    <!-- Deep Subcategories -->
    <div v-if="deepSubcategories.length" class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Specialized Categories</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RouterLink v-for="deep in deepSubcategories" 
                   :key="deep.id"
                   :to="`/category/${deep.id}`"
                   class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">{{ deep.name }}</h3>
        </RouterLink>
      </div>
    </div>

    <!-- Products -->
    <div v-if="products.length">
      <h2 class="text-2xl font-semibold mb-4">Products</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="product in products" 
             :key="product.id"
             class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <RouterLink :to="`/product/${product.id}`">
            <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover">
               <div class="p-4">
              <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{{ product.name }}</h3>
              <p class="text-gray-600 dark:text-gray-400">${{ product.price.toFixed(2) }}</p>
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

  </div>
  <div v-else class="text-center py-8">
    <p class="text-gray-600 dark:text-gray-400">Category not found</p>
    <RouterLink to="/" class="text-blue-600 dark:text-blue-400 hover:underline">Return to Home</RouterLink>
  </div>
</template>
















