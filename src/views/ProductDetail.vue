<script setup lang="ts">
   import { ref, computed } from 'vue'
   import { useRoute, RouterLink } from 'vue-router'
   import { useProducts } from '../composables/useProducts';
   import ProductSkeleton from '../components/ProductSkeleton.vue';
   import ProductPopup from '../components/ProductPopup.vue';
   import VueEasyLightbox from 'vue-easy-lightbox'
   import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/24/outline'

   const route = useRoute()
   const { categories, loading } = useProducts()
  

   // image gallery state 
   const currentImageIndex = ref(0)
   const isLightboxVisible = ref(false)
   const showProductPopup = ref(false)

   // zoom functionality
   const zoomContainer = ref<HTMLElement | null>(null)
   const showZoom = ref(false)
   const zoomPosition = ref({ x: 0, y: 0 })
   const zoomLevel = 2.5 //  zoom magnification level

   const handleMouseMove = (event: MouseEvent) => {
    if(!zoomContainer.value) return

    const rect = zoomContainer.value.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    zoomPosition.value = {
      x: Math.min(Math.max(x, 0), 100),
      y: Math.min(Math.max(y, 0), 100)
    }
   }

   const findProductInCategories = (categories :any[], productId: number): any => {
        for(const category of categories){
              if(category.products){
                  const found = category.products.find((p: any) => p.id === productId)
                  if(found) return found
              }

              if(category.subcategories){
                  for(const subcat of category.subcategories){
                    if(subcat.products){
                      const found = subcat.products.find((p: any) => p.id === productId)
                      if(found) return found
                    }
                   
                    if(subcat.nested_subcategories){
                      for(const nested of subcat.nested_subcategories){
                        if(nested.products){
                          const found = nested.products.find((p: any) => p.id === productId)
                          if(found) return found
                        }
                          if(nested.deep_subcategories){
                            for(const deep of nested.deep_subcategories){
                              if(deep.products){
                                const found = deep.products.find((p: any) => p.id === productId)
                                if(found) return found
                              }
                            }
                          }
                      }
                    }
                  }
              }
        }
        return null
   }

   const product = computed(() => {
    const productId = parseInt(route.params.id as string)
    return findProductInCategories(categories.value || [], productId)
   })

   // Product image array 
   const productImages = computed(() => {
        if(!product.value) return []
        // Ürünün kendi resmini 5 kez tekrar eden bir dizi oluştur
       // Gerçek bir uygulamada burada ürünün farklı açılardan çekilmiş resimleri olurdu
       return product.value.images || [product.value.image]
       //return Array(5).fill(product.value.image)  Ayni sekilleri yapmak icin 
   })

   const showLightbox = ( index: number) => {
    currentImageIndex.value = index
    isLightboxVisible.value = true
   }

   const handleHideLight = () => {
    isLightboxVisible.value = false
   }

   const nextImage = () => {
        currentImageIndex.value = (currentImageIndex.value + 1) % productImages.value.length
   }
   const prevImage = () => {
    currentImageIndex.value = (currentImageIndex.value - 1 + productImages.value.length) % productImages.value.length
  }
</script>

<template>
  <ProductSkeleton v-if="loading"/>
  <div v-else-if="product" class="bg-white rounded-lg shadow-md p-8">
     <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div class="space-y-4">
           <!--   main Image with navigation and zoom  -->
              <div class="relative">
                 <!--  main image container  -->
                   <div ref="zoomContainer" @mouseenter="showZoom = true" @mouseleave="showZoom = false" @mousemove="handleMouseMove"  class="relative overflow-hidden rounded-lg cursor-zoom-in">
                               <img :src="productImages[currentImageIndex]" :alt="product.name" class="w-full h-96 object-cover rounded-lg"/>
                               <!--   navigation arrowa  -->
                               <button @click="prevImage" class="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                                     <ChevronLeftIcon class="w-6 h-6"/>
                               </button>

                               <button @click.stop="nextImage" class="absolute right-4 top-1/2 -translate-y-1/2 bg-black-50 text-white rounded-full hover:bg-black/70 transition-colors">
                                    <ChevronRightIcon class="w-6 h-6"/>
                               </button>
                   </div>

                   <!--  zoomm  window  -->
                     <div v-show="showZoom" class="absolute top-0 left-[calc(100%+1rem)] w-[400px] h-96 rounded-lg overflow-hidden border border-gray-200 shadow-lg bg-white">
                            <div class="w-full h-full" :style="{
                              backgroundImage: `url(${productImages[currentImageIndex]})`,
                              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                              backgroundSize: `${zoomLevel * 100}%`,
                              backgroundRepeat:'no-repeat'
                              }"></div>
                     </div>
              </div>
              <!--  Thumbnail Gallery  -->
                <div class="grid grid-cols-5 gap-2">
                      <button v-for="(image, index) in productImages" :key="index" @click="currentImageIndex = index" 
                      class="relative rounded-lg overflow-hidden aspect-square"
                      :class="{'ring-2 ring-blue-500' : currentImageIndex === index}">
                      <img :src="image" :alt="`${product.name} thumbnail ${index + 1}`" class="w-full h-full object-cover hover:opacity-80 transition-opacity"/>
                      </button>
                </div>
         </div>

         <div class="flex flex-col">
                <h1 class="text-3xl font-bold mb-2 text-gray-800">{{ product.name }}</h1>
                <div class="flex items-center mb-6">
                  <p class="text-3xl text-blue-600 font-bold"> {{ product.price.toFixed(2) }} </p>
                  <span class="ml-2 text-green-600 text-sm font-medium"> In Stock </span>
                </div>

                <div class="flex-grow">
                  <p class="text-gray-600 mb-4">
                             Experience premium quality and exceptional performance with the {{ product.name }}. 
                             This product offers outstanding value for its price point.
                  </p>
                </div>

                <button @click="showProductPopup = true" 
                class="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] font-semibold text-lg shadow-md">
                  Add To Cart 
                </button>
         </div>
     </div>
      <!--   Lightbox    -->
         <vue-easy-lightbox 
         :visible="isLightboxVisible"
         :imgs="productImages"
         :index="currentImageIndex"
         @hide="handleHideLight"
         />

         <!--  product  popup    -->
         <ProductPopup :show="showProductPopup" :product="product" @close="showProductPopup = false"/>
  </div>
  <div v-else class="text-center py-8">
      <p class="text-gray-600 text-lg mb-4">Product not found</p>
      <RouterLink to="/" class="text-blue-600 hover:underline font-semibold">
        Return to Home
      </RouterLink>
  </div>
</template>







