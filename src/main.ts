import './base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import AOS from 'aos'
import 'aos/dist/aos.css'


// Initialize AOS
AOS.init({
  duration: 1000,
  easing: 'ease-out-cubic',
  once: true,
  offset: 50
})

// Update AOS on route change
router.afterEach(() => {
  setTimeout(() => {
    AOS.refresh()
  }, 100)
})
 
createApp(App).use(router).use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 1,
  newestOnTop: true,
  position: "top-right",
  timeout: 1000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: false,
  icon: true,
  rtl: false
}).mount('#app')
