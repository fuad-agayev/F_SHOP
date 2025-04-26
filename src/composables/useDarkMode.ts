import { useStorage } from '@vueuse/core'
import { onMounted } from 'vue'
const isDark = useStorage('dark-mode', false)

export function useDarkMode() {
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    updateTheme()
  }
console.log("is dark yuklendi: ", isDark.value)
  const setDarkMode = (value: boolean) => {
     isDark.value = value
     updateTheme()
  }

  const updateTheme = () => {
   if(isDark.value){
    document.documentElement.classList.add('dark')
   }else{
    document.documentElement.classList.remove('dark')
   }
  }
onMounted(()=>{
  updateTheme()
})
 

  return {
    isDark,
    setDarkMode,
    toggleDarkMode
  }
}