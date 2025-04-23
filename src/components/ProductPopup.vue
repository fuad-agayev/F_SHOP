<script setup lang="ts">
    import { ref } from 'vue'
    import { useCart } from '../composables/useCart'

    const props = defineProps<{
      show: boolean
      product: any
    }>()

    const emit = defineEmits<{
      close: []
    }>()

    const { addToCart } = useCart()
    const quantity = ref(1)

    const updateQuantity = (change: number) => {
          const newQuantity = quantity.value + change
          if(newQuantity >= 1){
            quantity.value = newQuantity
          }
    }

    const addToCartAndClose = () => {
      for(let i = 0; i < quantity.value; i++ ){
            addToCart(props.product)
      }
      quantity.value = 1
         emit('close')
    }
</script>

<template>
<Transition name="fade">
   <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
        <!--  backdrop  -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('close')"></div>
        <!--  popup  -->
        <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full mx-4 transform transition-all">
            <!--  Close Button  -->
            <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                     <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                     </svg>
            </button>

            <div class="p-6">
                <div class="flex gap-6">
                  <!--   Product Image  -->
                     <div class="w-1/3">
                         <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-lg"/>
                     </div>
                  <!--  product details  -->
                    <div class="w-2/3">
                           <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200"> {{ product.nmae }} </h3>
                           <p class="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400"> ${{ (product.price * quantity).toFixed(2) }} </p>
                           <!--   quantity controls  -->
                           <div class="flex items-center space-x-4 mb-6">
                               <span class="text-gray-600 dark:text-gray-400"> Quantity: </span>
                               <div class="flex items-center border dark:border-gray-600 rounded-br-lg">
      <button @click="updateQuantity(-1)" :disabled="quantity <= 1" class="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg"> - </button>
      <span class="px-4 py-1 text-gray-800 dark:text-gray-200">{{ quantity }}</span>
      <button @click="updateQuantity(1)" class="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg"> + </button>
                               </div>
                           </div>
                           <!--  Add to Cart Button  -->
                             <button @click="addToCartAndClose"
                              class="w-full text-white bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round"
                                     stroke-linejoin="round"
                                     stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707
                                                  1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                               </svg>
                              <span> Add To Cart </span>
                             </button>
                    </div>
                </div>
            </div>
        </div>
   </div>
</Transition>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
     transition: opacity 0.3s ease;
  }

  .fade-enter-from, 
  .fade-leave-to {
      opacity: 0;
  }

  .fade-enter-active .transform,
  .fade-leave-active .transform {
    transition: transform 0.3s ease;
  }

  .fade-enter-from .transform,
  .fade-leave-to .transform {
    transition: scale(0.95);
  }
</style>