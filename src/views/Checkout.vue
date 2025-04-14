<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '../composables/useCart'

const { cartItems, totalAmount } = useCart()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  zipCode: '',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
})

const submitOrder = () => {
  // Handle order submission
  console.log('Order submitted:', { form: form.value, items: cartItems.value })
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-6">Shipping Information</h2>
      
      <form @submit.prevent="submitOrder" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input v-model="form.firstName" type="text" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input v-model="form.lastName" type="text" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="form.email" type="email" required
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Address</label>
          <input v-model="form.address" type="text" required
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">City</label>
            <input v-model="form.city" type="text" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">ZIP Code</label>
            <input v-model="form.zipCode" type="text" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
        </div>
        
        <h2 class="text-2xl font-semibold mb-4 pt-4">Payment Information</h2>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Card Number</label>
          <input v-model="form.cardNumber" type="text" required
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input v-model="form.expiryDate" type="text" placeholder="MM/YY" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">CVV</label>
            <input v-model="form.cvv" type="text" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
        </div>
        
        <button type="submit"
                class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Place Order
        </button>
      </form>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 h-fit">
      <h2 class="text-2xl font-semibold mb-6">Order Summary</h2>
      
      <div class="space-y-4">
        <div v-for="item in cartItems" :key="item.id" class="flex justify-between">
          <span>{{ item.name }} (x{{ item.quantity }})</span>
          <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
        
        <div class="border-t pt-4 mt-4">
          <div class="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${{ totalAmount.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>