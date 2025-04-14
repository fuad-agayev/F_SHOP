import { useStorage } from '@vueuse/core'

const isDark = useStorage('dark-mode', false)

export function useDarkMode() {
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    updateTheme()
  }

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

  updateTheme()

  return {
    isDark,
    setDarkMode,
    toggleDarkMode
  }
}