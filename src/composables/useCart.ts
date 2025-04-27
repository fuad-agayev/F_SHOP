import { ref, computed } from 'vue'
import { POSITION, useToast } from 'vue-toastification'

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

// Create a reactive cart store
const cartItems = ref<CartItem[]>([])
const showPopup = ref(false)
const addedProductName = ref('')
const toast = useToast()

export function useCart() {
  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalAmount = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const hasItems = computed(() => cartItems.value.length > 0)

  const addToCart = (product: any) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      })
    }

    // Show popup notification
    addedProductName.value = product.name
    showPopup.value = true
  }

  const removeFromCart = (productId: number) => {
    const index = cartItems.value.findIndex(item => item.id === productId)
    if (index > -1) {
      const removedItem = cartItems.value[index]
      cartItems.value.splice(index, 1)
      
      // Show toast notification for removal
      toast.error(`${removedItem.name} removed from cart!`, {
        timeout: 2000,
        position: POSITION.TOP_RIGHT,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: false,
        icon: true
      })
    }
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const item = cartItems.value.find(item => item.id === productId)
    if (item) {
      if (quantity < 1) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        toast.info(`${item.name} quantity updated!`, {
          timeout: 2000,
          position: POSITION.TOP_RIGHT,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: false,
          icon: true
        })
      }
    }
  }

  const removeAllItems = () => {
    cartItems.value = []
    toast.error('All items removed from cart!', {
      timeout: 2000,
      position: POSITION.TOP_RIGHT,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: false,
      icon: true
    })
  }

  const closePopup = () => {
    showPopup.value = false
  }

  return {
    cartItems,
    totalItems,
    totalAmount,
    hasItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    removeAllItems,
    showPopup,
    addedProductName,
    closePopup
  }
}

