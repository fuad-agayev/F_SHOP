import { ref, computed } from 'vue'

const isAuthenticated = ref(false)
const currentUser = ref<any>(null)

export function useAuth() {
  const login = async(email: string, password: string) => {
   try{
    if(!email || !password){
      return false
    }
     
    await new Promise(resolve => setTimeout(resolve, 1000))

    isAuthenticated.value = true
    currentUser.value = {
      email,
      name: email.split('@')[0]
    }
    return true
   } catch(error){
       console.error('Login failed: ', error)
       return false
   }

  }
  const logout = () => {
    isAuthenticated.value = false
    currentUser.value = null
  }
  return {
    isAuthenticated: computed(()=> isAuthenticated.value),
    currentUser: computed(()=> currentUser.value),
    login,
    logout
  }
}