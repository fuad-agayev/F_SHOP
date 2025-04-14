<template>
  <div class="relative w-full h-full overflow-hidden rounded-lg ">
      <div class="relative h-full">
           <transition-group name="carousel">
               <div v-for="(slide, index) in slides" :key="slide.image" 
               class="absolute inset-0 transition-opacity duration-500"
               :class="{'oacity-100': index === currentIndex, 'opacity-0': index !== currentIndex}">
                 <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover"/>
                 <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                      <div class="absolute inset-0 flex items-center justify-start p-12">
                           <div class="max-w-xl">

                               <span class="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">{{ slide.category }}</span>

                              <!--   title and discount  -->
                               <div class="flex items-center gap-4 mb-2">
                                    <h2 class="text-5xl text-white font-bold">{{ slide.title }}</h2>
                                    <div class="bg-red-600 text-white rounded-lg text-2xl px-4 py-2 font-bold">{{ slide.discount }} % OFF</div>
                               </div>
                              <!--    description -->
                               <p class="text-xl text-white/90 mb-4">{{ slide.description }}</p>

                                <!--   Promotion box -->
                               <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6 inline-block">
                                    <div class="flex items-center gap-2 text-white">
                                         <span class="text-yellow-400 text-2xl">&#9733;</span>
                                         <p class="font-medium">{{ slide.promotion }}</p>
                                    </div>
                                    <p class="text-white/80 text-sm mt-1"> Ends: {{ slide.endDate }}</p>
                               </div>
                                   
                               <!--   CTA Button  Call to Action  (Harekete Geçirici Çağrı)  -->
                               <button @click="handleShopNow(slide.categoryId)" 
                                class="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105 active:scale-95">
                                     Shop Now
                               </button>

                      </div>
                 </div>
               </div>
           </transition-group>
      </div>
                        <!--    Navigarion button    -->
      <button @click="prevSlide" class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 text-white rounded-full hover:bg-black/70 transition-colors">
          <ChevronLeftIcon class="w-6 h-6"/>
      </button>

      <button @click="prevSlide" class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 text-white rounded-full hover:bg-black/70 transition-colors">
          <ChevronRightIcon class="w-6 h-6"/>
      </button>

      <!--   Indicators  -->
         <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
            <button v-for="(_, index) in slides" :key="index" @click="goToSlide(index)" 
            class="w-7 h-1 rounded-full transition-colors cursor-pointer"
            :class="index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'">

            </button>
         </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeftIcon , ChevronRightIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const slides = [
  {
   image: "/images/audio-head-1.webp",
   category: "Headphones & audio",
   categoryId: 102,
   title: "Summer Sale",
   discount: 50,
   description: "Get premium sounds quality with our top-rated headphones",
   promotion: "Free shipping on orders over $50",
   endDate: "June 30, 2025"
  },
  {
   image: "/images/casio-1.webp",
   category: "Smart Watches",
   categoryId: 4,
   title: "Flash Deal",
   discount: 25,
   description: "Tracks your fitness and health with our smartphones",
   promotion: "Buy one get one $50 off",
   endDate: "Limited time offer"
  },
  {
   image: "/images/speakers-1.jpg",
   category: "Speakers",
   categoryId: 10202,
   title: "Clearance Sale",
   discount: 50,
   description: "Upgrade your sound system with our best speakers",
   promotion: "Extra 10% off on clearance with code SUMMER",
   endDate: "While stocks last"
  },
  {
   image: "/images/mouse-1.webp",
   category: "Gaming Accessories",
   categoryId: 302,
   title: "Gaming Week",
   discount: 20,
   description: "Level up your gaming setup",
   promotion: "Free gaming mouse with any purchase",
   endDate: "This weekend only"
  },
  {
   image: "/images/blacbery-1.jpg",
   category: "Mobile Phones",
   categoryId: 301,
   title: "New Arrivals",
   discount: 15,
   description: "latest smartphones and accessories",
   promotion: "Free screen protector and case",
   endDate: "First 100 customers only"
  },

]

const currentIndex = ref(0)
let intervalId: number | null = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const handleShopNow = (categoryId: number) => {
  router.push(`/category/${categoryId}`)
}

onMounted(() => {
  intervalId = window.setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  if(intervalId !== null){
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 0.5s ease;
}
.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
}
</style>