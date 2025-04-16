<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute, RouterLink } from 'vue-router'
  import { useCart } from '../composables/useCart'
  import { useAuth } from '../composables/useAuth'
  import LoginModal from '../components/LoginModal.vue'


const route = useRoute()
const { } = useCart()
const { isAuthenticated } = useAuth()
const { cartItems, totalAmount, updateQuantity, removeFromCart, removeAllItems } = useCart()

const showLoginModal = ref(false)

const handleCheckoutClick = (e: Event) => {
    if(!isAuthenticated.value){
        e.preventDefault()
        showLoginModal.value = true
        // Store the intended destination
        localStorage.setItem('redirectAfterLogin', '/checkout')
    }
}

onMounted(() => {
  // show login modal if redirected from checkout
  if(route.query.showLoginModal === 'true'){
      showLoginModal.value = true
  }
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200" data-aos="fade-down"> Shopping Cart </h1>
    <div v-if="cartItems.length === 0" class="text-center py-8" data-aos="fade-up">
             <p class=""> Your cart is Empty </p>
             <RouterLink to="/" class="text-blue-600 hover:underline"> Continue Shopping </RouterLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div class="lg:col-span-2" data-aos="fade-right">
           <div class="flex justify-between items-center mb-4">
                  <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200"> Cart Items {{ cartItems.length }}</h2>
                  <button @click="removeAllItems" class="text-red-600 hover:text-red-800 font-medium">
                    Remove All Items 
                  </button>
           </div>

           

         </div>
    </div>
  <!--   Login Modal -->
     <LoginModal :show="showLoginModal" @close="showLoginModal = false" @success="showLoginModal = false"/>
  </div>
</template>

<style scoped>

</style>