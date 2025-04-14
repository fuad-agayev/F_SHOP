<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
    <Navbar/>
    <main class="container mx-auto px-4 py-8 flex-grow">
      <RouterView v-slot="{Component}">
              <transition name="page" mode="out-in">
                <component :is="Component"/>
              </transition>
      </RouterView>
    </main>
    <FooterView />
    <AddToCartPopup :show="showPopup" :product-name="addedProductName" @click="closePopup"/>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { watch } from 'vue'
import Navbar from './components/Navbar.vue';
import FooterView from './components/FooterView.vue'
import AddToCartPopup from './components/AddToCartPopup.vue'
import { useCart } from './composables/useCart'
import { useDarkMode } from './composables/useDarkMode'

const { isDark } = useDarkMode() 
const { showPopup, addedProductName, closePopup} = useCart()

watch(isDark, (newValue) => {
if(newValue){
    document.documentElement.classList.add('dark')
}
else{
  document.documentElement.classList.remove('dark')
}
} , {immediate: true})
 
</script>

<style scoped>

/*   Page transition animation*/ 
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px)
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px)
} 

/*     AOS  custom animations   */
[data-aos="fade-up-custom"]{
  transform: translate3d(0, 30px, 0);
  opacity: 0;
  transition-property: transform, opacity;
}

[data-aos="fade-up-custom"].aos-animate{
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
</style>


















