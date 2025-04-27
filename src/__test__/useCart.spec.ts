import { describe, it, expect, beforeEach } from 'vitest'
import { useCart } from '../composables/useCart'

describe('useCart', () => {
  beforeEach(() => {
    // Reset the cart before each test
    const { removeAllItems } = useCart()
    removeAllItems()
  })

  it('starts with an empty cart', () => {
    const { cartItems, totalItems, totalAmount } = useCart()
    
    expect(cartItems.value).toHaveLength(0)
    expect(totalItems.value).toBe(0)
    expect(totalAmount.value).toBe(0)
  })

  it('can add items to cart', () => {
    const { addToCart, cartItems, totalItems, totalAmount } = useCart()
    
    const product = {
      id: 1,
      name: 'Test Product',
      price: 99.99,
      image: 'test.jpg'
    }

    addToCart(product)

    expect(cartItems.value).toHaveLength(1)
    expect(totalItems.value).toBe(1)
    expect(totalAmount.value).toBe(99.99)
    expect(cartItems.value[0].name).toBe('Test Product')
  })

  it('increases quantity for existing items', () => {
    const { addToCart, cartItems, totalItems } = useCart()
    
    const product = {
      id: 1,
      name: 'Test Product',
      price: 99.99,
      image: 'test.jpg'
    }

    addToCart(product)
    addToCart(product)

    expect(cartItems.value).toHaveLength(1)
    expect(totalItems.value).toBe(2)
    expect(cartItems.value[0].quantity).toBe(2)
  })

  it('can remove items from cart', () => {
    const { addToCart, removeFromCart, cartItems } = useCart()
    
    const product = {
      id: 1,
      name: 'Test Product',
      price: 99.99,
      image: 'test.jpg'
    }

    addToCart(product)
    expect(cartItems.value).toHaveLength(1)

    removeFromCart(1)
    expect(cartItems.value).toHaveLength(0)
  })
})