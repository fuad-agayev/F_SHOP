import { createRouter, createWebHistory } from 'vue-router';

import { useCart} from '../composables/useCart'
import { useAuth } from '../composables/useAuth'
import Home from '@/views/Home.vue';
import Category from '../views/Category.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Checkout from '@/views/Checkout.vue'
import Search from '@/views/Search.vue'
import About from '@/views/About.vue'
import Blog from '@/views/Blog.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/category/:id',
      name: 'category',
      component: Category
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductDetail
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      beforeEnter: (to, from , next) => {
        const { isAuthenticated } = useAuth()
        const { hasItems } = useCart()
          if(!hasItems.value){
             next({ name: 'cart'})
          }else if(!isAuthenticated.value){
            localStorage.setItem('redirectAfterLogin', to.fullPath)
            next({ name: 'cart', query: { showLogin: 'true'}})
          }else{
            next()
          }
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
    
   
  ]
})

export default router