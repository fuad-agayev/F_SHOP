<script setup lang="ts">
import { ref, onMounted} from 'vue'
import { ElCarousel, ElCarouselItem } from 'element-plus'
import 'element-plus/dist/index.css'

const isLoading = ref(true)
const selectedPost = ref<null | { id: number; title: string; content: string; fullContent: string; image: string; date: string; category: string }>(null);
const showModal = ref(false)

const blogPosts = ref([
  {
    id: 1,
    title: 'Latest Tech Trends 2025',
    content: 'Discover the most innovative technologies shaping our future. From AI-powered gadgets to sustainable tech solutions, we explore what\'s next in the world of technology.',
    fullContent: `
     Discover the most innovative technologies shaping our future. From AI-powered gadgets to sustainable tech solutions, we explore what's next in the world of technology.

      Artificial Intelligence and Machine Learning
      The field of AI continues to evolve at an unprecedented pace. We're seeing more sophisticated applications in everyday life, from improved voice assistants to AI-powered cameras that can capture the perfect shot every time.

      Sustainable Technology
      As environmental concerns take center stage, tech companies are focusing on creating more sustainable products. This includes using recycled materials, improving energy efficiency, and developing new ways to reduce electronic waste.

      5G and Connectivity
      The rollout of 5G networks is transforming how we connect and communicate. With faster speeds and lower latency, we're seeing new possibilities in remote work, gaming, and augmented reality experiences.

      Future Implications
      These advancements are just the beginning. As technology continues to evolve, we can expect even more exciting developments that will reshape how we live and work.
    `,
    image: '/images/texno-1.jpg',
    date: '2025-04-08',
    category: 'Technology'
  }, 
  {
    id: 2,
    title: 'Smart Home Essentials',
    content: 'Transform your home with these must-have smart devices. Learn how to create a connected living space that enhances comfort and efficiency.',
    fullContent: `
    Transform your home with these must-have smart devices. Learn how to create a connected living space that enhances comfort and efficiency.

      Smart Lighting Systems
      Modern smart lighting goes beyond simple on/off controls. With features like color changing, scheduling, and motion detection, you can create the perfect ambiance for any occasion while saving energy.

      Home Security
      From smart doorbells to comprehensive security systems, protecting your home has never been easier. Get real-time alerts, video monitoring, and remote access to your security features.

      Climate Control
      Smart thermostats learn your preferences and adjust automatically, ensuring comfort while minimizing energy usage. Some systems can even detect which rooms are occupied and adjust accordingly.

      Kitchen Innovations
      Smart appliances are revolutionizing how we cook and store food. Connected refrigerators can track groceries, while smart ovens can be controlled remotely and suggest recipes.
    `,
    image: '/images/home-ai.jpg',
    date: '2021-04-08',
    category: 'Smart Home'
  },
  {
    id: 3,
    title: 'Gaming Accessories Guide',
    content: 'Level up your gaming setup with these premium accessories. From high-performance keyboards to immersive audio solutions.',
    fullContent: `
      Level up your gaming setup with these premium accessories. From high-performance keyboards to immersive audio solutions.

      Mechanical Keyboards
      The heart of any gaming setup, mechanical keyboards offer precise control and satisfying feedback. We explore the best switches for different gaming styles and preferences.

      Gaming Mice
      From ultra-lightweight designs to models with numerous programmable buttons, find the perfect mouse for your gaming needs. Learn about DPI, polling rates, and sensor technology.

      Audio Equipment
      Immersive audio can make the difference between winning and losing. Discover the latest in gaming headsets, speakers, and audio processing technology.

      Streaming Gear
      For aspiring content creators, we break down the essential equipment needed to start streaming, from capture cards to microphones and lighting.
    `,
    image: '/images/com-sistem.webp',
    date: '2027-04-08',
    category: 'Gaming'
  },
  {
    id: 4,
    title: 'Audio Equipment Review',
    content: 'Our comprehensive review of the latest audio gear. Discover the perfect balance of sound quality and features for your needs.',
    fullContent: `
      Our comprehensive review of the latest audio gear. Discover the perfect balance of sound quality and features for your needs.

      Wireless Earbuds
      The latest wireless earbuds offer incredible sound quality in compact packages. We compare battery life, noise cancellation, and comfort across leading brands.

      Over-Ear Headphones
      For audiophiles seeking the ultimate listening experience, we examine premium over-ear headphones. Learn about driver technology, impedance, and frequency response.

      Portable Speakers
      Whether you're having a party or enjoying music in the park, portable speakers have come a long way. We look at waterproofing, battery life, and sound projection.

      Professional Audio
      For musicians and producers, we review studio monitors, microphones, and audio interfaces that deliver professional-grade performance.
    `,
    image: '/images/hoporler.jpg',
    date: '2028-04-08',
    category: 'Audio'
  }
])

// CarouselOptions tipini tanımla
interface CarouselOptions {
  autoplay: boolean;
  interval: number;
  type: string;
  height: string;
}

// carouselOptions nesnesinin tipini belirle
const carouselOptions:CarouselOptions = {
  autoplay: true,
  interval: 4000,
  type: 'card' ,
  height: '400px',
};



const openModal = (post:any) => {
    selectedPost.value = post
    showModal.value = true
}

const closeModal = () => {
  selectedPost.value = null
  showModal.value = false
}

onMounted(() => {
  setTimeout(() => {
     isLoading.value = false
  }, 4000)
})
</script>

<template>
  <!-- Loading Animation -->
  <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
    <div class="loading-dots">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  </div>

  <!--  Blog Content  -->
    <div v-else class="max-w-6xl mx-auto">
           <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200" data-aos="fade-down"> Our Blog </h1>
           <!--  Featured Post Carousel  -->
             <ElCarousel v-bind="carouselOptions" class="mb-12" data-aos="fade-up">
               <ElCarouselItem v-for="post in blogPosts" :key="post.id">
                   <div class="h-full relative rounded-lg overflow-hidden">
                        <img :src="post.image" :alt="post.title" class="w-full h-full object-cover"/>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
                              <span class="text-blue-400 text-sm font-medium mb-2"> {{ post.category }} </span>
                              <h2 class="text-2xl text-white font-bold mb-2"> {{ post.title }} </h2>
                              <p class="text-gray-200 line-clamp-2"> {{ post.content }} </p>
                              <span class="text-gray-300 text-sm mt-2"> {{ new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
                        </div>
                   </div>
               </ElCarouselItem>
             </ElCarousel>

             <!--   Blog Grid  -->
            <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-16 mt-64">
              <article v-for="(post, index) in blogPosts" :key="post.id"
              class="bg-white w-[350px] dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              :data-aos="'fade-up'" :data-aos-delay="index * 100">
              <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover">
             
              <div class="p-6">
                     <span class="text-blue-600 dark:text-blue-400 text-sm font-medium"> {{ post.category }} </span>
                     <h3 class="text-xl font-semibold mb-2 mt-1 text-gray-800 dark:text-gray-200"> {{ post.title }} </h3>
                     <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3"> {{ post.content }}</p>

                     <div class="flex items-center justify-center">
                      <span class="text-sm text-gray-500 dark:text-gray-500"> {{  new Date(post.date).toLocaleDateString() }}</span>
                      <button @click="openModal(post)" class="text-blue-600 dark:text-blue-400 hover:underline font-medium p-2"> Read More </button>
                     </div>
              </div>
            </article>
            </div>
            <!--   transition  blog post modal   -->
               <Transition name="modal">
                    <div v-if="showModal && selectedPost" class="fixed inset-0 z-50 overflow-y-auto" @close="closeModal">
                          <div class="flex items-center justify-center min-h-screen px-4">
                            <!--   Modal Backdrop  -->
                                <div class="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
                                <!--   Modal Content  -->
                                <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
                                     <!--   Close button  -->
                                        <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                          </svg>
                                        </button>
                                        <!--   Post Image  -->
                                           <img :src="selectedPost.image" :alt="selectedPost.title" class="w-full h-full object-cover">
                                           <!--   Post Content  -->
                                              <div class="p-8">
                                                   <span class="text-blue-600 dark:text-blue-400 text-sm font-medium"> {{ selectedPost.category }} </span>
                                                   <h2 class="text-3xl font-bold mt-2 mb-4 text-gray-900 dark:text-gray-100"> {{ selectedPost.title }} </h2>
                                                   <div class="mb-6 text-sm text-gray-500 dark:text-gray-400">
                                                        {{ new Date(selectedPost.date).toLocaleDateString('en-US', {
                                                          year: 'numeric',
                                                          month: 'long',
                                                          day: 'numeric'
                                                        })  }}
                                                   </div>
                                                   <div class="prose dark:prose-invert max-w-none">
                                                      <p v-for="(paragraph, index) in selectedPost.fullContent.split('\n\n')" :key="index" class="mb-4 text-gray-700 dark:text-gray-300"> 
                                                        {{ paragraph }}
                                                       </p>
                                                   </div>
                                              </div>
                                </div>
                          </div>
                    </div>
               </Transition>
    </div>
</template>
<style scoped>
.loading-dots {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-dots span {
  animation: loading 1.4s infinite ease-in-out;
  font-size: 100px;
  display: block;
  color: #000;
}

@keyframes loading {
  0%, 80%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

</style>