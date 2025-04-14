<script setup lang="ts">
   import {ref, computed, onMounted} from 'vue'
   import { Splide, SplideSlide} from '@splidejs/vue-splide'
   import '@splidejs/splide/dist/css/splide.min.css'

   const products = [
   {
    id: 1,
    name: 'Premium Headphones',
    description: 'Experience crystal clear sound with our premium headphones. Featuring advanced noise cancellation and superior comfort for extended listening sessions.',
    image: '/images/sony-head.jpg'
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Stay connected and track your fitness with our latest smartwatch. Packed with features to help you maintain a healthy lifestyle.',
    image: '/images/mi-smart-watch.png'
  },
  {
    id: 3,
    name: 'Wireless Speaker',
    description: 'Fill your room with immersive sound from our wireless speakers. Perfect for parties or relaxing at home.',
    image: '/images/wireles-1.webp'
  },
  {
    id: 4,
    name: 'Gaming Console',
    description: 'Take your gaming experience to the next level with our powerful gaming console. Featuring stunning graphics and fast performance.',
    image: '/images/console-game.webp'
  }
   ]

   const splideOptions = {
    type: 'loop',
    perPage: 1,
    autoplay: true,
    interval: 3000,
    arrows: true,
    pagination: true,
    gap: '1rem',
    breakpoints: {
      640: {
        perPage: 1
      }
    }
   }

   const features = [
  {
    title: 'Quality Products',
    description: 'We carefully select each product to ensure the highest quality standards.',
    icon: '🌟'
  },
  {
    title: 'Expert Support',
    description: 'Our team of experts is always ready to help you make the right choice.',
    icon: '💬'
  },
  {
    title: 'Fast Shipping',
    description: 'Quick and reliable shipping to get your products to you as soon as possible.',
    icon: '🚚'
  },
  {
    title: 'Secure Payments',
    description: 'Your transactions are protected with industry-leading security measures.',
    icon: '🔒'
  }
]

const stats = [
  { value: '10K+', label: 'Happy Customers', countTo: 10000 },
  { value: '5K+', label: 'Products', countTo: 5000 },
  { value: '24/7', label: 'Support' },
  { value: '99%', label: 'Satisfaction Rate' }
]

const counters = ref(stats.map(stat => ({
  current: 1,
  target: stat.countTo || 0,
  isNumeric: Boolean(stat.countTo),
  isAnimating: false
})))

const formatValue = (index: number) => {
  const stat = stats[index]
  if (!stat.countTo) return stat.value
  
  const value = Math.floor(counters.value[index].current)
  return value >= 1000 ? `${Math.floor(value / 1000)}K+` : value.toString()
}

const startCountingForIndex = (index: number) => {
  const counter = counters.value[index]
  if (!counter.isNumeric || counter.isAnimating) return

  counter.isAnimating = true
  counter.current = 1 // Start from 1

  const increment = Math.ceil(counter.target / 100) // Divide animation into 100 steps
  const duration = 3000 // 3 seconds total duration
  const interval = duration / (counter.target / increment)

  const timer = setInterval(() => {
    if (counter.current >= counter.target) {
      counter.current = counter.target
      counter.isAnimating = false
      clearInterval(timer)
      return
    }
    counter.current = Math.min(counter.current + increment, counter.target)
  }, interval)
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        // Start counting for each numeric stat
        counters.value.forEach((_, index) => {
          startCountingForIndex(index)
        })

        observer.disconnect()
      }

    })
    
  }, {
    threshold: 0.5 // Start animation when 50% of the element is visible
  })

  const statsElement = document.querySelector('.stats-section')
  if (statsElement) {
    observer.observe(statsElement)
  }
})
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <!-- Hero Section -->
    <div class="text-center mb-16" data-aos="fade-down">
      <h1 class="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">About Us</h1>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        We're dedicated to bringing you the best in technology and electronics. 
        Our carefully curated selection ensures quality and innovation in every product.
      </p>
    </div>

    <!-- Featured Products Carousel -->
    <Splide :options="splideOptions" class="mb-16" data-aos="fade-up">
      <SplideSlide v-for="product in products" :key="product.id">
        <div class="relative h-[500px] rounded-lg overflow-hidden">
          <img 
            :src="product.image" 
            :alt="product.name"
            class="w-full h-full object-cover"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
            <h2 class="text-2xl font-bold text-white mb-2">{{ product.name }}</h2>
            <p class="text-gray-200">{{ product.description }}</p>
          </div>
        </div>
      </SplideSlide>
    </Splide>

    <!-- Stats Section -->
    <div class="stats-section grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 mb-16" data-aos="fade-up" data-aos-delay="200">
      <div v-for="(stat, index) in stats" 
           :key="stat.label" 
           class="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2 tabular-nums">
          {{ formatValue(index) }}
        </div>
        <div class="text-gray-600 dark:text-gray-400">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16" data-aos="fade-up" data-aos-delay="300">
      <div v-for="feature in features" 
           :key="feature.title"
           class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <div class="text-4xl mb-4">{{ feature.icon }}</div>
        <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
          {{ feature.title }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          {{ feature.description }}
        </p>
      </div>
    </div>

    <!-- Mission & Vision -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16" data-aos="fade-up" data-aos-delay="400">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Our Mission</h2>
        <p class="text-gray-600 dark:text-gray-400">
          To provide our customers with the latest and most innovative technology products 
          while ensuring exceptional service and support. We believe in making technology 
          accessible and enjoyable for everyone.
        </p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Our Vision</h2>
        <p class="text-gray-600 dark:text-gray-400">
          To become the leading destination for technology enthusiasts and everyday consumers 
          alike, offering a carefully curated selection of products that enhance and simplify life.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>