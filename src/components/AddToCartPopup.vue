<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  show: boolean
  productName: string
}>()

const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(false)

watch(() => props.show, (newValue) => {
  if (newValue) {
    isVisible.value = true
    setTimeout(() => {
      isVisible.value = false
      emit('close')
    }, 2000) // Show for 2 seconds
  }
})
</script>

<template>
  <Transition name="toast">
    <div v-if="isVisible" 
         class="fixed top-16 right-4 z-[60] max-w-sm bg-green-500 text-white rounded-lg shadow-lg transform transition-all duration-300">
      <div class="flex items-center p-4">
        <!-- Success Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" 
             class="h-6 w-6 mr-2 flex-shrink-0" 
             fill="none" 
             viewBox="0 0 24 24" 
             stroke="currentColor">
          <path stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M5 13l4 4L19 7" />
        </svg>
        
        <!-- Message -->
        <p class="font-medium">{{ productName }} added to cart!</p>
      </div>

      <!-- Progress Bar -->
      <div class="h-1 w-full bg-white/20 rounded-b-lg overflow-hidden">
        <div class="h-full bg-white/40 progress-bar"></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.progress-bar {
  animation: progress 2s linear forwards;
}
</style>