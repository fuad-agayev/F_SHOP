import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Cart from '../views/Cart.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useCart } from '../composables/useCart'

// Mock the router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: {} },
    { path: '/checkout', component: {} }
  ]
})

// Mock the useCart composable
vi.mock('../composables/useCart', () => ({
  useCart: () => ({
    cartItems: [],
    totalAmount: 0,
    totalItems: 0,
    hasItems: false,
    removeFromCart: vi.fn(),
    updateQuantity: vi.fn(),
    removeAllItems: vi.fn()
  })
}))

describe('Cart.vue', () => {
  it('shows empty cart message when cart is empty', () => {
    const wrapper = mount(Cart, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.text()).toContain('Your cart is empty')
    expect(wrapper.find('a').text()).toBe('Continue Shopping')
  })

  it('displays cart items when present', async () => {
    // Mock cart items
    vi.mocked(useCart).mockImplementation(() => ({
      cartItems: [
        {
          id: 1,
          name: 'Test Product',
          price: 99.99,
          quantity: 1,
          image: 'test.jpg'
        }
      ],
      totalAmount: 99.99,
      totalItems: 1,
      hasItems: true,
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      removeAllItems: vi.fn()
    }))

    const wrapper = mount(Cart, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('$99.99')
  })
})