<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { 
  Bars3Icon, 
  ChevronDownIcon, 
  ChevronRightIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon
} from '@heroicons/vue/24/outline'
import { useProducts } from '../composables/useProducts'
import { useAuth } from '../composables/useAuth'
import { useCart } from '../composables/useCart'
import { useDarkMode } from '../composables/useDarkMode'
import { useSearch } from '../composables/useSearch'
import LoginModal from './LoginModal.vue'

const route = useRoute()
const router = useRouter()
const { categories, allProducts } = useProducts()
const { isAuthenticated, currentUser, logout } = useAuth()
const { totalItems } = useCart()
const { isDark, toggleDarkMode, setDarkMode } = useDarkMode()
const { searchQuery, setSearchQuery } = useSearch()

const showCategoriesMenu = ref(false)
const showLoginModal = ref(false)
const isScrolled = ref(false)
const searchInput = ref('')
const showSearchResults = ref(false)
const showDarkModeMenu = ref(false)
const showMobileMenu = ref(false)

// Mobile category navigation state
const mobileSelectedCategory = ref<any>(null)
const mobileSelectedSubcategory = ref<any>(null)
const mobileSelectedNestedSubcategory = ref<any>(null)

// Category hover states
const hoveredCategory = ref(null)
const hoveredSubcategory = ref(null)
const hoveredNestedSubcategory = ref(null)

// Search results
const searchResults = computed(() => {
  if (!searchInput.value.trim()) return []
  const query = searchInput.value.toLowerCase()
  return allProducts.value
    .filter(product => product.name.toLowerCase().includes(query))
    .slice(0, 5) // Limit to 5 results
})

// Handle search
const handleSearch = (e: Event) => {
  e.preventDefault()
  if (searchInput.value.trim()) {
    setSearchQuery(searchInput.value)
    router.push(`/search?q=${encodeURIComponent(searchInput.value)}`)
    searchInput.value = ''
    showSearchResults.value = false
    showMobileMenu.value = false // Close mobile menu after search
  }
}

// Helper functions for checking subcategories
const hasSubcategories = (category: any) => {
  return category.subcategories && category.subcategories.length > 0
}

const hasNestedSubcategories = (subcategory: any) => {
  return subcategory.nested_subcategories && subcategory.nested_subcategories.length > 0
}

const hasDeepSubcategories = (nested: any) => {
  return nested.deep_subcategories && nested.deep_subcategories.length > 0
}

// Close menu function
const closeMenu = () => {
  showCategoriesMenu.value = false
  hoveredCategory.value = null
  hoveredSubcategory.value = null
  hoveredNestedSubcategory.value = null
}

// Toggle categories menu
const toggleCategoriesMenu = (event: Event) => {
  event.stopPropagation()
  showCategoriesMenu.value = !showCategoriesMenu.value
}

// Mobile navigation functions
const selectMobileCategory = (category: any) => {
  mobileSelectedCategory.value = category
  mobileSelectedSubcategory.value = null
  mobileSelectedNestedSubcategory.value = null
}

const selectMobileSubcategory = (subcategory: any) => {
  mobileSelectedSubcategory.value = subcategory
  mobileSelectedNestedSubcategory.value = null
}

const selectMobileNestedSubcategory = (nestedSubcategory: any) => {
  mobileSelectedNestedSubcategory.value = nestedSubcategory
}

const goBackMobileCategories = () => {
  if (mobileSelectedNestedSubcategory.value) {
    mobileSelectedNestedSubcategory.value = null
  } else if (mobileSelectedSubcategory.value) {
    mobileSelectedSubcategory.value = null
  } else if (mobileSelectedCategory.value) {
    mobileSelectedCategory.value = null
  }
}

// Handle scroll
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

// Click outside handlers
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.categories-button') && !target.closest('.categories-menu')) {
    closeMenu()
  }
  if (!target.closest('.search-container')) {
    showSearchResults.value = false
  }
  if (!target.closest('.dark-mode-container')) {
    showDarkModeMenu.value = false
  }
}

// Watch search input
watch(searchInput, (newValue) => {
  showSearchResults.value = Boolean(newValue.trim())
})

// Watch route changes
watch(route, () => {
  showMobileMenu.value = false
  showSearchResults.value = false
  mobileSelectedCategory.value = null
  mobileSelectedSubcategory.value = null
  mobileSelectedNestedSubcategory.value = null
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>



<template>

  <nav class="fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300" :class="{'bg-white/90 backdrop-blur-lg shadow-lg dark:bg-gray-800': isScrolled,
             'bg-white dark:bg-gray-800': isScrolled }">
             <div class="container mx-auto px-4">
              <div class="flex items-center justify-center h-16">
                 <div class="flex items-center space-x-4">
                    <button @click="showMobileMenu = !showMobileMenu" class="md:hidden text-gray-600 dark:text-gray-300">
                          <Bars3Icon class="w-6 h-6"/>
                    </button>
                    <RouterLink to="/" class="text-xl font-bold text-gray-800 dark:text-white">FSHOP</RouterLink>
                    <!--  categories Dropdown -->
                      <div class="relative hidden md:block">
                       <button @click="toggleCategoriesMenu" class="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white categories-button">
                         <Bars3Icon class="w-6 h-6"/>
                         <span>Categories</span>
                         <ChevronDownIcon class="w-6 h-6 text-black/40" :class="{'transform rotate-180': showCategoriesMenu}"/>
                       </button>
                       <!--  Categories Menu -->
                       <div v-if="showCategoriesMenu" class="absolute left-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 categories-menu" @click.stop>
                        <!--  Desktop View -->
                        <div class="grid grid-cols-4 divide-x dark:divide-gray-700">
                          <!--   main Categories -->
                          <div class="p-4">
                            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Categories</h3>
                            <div class="space-y-2">
                              <div v-for="category in categories" :key="category.id" @mouseenter="hoveredCategory = category" 
                                    class="cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" 
                                    :class="{'bg-gray-100 dark:bg-gray-700': hoveredCategory?.id === category.id}">
                                <div class="flex items-center justify-center">
                                  <RouterLink :to="`/category/${category.id}`" class="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400" @click="closeMenu">
                                        {{ category.name }}
                                    </RouterLink>
                                    <ChevronRightIcon v-if="hasSubcategories(category)" class="w-4 h-4 text-gray-400" :class="{'text-blue-500': hoveredCategory?.id === category.id}"/>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!--  Subcategories -->

                            <div class="p-4">
                              <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Subcategories</h3>
                              <div v-if="hoveredCategory?.subcategories" class="space-y-2">
                                   <div v-for="subcategory in hoveredCategory.subcategories" :key="subcategory.id" @mouseenter="hoveredSubcategory = category" 
                                   class="cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                   :class="{'bg-gray-100 dark:bg-gray-700': hoveredSubcategory?.id === subcategory.id}">
                               <div class="flex items-center justify-center">
                                <RouterLink :to="`/category/${subcategory.id}`" @click="closeMenu" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                                  {{ subcategory.name }}
                                  </RouterLink>
                                  <ChevronRightIcon v-if="hasNestedSubcategories(subcategory)" class="w-4 h-4 text-gray-400"
                                   :class="{'text-blue-500': hoveredSubcategory?.id === subcategory.id}"/>
                                     </div>
                                    </div>
                                </div>
                              </div>
                              <!--   nested subcategories  -->
                              <div class="p-4">
                                <h3 class="text-gray-900 dark:text-gray-100 mb-4">More categories</h3>
                                 <div v-if="hoveredSubcategory?.nested_subcategories" class="space-x-2">
                                    <div v-for="nested in hoveredSubcategory.nested_subcategories" :key="nested.id" @mouseenter="hoveredNestedSubcategory = nested" 
                                               class="cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                                :class="{'bg-gray-100 dark:bg-gray-700': hoveredNestedSubcategory?.id === nested.id}">
                                          <div class="flex items-center justify-center">
                                            <RouterLink :to="`/category/${nested.id}`" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                             @click="closeMenu">

                                              {{ nested.name }}
                                              </RouterLink>
                                              <ChevronRightIcon v-if="hasDeepSubcategories(nested)" class="w-4 h-4 text-gray-400" 
                                              :class="{'text-blue-500': hoveredNestedSubcategories?.id === nested.id}"/>
                                            </div>
                                      </div>
                                  </div>
                                </div>
                                <!--   Deep subcategory  -->
                                <div class="p-4">
                                  <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Specialized categories</h3>
                                  <div v-if="hoveredNestedSubcategory?.deep_subcategories" class="space-y-2">
                                    <div v-for="deep in hoveredNestedSubcategory.nested_subcategories" :key="deep.id"
                                     class="cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                     <RouterLink :to="`/category/${deep.id}`" class="text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400" @click="closeMenu">
                                      {{ deep.name }}
                                      </RouterLink>
                                      </div>
                                    </div>
                                  </div>
                          </div>
                        </div>
                      </div>
                      <!--  Desktop Navigation Links -->
                      <div class="hidden md:flex items-center space-x-4">
                        <RouterLink to="/blog" class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                        :class="{ 'text-blue-600 dark:text-blue-400': $route.path === '/blog' }">
                          Blog
                          </RouterLink>
                          <RouterLink to="/about" class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                        :class="{ 'text-blue-600 dark:text-blue-400': $route.path === '/about' }">
                          About
                          </RouterLink>
                        </div>
                 </div>
                 <!--   Search Bar  -->
                 <div class="flex-1 max-w-3xl mx-4 hidden md:block">
                  <form @submit="handleSearch" class="relative search-container">
                    <input v-model="searchInput" type="text" placeholder="Search products..." 
                    class="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    <button type="submit" class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      <MagnifyingGlassIcon class="w-5 h-5"/>
                      </button>
                      <!--   Search Results Dropdown  -->
                      <div v-if="showSearchResults && searchResults.length > 0"
                         class="absolute top-full right-0 left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                         <div class="max-h-96 overflow-y-auto">
                          <RouterLink v-for="product in searchResults" :key="product.id" :to="`/category/${product.id}`" 
                                   class="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700" @click="showSearchResults">
                                   <img :src="product.image" :alt="product.name" class="w-12 h-12 object-cover rounded-lg"/>
                                   <div class="ml-3">
                                      <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ product.name }}</p>
                                      <p class="text-sm text-gray-500 dark:text-gray-400">{{ product.price.toFixed(2) }}</p>
                                    </div>
                            </RouterLink>
                          </div>
                        </div>
                    </form>
                  </div>
                  <!--    Right Side   -->
                  <div class="flex items-center space-x-4">
                    <!--  Dark Mode Toggle  -->
                    <div class="relative dark-mode-container">
                      <button @click="showDarkModeMenu = !showDarkModeMenu" class="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                        <SunIcon v-if="isDark" class="w-5 h-5"/>
                        <MoonIcon v-else class="w-5 h-5"/>
                        </button>
                        <!--  Dark Mode Menu  -->
                        <div v-if="showDarkModeMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 overflow-hidden">
                          <div class="p-2">
                            <button @click="setDarkMode(false); showDarkModeMenu = false"
                             class="flex items-center w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                             :class="{'bg-gray-100 dark:bg-gray-700': !isDark}">
                              <SunIcon class="w-5 h-5 mr-3 text-yellow-500" />
                              <span class="text-gray-900 dark:text-gray-100">Light</span>
                              </button>
                              <button @click="setDarkMode(true); showDarkModeMenu = false"
                             class="flex items-center w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                             :class="{'bg-gray-100 dark:bg-gray-700': isDark}">
                              <MoonIcon class="w-5 h-5 mr-3 text-blue-500" />
                              <span class="text-gray-900 dark:text-gray-100">Dark</span>
                              </button>
                              <button @click="setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches); showDarkModeMenu = false"
                               class="flex items-center w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <ComputerDesktopIcon class="w-5 h-5 mr-3 text-gray-500" />
                                <span class="text-gray-900 dark:text-gray-100">System</span>
                                </button>
                            </div>
                          </div>
                      </div>
                      <!--    Shopping Cart  -->
                      <RouterLink to="/cart" class="relative p-2 text-gray-600 dark:gray-300 hover:text-gray-800 dark:hover:text-white">
                        <ShoppingCartIcon class="w-6 h-6"/>
                        <span v-if="totalItems > 0" class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{{ totalItems }}</span>
                        </RouterLink>
                        <!--   User Menu  -->
                        <div v-if="isAuthenticated" class="relative">
                          <button class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">{{ currentUser?.name }}</button>
                          <button @click="logout" class="ml-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Logout</button>
                          </div>
                          <button v-else @click="showLoginModal = true" class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Login</button>
                    </div>
              </div>
              <!--   Mobile Menu  -->
                <div v-if="showMobileMenu" class="md:hidden">
                  <div class="px-2 pt-2 pb-3 space-y-1">
                    <!--   Mobile Search  -->
                    <form @submit="handleSearch" class="mb-4">
                      <div class="relative">
                             <input v-model="searchInput" type="text" placeholder="Search products..."
                             class="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                             <button type="submit" class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"> <MagnifyingGlassIcon class="w-5 h-5"/></button>
                        </div>
                        <!--   Mobile Search Results -->
                        <div v-if="showSearchResults && searchResults.length > 0" class="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                          <div class="max-h-96 overflow-y-auto">
                            <RouterLink v-for="product in searchResults" :key="product.id" :to="`/product/${product.id}`"
                             class="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                              @click="showSearchResults = false; showMobileMenu = false">
                                 <img :src="product.image" :alt="product.name" class="w-12 h-12 object-cover rounded"/>
                                 <div class="ml-3">
                                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ product.name }}</p>
                                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ product.price.toFixed(2) }}</p>
                                  </div>
                              </RouterLink>
                            </div>
                          </div>
                      </form>
                      <!--   Mobile Categories  -->
                      <div class="mb-4">
                        <!--   Back Button  -->
                        <button v-if="mobileSelectedCategory || mobileSelectedSubcategory || mobileSelectedNestedSubcategory"
                         class="flex items-center text-gray-600 dark:text-gray-300 mb-4" @click="goBackMobileCategories">
                         <ChevronDownIcon class="w-5 h-5 mr-1 transform rotate-90"/>
                         <span>Back</span>
                          </button>
                          <!--   Main Categories  -->
                          <div v-if="!mobileSelectedCategory" class="space-y-2">
                            <div v-for="category in categories" :key="category.id" class="rounded-lg overflow-hidden">
                              <div class="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                                    @click="hasSubcategories(category) ? selectMobileCategory(category) : null">
                                    <RouterLink :to="`/category/${category.id}`" class="flex-grow text-gray-800 dark:text-gray-200" @click="showMobileMenu = false">
                                      {{ category.name }}
                                      </RouterLink>
                                      <ChevronRightIcon v-if="hasSubcategories(category)" class="w-5 h-5 text-gray-400"/>
                                </div>
                              </div>
                            </div>
                            <!--   Subcategories  -->
                            <div v-else-if="!mobileSelectedSubcategory" class="space-y-2">
                              <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-4">{{ mobileSelectedCategory.name }}</h3>
                              <div v-for="subcategory in mobileSelectedCategory.subcategories" :key="subcategory.id" class="rounded-lg overflow-hidden">
                                <div class="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                                      @click="hasNestedSubcategories(subcategory) ? selectMobileSubcategories(subcategory) : null">
                                      <RouterLink :to="`/category/${subcategory.id }`" class="flex-grow text-gray-800 dark:text-gray-200" @click="showMobileMenu = false">
                                        {{ subcategory.name }}
                                        </RouterLink>
                                        <ChevronRightIcon v-if="hasNestedSubcategories(subcategory)" class="w-5 h-5 text-gray-500"/>
                                  </div>
                                </div>
                              </div>
                              <!--    Nested subcategories  -->
                              <div v-else-if="!mobileSelectedNestedSubcategory" class="space-y-2">
                                  <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-4">{{ mobileSelectedSubcategory.name }}</h3>
                                  <div v-for="nested in mobileSelectedSubcategory.nested_subcategories" :key="nested.id" cass="rounded-lg overflow-hidden">
                                    <div class="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                                          @click="hasDeepSubcategories(nested) ? selectMobileNestedSubcategory(nested) : null">
                                            <RouterLink class="flex-grow text-gray-800 dark:text-gray-200" @click="showMobilemenu = false">
                                              {{ nested.name }}
                                              </RouterLink>
                                              <ChevronRightIcon v-if="hasDeepSubcategories(nested)" class="w-5 h-5 text-gray-400"/>
                                      </div>
                                    </div>
                                </div>
                                <!--   Deep Subcategories  -->
                                <div v-else class="space-y-2">
                                       <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-4">{{ mobileSelectedDeepSubcategory.name }}</h3>
                                       <div v-for="deep in mobileSelectedNestedSubcategory.deep_subcategories" :key="deep.id" class="rounded-lg overflow-hidden">
                                        <Routerlink :to="`/category/${deep.id}`" class="block p-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200" 
                                        @click="showMobileMenu = false">
                                        {{ deep.name }}
                                          </Routerlink>
                                        </div>
                                  </div>
                               </div>
                           <!--    Mobile Navigation Links -->
                           <RouterLink to="/blog" 
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                           :class="{'bg-gray-50 dark:bg-gray-700': $route.path === '/blog'}">
                             Blog 
                           </RouterLink>
                           <RouterLink to="/about" 
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                           :class="{'bg-gray-50 dark:bg-gray-700': $route.path === '/about'}">
                             About 
                           </RouterLink>
                    </div>
                  </div>
             </div>
             <!--   Login Modal  -->
               <LoginModal :show="showLoginModal" @click="showLoginModal = false" @success="showLoginModal = false"/>
  
  </nav>
          <!--    Spacer o prevent content from going under fixed navbar -->
          <div class="h-16"></div>
</template>

<style scoped>
.categories-menu {
  min-width: 800px;
}
@media (max-width: 768px){
  .categories-menu {
       position: fixed;
       inset: auto 0 0 0;
       min-width: 100%;
       max-height: 80vh;
       overflow-y: auto;
       border-radius: 1rem 1rem 0 0;
  }
}
</style>
