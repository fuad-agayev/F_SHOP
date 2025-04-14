<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useAuth } from '../composables/useAuth'
import { RouterLink } from 'vue-router'
import LoginModal from '../components/LoginModal.vue'

const route = useRoute()
const { cartItems, totalAmount, updateQuantity, removeFromCart, removeAllItems } = useCart()
const { isAuthenticated } = useAuth()

const showLoginModal = ref(false)

const handleCheckoutClick = (e: Event) => {
  if (!isAuthenticated.value) {
    e.preventDefault()
    showLoginModal.value = true
    // Store the intended destination
    localStorage.setItem('redirectAfterLogin', '/checkout')
  }
}

onMounted(() => {
  // Show login modal if redirected from checkout
  if (route.query.showLogin === 'true') {
    showLoginModal.value = true
  }
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200" data-aos="fade-down">Shopping Cart</h1>
    
    <div v-if="cartItems.length === 0" 
         class="text-center py-8" 
         data-aos="fade-up">
      <p class="text-gray-600 dark:text-gray-400">Your cart is empty</p>
      <RouterLink to="/" class="text-blue-600 hover:underline">Continue Shopping</RouterLink>
    </div>
    
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2" data-aos="fade-right">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Cart Items ({{ cartItems.length }})</h2>
          <button 
            @click="removeAllItems"
            class="text-red-600 hover:text-red-800 font-medium"
          >
            Remove All Items
          </button>
        </div>
        
        <div v-for="(item, index) in cartItems" 
             :key="item.id" 
             class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4"
             :data-aos="'fade-up'"
             :data-aos-delay="index * 100">
          <div class="flex items-center">
            <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded">
            <div class="ml-6 flex-grow">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ item.name }}</h3>
              <p class="text-gray-600 dark:text-gray-400">${{ item.price.toFixed(2) }}</p>
              
              <div class="flex items-center mt-4">
                <button @click="updateQuantity(item.id, item.quantity - 1)"
                        class="px-2 py-1 border rounded dark:border-gray-600 dark:text-gray-200">-</button>
                <span class="mx-4 text-gray-800 dark:text-gray-200">{{ item.quantity }}</span>
                <button @click="updateQuantity(item.id, item.quantity + 1)"
                        class="px-2 py-1 border rounded dark:border-gray-600 dark:text-gray-200">+</button>
                
                <button @click="removeFromCart(item.id)"
                        class="ml-6 text-red-600 hover:text-red-800">
                  Remove
                </button>
              </div>
            </div>
            <div class="text-right">
              <p class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-fit" 
           data-aos="fade-left"
           data-aos-delay="200">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Order Summary</h2>
        <div class="space-y-3">
          <div class="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Subtotal:</span>
            <span>${{ totalAmount.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div class="border-t dark:border-gray-700 pt-3">
            <div class="flex justify-between font-semibold text-lg text-gray-800 dark:text-gray-200">
              <span>Total:</span>
              <span>${{ totalAmount.toFixed(2) }}</span>
            </div>
          </div>
        </div>
        <RouterLink
          v-if="isAuthenticated"
          to="/checkout"
          class="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6"
        >
          Proceed to Checkout
        </RouterLink>
        <button
          v-else
          @click="handleCheckoutClick"
          class="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6"
        >
          Proceed to Checkout
        </button>
        <RouterLink to="/"
                   class="block w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-center py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors mt-3">
          Continue Shopping
        </RouterLink>
      </div>
    </div>

    <!-- Login Modal -->
    <LoginModal 
      :show="showLoginModal"
      @close="showLoginModal = false"
      @success="showLoginModal = false"
    />
  </div>
</template>