<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  close: []
  success: []
}>()

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  
  if (!email.value || !password.value) {
    error.value = 'Fill out this fields'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const success = await login(email.value, password.value)
    if (success) {
      emit('success')
      handleClose()
      
      // Get redirect path and clear it
      const redirectPath = localStorage.getItem('redirectAfterLogin')
      localStorage.removeItem('redirectAfterLogin')
      
      // Redirect to checkout or stored path
      router.push(redirectPath || '/checkout')
    } else {
      error.value = 'Invalid credentials'
    }
  } catch (err) {
    error.value = 'An error occurred during login'
  } finally {
    loading.value = false
  }
}

const handleClose = () => {
  email.value = ''
  password.value = ''
  error.value = ''
  emit('close')
}

// Clear error when modal is opened
watch(() => props.show, (newValue) => {
  if (newValue) {
    error.value = ''
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    // Scroll to top when modal opens
    window.scrollTo(0, 0)
  } else {
    // Restore body scroll when modal is closed
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Transition name="modal">
    <div v-if="show" 
         class="fixed inset-0 z-[99999]" 
         role="dialog"
         @click="handleClose">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      <!-- Modal Container -->
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-screen items-center justify-center p-4">
          <!-- Modal Content -->
          <div class="relative w-full max-w-md rounded-lg bg-white dark:bg-gray-800 p-8 shadow-xl transform transition-all" @click.stop>
            <!-- Close button -->
            <button @click="handleClose" class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <!-- Title -->
            <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Login to Continue</h2>

            <!-- Error Message -->
            <div v-if="error" class="mb-4 p-4 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {{ error }}
            </div>

            <!-- Form -->
            <form @submit="handleSubmit" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  :disabled="loading"
                  class="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100
                   placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  required
                  :disabled="loading"
                  class="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ loading ? 'Signing in...' : 'Sign in' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .transform,
.modal-leave-active .transform {
  transition: transform 0.3s ease;
}

.modal-enter-from .transform,
.modal-leave-to .transform {
  transform: scale(0.95);
}
</style>